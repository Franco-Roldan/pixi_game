import { Container, Graphics, Rectangle} from "pixi.js";
import { IHitbox } from "../IU/IHitbox";
import { StateAnimation } from "../game/StateAnimation";
import { IScene } from "../IU/IScene";
import { sound } from "@pixi/sound";


export class Door extends Container implements IHitbox, IScene{
    
    private hitbox: Graphics;
    private door:StateAnimation;
    private door2:StateAnimation;
    public flag_door:boolean = false;

    constructor(){
        super();

        this.door = new StateAnimation();
        this.door2 = new StateAnimation();

        this.door.addState('close', ['door0.png'], 0);
        this.door.addState('open', ['door0.png','door1.png','door2.png','door3.png','door4.png',], 0.1, false);
        this.door2.addState('close', ['door0.png'], 0);
        this.door2.addState('open', ['door0.png','door1.png','door2.png','door3.png','door4.png',], 0.1, false);

        this.door.playState('close');
        this.door2.playState('close');

        this.door2.position.set(this.door.x + this.door.width - 8,0)
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x000000, 0.9);
        this.hitbox.drawRect(0,0,128,64);
        this.hitbox.endFill();

        this.addChild(this.hitbox);
        this.addChild(this.door);
        this.addChild(this.door2);
    }
    update(_deltaTime: number, deltaFrame: number): void {
       this.door.update(deltaFrame);
    }
    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

    public OpenDoor(){
        this.door.playState('open');
        this.door2.playState('open');
        sound.play('opendoor_sound', {volume:0.5});
        this.flag_door = true;
    }
    
}