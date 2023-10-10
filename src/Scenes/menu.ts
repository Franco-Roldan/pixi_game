import { Container,  Text, Texture, TilingSprite } from "pixi.js";
import { screen_app } from "..";
import { IScene } from "../IU/IScene";
import { Button } from "../objetos/button";
import { Manager } from "../game/Manager";
import { sound } from "@pixi/sound";
import { Level1 } from "./Level1";

export class MenuScene extends Container implements IScene{
    
    private background:TilingSprite;
    private background2:TilingSprite;
    private background3:TilingSprite;
    private background4:TilingSprite;

    constructor(){
        super();

        sound.stop('sound_bg');

        this.background = new TilingSprite(Texture.from('bg_one'), screen_app.width, screen_app.height);
        this.background.tileScale.set(2.2);
        this.addChild(this.background);

        this.background2 = new TilingSprite(Texture.from('bg_two'), screen_app.width, screen_app.height);
        this.background2.tileScale.set(2.2);
        this.addChild(this.background2);

        this.background3 = new TilingSprite(Texture.from('bg_three'), screen_app.width, screen_app.height);
        this.background3.tileScale.set(2.2);
        this.addChild(this.background3);

        this.background4 = new TilingSprite(Texture.from('bg_five'), screen_app.width, screen_app.height);
        this.background4.tileScale.set(2.2);
        this.addChild(this.background4);

        const borderTitle = new Text('Pixi-Apocalypse', {fill: 0xFFFFFF ,fontSize: 64, fontFamily: 'PixelFont', fontWeight:'700'});
        borderTitle.position.set((screen_app.width/2) - (borderTitle.width /2) + 2, 202); 

        const Title = new Text('Pixi-Apocalypse', {fill: 0x222222,fontSize: 64, fontFamily: 'PixelFont', fontWeight:'700'});
        Title.position.set((screen_app.width/2) - (Title.width /2), 200); 
        
        this.addChild(borderTitle)
        this.addChild(Title);

        const Btn_play = new Button('Play',  'button_blue_up');
        Btn_play.position.set((screen_app.width/2) - (Btn_play.width /2), 400);
        Btn_play.scale.set(2.5);

        Btn_play.on('mouseup', () => {Manager.changeScene(new Level1())});

        this.addChild(Btn_play);
    
    }
    update(_deltaTime: number, _deltaFrame: number): void {
        
        this.background2.tilePosition.x -= 0.5 ;
        this.background3.tilePosition.x -= 1 ;
        this.background4.tilePosition.x -= 2 ;

    }

}