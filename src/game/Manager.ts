import { Application, Ticker } from "pixi.js";
import { IScene } from '../IU/IScene'

export class Manager {

    private static _score: number = 0;
    private static _heartsLife: number = 3;
    private constructor(){}

    private static app : Application;
    private static current_scene: IScene;


    public static app_init(width: number, height:number, background: number):void{

        Manager.app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        });

        window.addEventListener('resize', () => {
	
            const scaleX = window.innerWidth / this.app.screen.width;
            const scaleY = window.innerHeight / this.app.screen.height;
            const scale = Math.min(scaleX, scaleY);
        
            const gameWidth = Math.round(this.app.screen.width * scale);
            const gameHeight = Math.round(this.app.screen.height * scale);
        
            const marginHorizontal = Math.floor((window.innerWidth - gameWidth) / 2);
            const marginVertical = Math.floor((window.innerHeight - gameHeight ) /2);
        
            const Canva = this.app.view as HTMLCanvasElement;
            if(Canva.style){
                Canva.style.width = gameWidth + 'px';
                Canva.style.height = gameHeight + 'px';
        
                Canva.style.marginLeft = marginHorizontal + 'px';
                Canva.style.marginRight = marginHorizontal + 'px';
        
                Canva.style.marginTop = marginVertical + 'px';
                Canva.style.marginBottom = marginVertical + 'px';
            }
        });
        window.dispatchEvent( new Event('resize'));
        
        Ticker.shared.add(Manager.update);

    }

    private static update(deltaFrame: number): void {

        Manager.current_scene.update(Ticker.shared.deltaMS, deltaFrame);
    
    }

    // This method allows to change the scene
    public static changeScene(newScene: IScene): void {

        // If a scene exists, we destroy it.
        if (Manager.current_scene) {
            Manager.app.stage.removeChild(Manager.current_scene);
            Manager.current_scene.destroy();
        }

        // add new scene
        Manager.current_scene = newScene;
        Manager.app.stage.addChild(Manager.current_scene);
    }

    public static get score(): number{
        return Manager._score;
    }
    public static set score(value:number){
        Manager._score = value;
    }
    public static get hearts(): number{
        return Manager._heartsLife;
    }
    public static set hearts(value:number){
        Manager._heartsLife = value;
    }
}