import { Container, Graphics, Rectangle} from "pixi.js";
import { IScene } from "../IU/IScene";
import { KeyBoard } from "../game/Keyboard";
import { screen_app } from "../index";
import { PhysicsContainer } from "../game/PhysicsContainer";
import { IHitbox } from "../IU/IHitbox";
import { StateAnimation } from "../game/StateAnimation";
import { sound } from "@pixi/sound";
import { Bullet } from "./bullet";



export class PlayerAnimated extends Container implements IScene, IHitbox{

    private player: StateAnimation;
    public PhysicsPlayer: PhysicsContainer = new PhysicsContainer();
    private jump: boolean = true;
    public hitbox: Graphics;
    public Gravity:number = 350;
    public Speed_X:number = 200;
    public Speed_Y:number = 0;
    private life_flag: boolean = true;
    public bullet: Bullet[];
    public shooting_flag:boolean = true;

    constructor(){
        super();
        
        this.player= new StateAnimation();       
        this.player.scale.set(2)
        this.player.position.set((this.player.width/2),(this.player.height/2));
    

        this.player.addState('Idle', [
            'idle/0.png',
            'idle/1.png',
            'idle/2.png',
            'idle/3.png',
        ], 0.05);

        this.player.addState('run', [
            'run/0.png',
            'run/1.png',
            'run/2.png',
            'run/3.png',
            'run/4.png',
            'run/5.png',
        ], 0.1);

        this.player.addState('jump', [
            'jump/0.png',
            'jump/1.png',
            'jump/2.png',
            'jump/3.png',
        ], 0.1, false);

        this.player.addState('death', [
            'death/0.png',
            'death/1.png',
            'death/2.png',
            'death/3.png',
            'death/4.png',
            'death/5.png',
        ], 0.05, false);

        this.player.addState('attack', [
            'attack1/0.png',
            'attack1/1.png',
            'attack1/2.png',
            'attack1/3.png',
            'attack1/4.png',
            './player_assets/5.png',
        ], 0.01, false);

        this.player.addState('hurt', [
            'hurt/0.png',
            'hurt/1.png',
        ], 0.1);

        this.player.playState('hurt');
      
       

        this.PhysicsPlayer.speed.x = 0;
        this.PhysicsPlayer.speed.y = 0;
        this.PhysicsPlayer.acceleration.y = this.Gravity;
        
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x000000, 0.0001);
        this.hitbox.drawRect(-this.player.width/6 +1 ,20,this.player.width/3,this.player.height-20);
        this.hitbox.endFill();
    
        this.PhysicsPlayer.addChild(this.player);
       
        this.PhysicsPlayer.addChild(this.hitbox);
        this.addChild(this.PhysicsPlayer); 
        
        this.position.set(0,0);

        this.bullet = [];

        
        this.on('pointerdown', this.attack, this);
        this.interactive = true;

        this.hitArea = new Rectangle(0, 0, screen_app.width, screen_app.height);
    
    }
    public getHitbox(): Rectangle {
       return this.hitbox.getBounds();
    }

    public movements():void{

        if(KeyBoard.state.get('KeyD') || KeyBoard.state.get('ArrowRight') && this.life_flag ){
            this.player.scale.x = 2;
            this.hitbox.scale.x = 1;
            if(this.PhysicsPlayer.acceleration.y == 0){
               this.player.playState('run',false); 
            }
            
            if(this.PhysicsPlayer.x < (screen_app.width - this.PhysicsPlayer.width/2)){
                this.PhysicsPlayer.speed.x = this.Speed_X;
                this.PhysicsPlayer.speed.x = Math.abs(this.PhysicsPlayer.speed.x) * 1;
            }else{
                this.PhysicsPlayer.speed.x = 0;
            }
            this.shooting_flag = true;
        }
        // run left
        if(KeyBoard.state.get('KeyA') || KeyBoard.state.get('ArrowLeft')  && this.life_flag ){
            this.player.scale.x = -2;
            this.hitbox.scale.x = -1;
            
            if(this.PhysicsPlayer.acceleration.y == 0){
                this.player.playState('run',false); 
            }
            if(this.PhysicsPlayer.x > 0){
                this.PhysicsPlayer.speed.x = this.Speed_X;
                this.PhysicsPlayer.speed.x = Math.abs(this.PhysicsPlayer.speed.x) * -1;
            }else{
                this.PhysicsPlayer.speed.x = 0;
            }
            this.shooting_flag = false;
        }
        // jump
        if((KeyBoard.state.get('Space') || KeyBoard.state.get('ArrowUp')) && this.jump == true  && this.life_flag ){
            this.player.playState('jump');
            sound.play('jump_sound', {volume:0.3});
            this.PhysicsPlayer.acceleration.y = this.Gravity;
            this.PhysicsPlayer.speed.y = -300;
            this.jump = false;
        }
        // run right
        if(!(KeyBoard.state.get('KeyA') || KeyBoard.state.get('ArrowRight')) && !(KeyBoard.state.get('KeyD') || KeyBoard.state.get('ArrowLeft'))  && this.life_flag ){

            // only if the player is on the ground
            if(this.PhysicsPlayer.acceleration.y == 0){
        
                this.player.playState('Idle', false);
            

            }
            this.PhysicsPlayer.speed.x = 0;
        }

    }

    public update(deltaTime: number, deltaFrame: number): void {
        this.player.update(deltaFrame);
        const dt = deltaTime / 1000;
        this.PhysicsPlayer.update(dt); 

        for (const i of this.bullet) {
            i.update(deltaTime, deltaFrame);
        }
        if(this.life_flag){

            this.movements();
        }
 
        if(this.PhysicsPlayer.y  < screen_app.height){

            this.PhysicsPlayer.acceleration.y = this.Gravity;
        }else{
            this.PhysicsPlayer.acceleration.y = 0;
            this.PhysicsPlayer.speed.y = 0;
        }  

    }
    
    public Separacion(overlap:Rectangle, objet:any):void{
        
        if(overlap.width < overlap.height){
            
            if(this.PhysicsPlayer.x > objet.x){
                this.PhysicsPlayer.x += overlap.width;
        
            }else if(this.PhysicsPlayer.x < objet.x){

                this.PhysicsPlayer.x -= overlap.width;
            }
        }else {
            
            if(this.PhysicsPlayer.y < objet.y){

                
                this.PhysicsPlayer.y -= overlap.height;
                this.PhysicsPlayer.speed.y = 0;
                this.PhysicsPlayer.acceleration.y = 0;
                this.jump = true;

            }else if(this.PhysicsPlayer.y > objet.y){
                
                
                this.PhysicsPlayer.y += overlap.height;
                this.PhysicsPlayer.speed.y = 0;


            }
        }
    }
    public death(){

        this.life_flag = false;
 
        this.Speed_X = 0;
        this.PhysicsPlayer.speed.x = 0;
        this.PhysicsPlayer.acceleration.x = 0;
        this.player.playState('death');
        sound.play('death_sound', {volume:0.2});
        setTimeout(() => {
            this.player.destroy();
            
        }, 700);
    }

    public attack():void{
        this.player.playState('attack', false);

        let bullet_x;
        let bullet_y;
        let bullet_speed;

        if(this.shooting_flag){
            bullet_x = this.PhysicsPlayer.x + (this.PhysicsPlayer.width/2) - 10;
            bullet_y = this.PhysicsPlayer.y + (this.PhysicsPlayer.height/2);
            bullet_speed = 600;
        }else{
            bullet_x = this.PhysicsPlayer.x - (this.PhysicsPlayer.width/2) + 8;
            bullet_y = this.PhysicsPlayer.y + (this.PhysicsPlayer.height/2);
            bullet_speed = -600;
        }
        
        const bullet = new Bullet(bullet_x, bullet_y, bullet_speed);
        
        this.bullet.push(bullet)
        this.addChild(bullet);
        sound.play('shot_sound', {volume:0.3});
    }

    public hitboxBullet(){

       
        return this.bullet;
        // const hitbox_array: IHitbox[] = [];
        // for (const h of this.bullet) {
        //     const aux = ;
        //     hitbox_array.push(h.hitbox.getBounds());
        // }
        // return hitbox_array;
    }

    public player_pause(){
        this.PhysicsPlayer.speed.y = 0;
        this.PhysicsPlayer.speed.x = 0;
        this.Gravity = 0;
    }
}  
