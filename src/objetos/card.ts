import { Container, Graphics, Rectangle } from "pixi.js";
//import { IScene } from "../IU/IScene";
import { IHitbox } from "../IU/IHitbox";
import { StateAnimation } from "../game/StateAnimation";
import { Manager } from "../game/Manager";
import { Board } from "./board";


export class Card extends Container implements IHitbox{
    
    private card:StateAnimation;
    public flag_control:boolean = true;
    public hitbox: Graphics;

    constructor(frame: string[], pos_X:number, pos_Y:number){
        super();
        
        this.card = new StateAnimation;
        this.card.scale.set(2);
        this.card.pivot.set(0.5);
        this.card.position.set(pos_X, pos_Y);

        this.card.addState('spin', frame, 0.1)
        this.card.playState('spin');
        this.addChild(this.card);
        
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x000000, 0.0001);
        this.hitbox.drawRect(0,0, this.card.width/3, this.card.height/2);
        this.hitbox.endFill();

        this.card.addChild(this.hitbox);
        this.addChild(this.card);
    }

    public getHitbox(): Rectangle {
        return this.hitbox.getBounds();  
    }
    public getMoney(){
        Manager.score += 100;
        this.flag_control = false
    }
    public getCard(){
        Board.card++;
        this.flag_control = false
    }
}