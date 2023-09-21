import { Container, Graphics, Rectangle } from "pixi.js";
import { IScene } from "../IU/IScene";
import { KeyBoard } from "../game/Keyboard";
import { screen_app } from "../index";
import { PhysicsContainer } from "../game/PhysicsContainer";
import { IHitbox } from "../IU/IHitbox";
import { StateAnimation } from "../game/StateAnimation";


export class PlayerAnimated extends Container implements IScene, IHitbox{

    private player: StateAnimation;
    public PhysicsPlayer: PhysicsContainer = new PhysicsContainer();
    private jump: boolean = true;
    private hitbox: Graphics;
    public Gravity:number = 350;
    public Speed_X:number = 200;
    public Speed_Y:number = 0;
    private life_flag: boolean = true;

    constructor(){
        super();
        
        this.player= new StateAnimation();       
        this.player.scale.set(2)
        this.pivot._x = 2
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
        this.hitbox.drawRect(-this.player.width/4,20,this.player.width/2,this.player.height-20);
        this.hitbox.endFill();
    
        this.PhysicsPlayer.addChild(this.player);
       
        this.PhysicsPlayer.addChild(this.hitbox);
        this.addChild(this.PhysicsPlayer); 
        
        this.position.set(0,0);
    }
    getHitbox(): Rectangle {
       return this.hitbox.getBounds();
    }

    update(deltaTime: number, deltaFrame: number): void {
        this.player.update(deltaFrame);
    
        const dt = deltaTime / 1000;
        this.PhysicsPlayer.update(dt); 


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
        }
        // run left
        if(KeyBoard.state.get('KeyA') || KeyBoard.state.get('ArrowLeft')  && this.life_flag ){
            this.player.scale.x = -2;
            this.hitbox.scale.x = -1;

            if(this.PhysicsPlayer.acceleration.y == 0){
                this.player.playState('run',false); 
            }
            //this.PhysicsPlayer.x = screen_app.width - this.PhysicsPlayer.width;
            if(this.PhysicsPlayer.x > 0){
                this.PhysicsPlayer.speed.x = this.Speed_X;
                this.PhysicsPlayer.speed.x = Math.abs(this.PhysicsPlayer.speed.x) * -1;
            }else{
                this.PhysicsPlayer.speed.x = 0;
            }
        }
        // jump
        if((KeyBoard.state.get('Space') || KeyBoard.state.get('ArrowUp')) && this.jump == true  && this.life_flag ){
            this.player.playState('jump');
            this.PhysicsPlayer.acceleration.y = this.Gravity;
            this.PhysicsPlayer.speed.y = -300;
            this.jump = false;
        }
        // run right
        if(!(KeyBoard.state.get('KeyA') || KeyBoard.state.get('ArrowRight')) && !(KeyBoard.state.get('KeyD') || KeyBoard.state.get('ArrowLeft'))  && this.life_flag ){
            //this.player.animationSpeed = 0;
            // this.player.texture = Texture.from('player_1');
           
            // only if the player is on the ground
            if(this.PhysicsPlayer.acceleration.y == 0){

                this.player.playState('Idle', false);
            }

            this.PhysicsPlayer.speed.x = 0;
        }

        if(this.PhysicsPlayer.y  < screen_app.height){
            //this.PhysicsPlayer.y = screen_app.height - this.PhysicsPlayer.height;
            //this.PhysicsPlayer.speed.y = 0;
            //this.PhysicsPlayer.acceleration.y = 0;
            //this.jump = true;
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
        this.PhysicsPlayer.speed.x = 0; 
        this.player.playState('death');
        setTimeout(() => {
            this.player.destroy();
            
        }, 1000);
    }

    public player_pause(){
        this.PhysicsPlayer.speed.y = 0;
        this.PhysicsPlayer.speed.x = 0;
        this.Gravity = 0;
    }
}  