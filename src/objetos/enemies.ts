import { Container, Graphics, Rectangle } from "pixi.js";
import { StateAnimation } from "../game/StateAnimation";
import { PhysicsContainer } from "../game/PhysicsContainer";
import { IHitbox } from "../IU/IHitbox";
import { IScene } from "../IU/IScene";
import { sound } from "@pixi/sound";

export class Enemies extends Container implements IHitbox, IScene{

    private enemy:StateAnimation = new StateAnimation();
    private physicsEnemy: PhysicsContainer = new PhysicsContainer();
    public hitbox: Graphics;
    public hitboxContent: Graphics;
    private limitArea: number;
    private speed:number;
    public Damage_received: number = 0;

    constructor( walk: string[], death:string[], speed:number[], limitArea:number){
        super();
        this.speed = speed[0];

        this.enemy.addState('walk' , walk, 0.07);
        this.enemy.addState('death' , death,0.05, false);

        this.enemy.playState('walk');

        this.physicsEnemy.speed.set(speed[0] , speed[1]);

        this.physicsEnemy.acceleration.y = 0;
        this.physicsEnemy.addChild(this.enemy);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x000000, 0.0001);
        this.hitbox.drawRect(-this.enemy.width/6,this.enemy.height/2,this.enemy.width/3 -10, this.enemy.height/2);
        this.hitbox.endFill();

        this.hitboxContent = new Graphics();
        this.hitboxContent.beginFill(0x000000, 0.0001);
        this.hitboxContent.drawRect(0,this.enemy.height/2, limitArea ,this.hitbox.height);
        this.hitboxContent.endFill();

        this.physicsEnemy.addChild(this.hitbox);
        this.hitboxContent.addChild(this.physicsEnemy);
        this.addChild(this.hitboxContent);
        this.limitArea= this.hitboxContent.x + this.hitboxContent.width - this.hitbox.width;

        this.position.set(0,0);
    }
    public update(deltaTime: number, deltaFrame: number): void {
        
        this.enemy.update(deltaFrame);

        const dt = deltaTime/1000;

        this.physicsEnemy.update(dt);

    }
    public getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

    public walk():void{
   
        if(this.Damage_received < 20){

            this.enemy.playState('walk', false);
            if(this.physicsEnemy.speed.x == 0){
                this.physicsEnemy.speed.x = this.speed;
            }
            //console.log(this.hitboxContent.x , this.hitboxContent.width);
    
            //const limitArea = 50 -this.hitboxContent.x + this.hitboxContent.width;
            if(this.physicsEnemy.x > this.limitArea){
                this.enemy.scale.x = -1;
                this.physicsEnemy.speed.x = -this.speed 
            }else if(this.physicsEnemy.x < this.hitboxContent.x){
                this.enemy.scale.x = 1;
                this.physicsEnemy.speed.x = this.speed 
            }
        }

    }

    public hurt():boolean{
        if(this.Damage_received > 20){
            sound.play('death_enemy', {volume: 0.3})
            return true;
        }
        sound.play('hit_sound', {volume:0.3});
        return false;
    }
    public death():void{
        this.physicsEnemy.speed.x = 0;
        this.enemy.playState('death');
    }
}