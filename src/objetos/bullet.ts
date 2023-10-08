import { Container, Graphics, Rectangle } from "pixi.js";
import { IScene } from "../IU/IScene";
import { IHitbox } from "../IU/IHitbox";
import { PhysicsContainer } from "../game/PhysicsContainer";
import { StateAnimation } from "../game/StateAnimation";

export class Bullet extends Container implements IScene, IHitbox{
    private bullet:StateAnimation;
    public hitbox: Graphics;
    private physicsbullet: PhysicsContainer = new PhysicsContainer();
    constructor(x:number, y:number, speed:number){
        super();

        this.bullet = new StateAnimation();
        this.bullet.addState('bullet',['./player_assets/9.png'], 0, false);
        this.bullet.playState('bullet');
        this.bullet.scale.set(2);
        this.bullet.position.set(x,y)
        this.physicsbullet.addChild(this.bullet);
        
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x000000, 0.3);
        this.hitbox.drawRect(this.bullet.x,this.bullet.y,this.bullet.width,this.bullet.height);
        this.hitbox.endFill();

        this.physicsbullet.addChild(this.hitbox)
        this.addChild(this.physicsbullet)
        this.physicsbullet.speed.x= speed;
    }
    
    
    
    getHitbox(): Rectangle {
       return this.hitbox.getBounds();
    }

    update(deltaTime: number, _deltaFrame:number): void {
        //this.bullet.update(deltaFrame);

        const dt = deltaTime / 1000;
        this.physicsbullet.update(dt);

    }

}