import { Container, Graphics, Rectangle } from "pixi.js";
import { StateAnimation } from "../game/StateAnimation";
import { IScene } from "../IU/IScene";
import { IHitbox } from "../IU/IHitbox";
import { PhysicsContainer } from "../game/PhysicsContainer";

export class Trap extends Container implements IScene, IHitbox{
    
    private texture_enemies: StateAnimation;
    private PhysicsCont: PhysicsContainer;
    public hitbox: Graphics;
    public red_flag:boolean = true;

    constructor(speed_X:number = 0, speed_Y: number = 0 , Animation_speed: number = 0.10){
        super();

        this.PhysicsCont = new PhysicsContainer();
        this.PhysicsCont.speed.x = speed_X;
        this.PhysicsCont.speed.y = speed_Y;

        this.texture_enemies = new StateAnimation();
        
        this.texture_enemies.addState('trap', [
            'trap0.png',
            'trap1.png',
            'trap2.png',
            'trap3.png'
        ], Animation_speed);
        this.texture_enemies.playState('trap');



        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x000000, 0.2);
        this.hitbox.drawRect(0,5,this.texture_enemies.width - 10,this.texture_enemies.height- 5);
        this.hitbox.endFill();

        this.PhysicsCont.addChild(this.hitbox);        
        this.PhysicsCont.addChild(this.texture_enemies);
        this.addChild(this.PhysicsCont);
    }
    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

    public offEffect(){
        this.texture_enemies.addState('off', ['trap0.png'], 0);
        this.texture_enemies.playState('off');
        this.red_flag = false;
    }
    update(deltaTime: number, deltaFrame: number): void {
        this.texture_enemies.update(deltaFrame);
        const dt: number = deltaTime/1000

        this.PhysicsCont.update(dt);
    }

} 