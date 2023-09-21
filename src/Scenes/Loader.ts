import { Container, Graphics, Assets, Text } from "pixi.js";
import { assets } from "../game/Assets";
import { IScene } from "../IU/IScene";
import { Manager } from "../game/Manager";
import { screen_app } from "..";
import { MenuScene } from "./menu";

//import { Spritesheet } from "./Spritesheets_Scene";


export class LoaderScene extends Container implements IScene {

    // for making our loader graphics...
    private loaderBar: Container;
    private loaderBarBoder: Graphics;
    private loaderBarFill: Graphics;
    private texty: Text;

    constructor() {
        super();

        const loaderBarWidth = screen_app.width * 0.4;

        this.loaderBarFill = new Graphics();
        this.loaderBarFill.beginFill(0x707B7C, 1)
        this.loaderBarFill.drawRect(0, 0, loaderBarWidth, 50);
        this.loaderBarFill.endFill();
        this.loaderBarFill.scale.x = 0;

        this.loaderBarBoder = new Graphics();
        this.loaderBarBoder.lineStyle(3, 0xFFFFFF, 1);
        this.loaderBarBoder.drawRect(0, 0, loaderBarWidth, 50);

        this.loaderBar = new Container();
        this.loaderBar.addChild(this.loaderBarFill);
        this.loaderBar.addChild(this.loaderBarBoder);
        this.loaderBar.position.x = (screen_app.width - this.loaderBar.width) / 2;
        this.loaderBar.position.y = (screen_app.height - this.loaderBar.height) / 2;
        this.addChild(this.loaderBar);

        this.texty = new Text("loading...", {fontSize:30, fill:0xFFFFFF});
        this.texty.anchor.set(0.5);
        this.texty.position.set(screen_app.width/2,(screen_app.height/2) - 50);
        this.addChild(this.texty);

        this.initializeLoader().then(() => {
            this.gameLoaded();
        })
    }

    private async initializeLoader(): Promise<void>
    {
        await Assets.init({ manifest: assets });
        Assets.add('myfont', './fonts/stan0763.ttf', {"family": "PixelFont"});
        Assets.load('myfont');
        const bundle =  assets.bundles.map(bundle => bundle.name);

        await Assets.loadBundle(bundle, this.downloadProgress.bind(this));
        
    }

    private downloadProgress(progressRatio: number): void {
        this.loaderBarFill.scale.x = progressRatio;
    }

    private gameLoaded(): void {
        // Change scene to the game scene!
        Manager.changeScene(new MenuScene());
    }

    public update(_framesPassed: number): void {
        // :)
    }
}