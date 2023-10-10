import { Container, Sprite} from "pixi.js";
import { PlayerAnimated } from "../objetos/player";
import { IScene } from "../IU/IScene";
import { checkCollition } from "../IU/IHitbox";
import { Plataformas } from "../objetos/plataforma";
import { screen_app } from "..";
import { Door } from "../objetos/door";
import { ResultTable } from "../objetos/result_Table";
import { Deco_asset, deco_level_two } from "../objetos/deco";
import { Card } from "../objetos/card";
import { Board } from "../objetos/board";
import { Manager } from "../game/Manager";
import { Trap } from "../objetos/trap";
import { Lever } from "../objetos/lever";
import { Enemies } from "../objetos/enemies";
import { Sound, sound } from "@pixi/sound";
import { Level1 } from "./Level1";


export class Level2 extends Container implements IScene{


    public player: PlayerAnimated = new PlayerAnimated();
    private result_flag: boolean = false;
    //private enemy_flag: boolean = true; 
    private platform:Plataformas[];
    private modey_card: Card[];
    private Cards: Card[];
    private Trap: Trap;
    private Trap2: Trap;
    private board: Board;
    private door: Door;
    private lever: Lever = new Lever()
    private enemy: Enemies;
    private enemy2: Enemies;
    private music:Sound;

    constructor(){
        super();
        this.player.PhysicsPlayer.position.set(30, 540);

        this.music = sound.find('sound_bg');
        this.music.play({loop: true, singleInstance: true});
        this.music.volume = 0.1;
        
        const background:Sprite = Sprite.from('bg_2');
        background.scale.set(2.3);
        this.addChild(background)

        const World = new Container;
        this.platform = [];
        this.modey_card = [];
        this.Cards = [];

        this.board = new Board();
        World.addChild(this.board);

        const deco = new Deco_asset( deco_level_two);
        World.addChild(deco);
        
        const base1 = new Plataformas('1 Tiles/Tile_37.png',47);
        base1.position.set(0, screen_app.height - base1.height);
        this.platform.push(base1);
        World.addChild(base1);

        const base2 = new Plataformas('1 Tiles/Tile_02.png', 10);
        base2.position.set(0,  base1.y - base2.height);
        this.platform.push(base2);
        World.addChild(base2);

        const base3 = new Plataformas('1 Tiles/Tile_37.png', 18);
        base3.position.set(base2.width,  base1.y - base2.height);
        this.platform.push(base3);
        World.addChild(base3);

        const base4 = new Plataformas('1 Tiles/Tile_02.png', 19);
        base4.position.set(base3.x + base3.width,  base1.y - base2.height);
        this.platform.push(base4);
        World.addChild(base4);


        const plat1 = new Plataformas(['1 Tiles/Tile_01.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png']);
        plat1.position.set(base2.width, base2.y - plat1.height);
        this.platform.push(plat1);
        World.addChild(plat1);

        const colum1 = new Plataformas(['1 Tiles/Tile_01.png','1 Tiles/Tile_09.png','1 Tiles/Tile_09.png','1 Tiles/Tile_09.png','1 Tiles/Tile_09.png','1 Tiles/Tile_09.png','1 Tiles/Tile_09.png','1 Tiles/Tile_09.png','1 Tiles/Tile_37.png'],1,false);
        colum1.position.set(plat1.x + plat1.width -3, base2.y - colum1.height + 3);
        this.platform.push(colum1);
        World.addChild(colum1);


        const colum2 = new Plataformas(['1 Tiles/Tile_02.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_37.png'],1,false);
        colum2.position.set(colum1.x + colum1.width -3, base2.y - colum2.height + 3);
        this.platform.push(colum2);
        World.addChild(colum2);

        const colum3 = new Plataformas(['1 Tiles/Tile_02.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_37.png'],1,false);
        colum3.position.set(colum2.x + colum2.width -3, base2.y - colum3.height + 3);
        this.platform.push(colum3);
        World.addChild(colum3);

        const colum4 = new Plataformas(['1 Tiles/Tile_02.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_37.png'],1,false);
        colum4.position.set(colum3.x + colum3.width -3, base2.y - colum4.height + 3);
        this.platform.push(colum4);
        World.addChild(colum4);

        const colum5 = new Plataformas(['1 Tiles/Tile_02.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_37.png'],1,false);
        colum5.position.set(colum4.x + colum4.width -3, base2.y - colum5.height + 3);
        this.platform.push(colum5);
        World.addChild(colum5);

        const colum6 = new Plataformas(['1 Tiles/Tile_02.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_37.png'],1,false);
        colum6.position.set(colum5.x + colum5.width -3, base2.y - colum6.height + 3);
        this.platform.push(colum6);
        World.addChild(colum6);

        const colum7 = new Plataformas(['1 Tiles/Tile_02.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_37.png'],1,false);
        colum7.position.set(colum6.x + colum6.width -3, base2.y - colum7.height + 3);
        this.platform.push(colum7);
        World.addChild(colum7);

        const colum8 = new Plataformas(['1 Tiles/Tile_03.png','1 Tiles/Tile_11.png','1 Tiles/Tile_11.png','1 Tiles/Tile_11.png','1 Tiles/Tile_11.png','1 Tiles/Tile_11.png','1 Tiles/Tile_11.png','1 Tiles/Tile_11.png','1 Tiles/Tile_11.png'],1,false);
        colum8.position.set(colum7.x + colum7.width -3, base2.y - colum8.height + 3);
        this.platform.push(colum8);
        World.addChild(colum8);
 
        const plat2 = new Plataformas('1 Tiles/Tile_26.png', 15);
        plat2.position.set(0, 500);
        this.platform.push(plat2);
        World.addChild(plat2);


        const plat2sub = new Plataformas('1 Tiles/Tile_27.png', 1);
        plat2sub.position.set(plat2.x + plat2.width, 500);
        this.platform.push(plat2sub);
        World.addChild(plat2sub);

        const plat3 = new Plataformas(['1 Tiles/Tile_25.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_18.png','1 Tiles/Tile_18.png','1 Tiles/Tile_18.png','1 Tiles/Tile_19.png']);
        plat3.position.set(100, 380);
        this.platform.push(plat3);
        World.addChild(plat3);

        const plat3sub = new Plataformas(['1 Tiles/Tile_01.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_03.png']);
        plat3sub.position.set(plat3.x + plat3.width - plat3sub.width, plat3.y - plat3sub.height);
        this.platform.push(plat3sub);
        World.addChild(plat3sub);

        const plat4 = new Plataformas(['1 Tiles/Tile_25.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_27.png']);
        plat4.position.set(930, 200);
        this.platform.push(plat4);
        World.addChild(plat4);

        const plat5 = new Plataformas(['1 Tiles/Tile_25.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_27.png']);
        plat5.position.set(600, 250);
        this.platform.push(plat5);
        World.addChild(plat5);

        const plat6 = new Plataformas(['1 Tiles/Tile_25.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_18.png','1 Tiles/Tile_18.png','1 Tiles/Tile_18.png']);
        plat6.position.set(screen_app.width - plat6.width, 340);
        this.platform.push(plat6);
        World.addChild(plat6);

        const plat6sub = new Plataformas(['1 Tiles/Tile_01.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png']);
        plat6sub.position.set(screen_app.width - plat6sub.width, plat6.y - plat6sub.height);
        this.platform.push(plat6sub);
        World.addChild(plat6sub);

        const plat7 = new Plataformas(['1 Tiles/Tile_25.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png']);
        plat7.position.set(screen_app.width - plat7.width, 560 - plat7.height);
        this.platform.push(plat7);
        World.addChild(plat7);

        const plat8 = new Plataformas(['1 Tiles/Tile_25.png','1 Tiles/Tile_26.png','1 Tiles/Tile_27.png']);
        plat8.position.set(970, 460);
        this.platform.push(plat8);
        World.addChild(plat8);

        const plat9 = new Plataformas(['1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_27.png']);
        plat9.position.set(0, 220);
        this.platform.push(plat9);
        World.addChild(plat9);

        const colum9 = new Plataformas(['1 Tiles/Tile_61.png','1 Tiles/Tile_61.png','1 Tiles/Tile_52.png','1 Tiles/Tile_61.png','1 Tiles/Tile_61.png',], 1, false);
        colum9.position.set(screen_app.width - colum9.width, 380);
        World.addChild(colum9);

        this.Trap = new Trap(0,0,0.20);
        this.Trap.position.set(600 , 320);
        this.Trap.scale.set(1.5);
        World.addChild(this.Trap);

        this.Trap2 = new Trap(0,0,0.20);
        this.Trap2.position.set(770 , 320);
        this.Trap2.scale.set(1.5);
        World.addChild(this.Trap2);

        this.door = new Door();
        this.door.position.set(1170, 560);
        this.door.scale.set(1.5);
        World.addChild(this.door);


        this.lever.position.set(colum9.x - this.lever.width + 5, colum9.y + colum9.height/2 + 3);
        this.lever.angle = -90;
        World.addChild(this.lever);
        

        for(let i=0;i<5; i++){
            const modey_card = new Card(['0.png','1.png','2.png','3.png','4.png','5.png'],610 + 40 * i,210);
            this.modey_card.push(modey_card);
            World.addChild(modey_card);
        }
        for(let i=0;i<3; i++){
            const modey_card = new Card(['0.png','1.png','2.png','3.png','4.png','5.png'],1140 + 40 * i,490);
            this.modey_card.push(modey_card);
            World.addChild(modey_card);
        }

        for(let i=0;i<3; i++){
            let x = 0;
            let y = 0;
            i==0 ?  (x = 20 , y = 175): i==1 ?  (x = 830 , y = 600): i==2 ?(x = 685 , y = 340): null;  
            const card = new Card(['card0.png','card1.png','card2.png','card3.png','card4.png','card5.png','card6.png','card7.png',],x,y);
            this.Cards.push(card);
            World.addChild(card);
        }

        this.enemy = new Enemies(
            ['enemy/walk/0.png','enemy/walk/1.png','enemy/walk/2.png','enemy/walk/3.png','enemy/walk/4.png','enemy/walk/5.png',],
            ['enemy/death/0.png','enemy/death/1.png','enemy/death/2.png','enemy/death/3.png','enemy/death/4.png','enemy/death/5.png',]
            ,[50,0], 250
        )
        this.enemy.position.set(20, 340)
        this.enemy.scale.set(1.7);
        World.addChild(this.enemy);

        this.enemy2 = new Enemies(
            ['enemy/walk/0.png','enemy/walk/1.png','enemy/walk/2.png','enemy/walk/3.png','enemy/walk/4.png','enemy/walk/5.png',],
            ['enemy/death/0.png','enemy/death/1.png','enemy/death/2.png','enemy/death/3.png','enemy/death/4.png','enemy/death/5.png',]
            ,[50,0], 150
        )
        this.enemy2.position.set(840, 495)
        this.enemy2.scale.set(1.7);
        World.addChild(this.enemy2);

        World.addChild(this.player);
       
        this.addChild(World);

    }

    update(deltaTime: number, deltaFrame: number): void {

        this.player.update(deltaTime, deltaFrame);
        this.board.update(deltaTime, deltaFrame);
        this.enemy.update(deltaTime, deltaFrame);
        this.enemy2.update(deltaTime, deltaFrame);
        //console.log(this.player.position.x,this.player.position.y)

        for (const plat of this.platform) {

            const overlap = checkCollition(this.player, plat);

            
            if(overlap != null){
                this.player.Separacion(overlap , plat);
            }
        }

        for (const mon of this.modey_card) {
            
            if(mon.flag_control){
                if(checkCollition(this.player, mon) != null){
                    mon.getMoney();
                    mon.destroy();
                }
            }
        }

        for (const card of this.Cards){
            if(card.flag_control){
                if(checkCollition(this.player, card) != null){
                    card.getCard();
                    card.destroy();
                }
            }
        }
        
        const overlap = checkCollition(this.player, this.Trap);
        const overlap2 = checkCollition(this.player, this.Trap2);
        if((overlap != null || overlap2 != null) &&  this.result_flag == false){
            if(this.Trap.red_flag){
                //this.player.Separacion(overlap , this.Trap);
                this.Trap.soundTrap();
                this.player.death();
                this.result_flag = true;
                        
                setTimeout(() => {
                            
                    Manager.hearts--;
                    this.board.removeLife();
                    this.GameOver(Manager.hearts);
                },1000);
            }  
        }
        

        if((checkCollition(this.player,  this.enemy) != null || checkCollition(this.player, this.enemy2) != null ) && this.result_flag == false && (this.enemy.Damage_received < 20 || this.enemy2.Damage_received < 20 )){
            console.log(this.enemy2, this.enemy);

            this.player.death();
            this.result_flag = true;
                        
            setTimeout(() => {
                            
                Manager.hearts--;
                this.board.removeLife();
                this.GameOver(Manager.hearts);
            },1000);
        }else{
            this.enemy.walk();
            this.enemy2.walk();
        }
  

        if(checkCollition(this.player, this.door) != null && this.result_flag == false){
            
            if(this.door.flag_door){
                this.result_flag = true;
                this.WinLevel();
                this.player.destroy();
            }
        }

        if(this.player.PhysicsPlayer.y >= screen_app.height && this.result_flag == false){
            
            this.result_flag = true;
            Manager.hearts--;
            this.board.removeLife();
            this.GameOver(Manager.hearts);
        }

        const hitbox_bullet = this.player.hitboxBullet();
        for(const h  of hitbox_bullet) {
                
            if(checkCollition(h, this.enemy) != null){
                h.destroy();
                this.enemy.Damage_received += 1;
                if(this.enemy.hurt()){
                    this.enemy.death();
                    setTimeout(() => {
                        
                        this.enemy.hitbox.scale.set(0);
                        this.enemy.destroy();
                    }, 1000);
                }
            }else if(checkCollition(h, this.enemy2) != null){
                h.destroy();
                this.enemy2.Damage_received += 1;
                if(this.enemy2.hurt()){
                    this.enemy2.death();
                    setTimeout(() => {
                            
                        this.enemy2.hitbox.scale.set(0);
                        this.enemy2.destroy();
                        
                    }, 1000);
                }
            }
        }
        

        

        if(checkCollition(this.player, this.lever) != null){
            this.lever.heldDown();
            this.Trap.offEffect();
            this.Trap2.offEffect();
            this.lever.lever_state = true;
        }

        if(Board.card == 3 && this.door.flag_door == false){
            this.door.OpenDoor();
        }
        

    }

    public WinLevel():void{
        const win = new ResultTable(true, new Level2(), new Level2());

        Manager.hearts = 3;
        Board.card = 0;
        this.addChild(win);
    }
    public GameOver(lifes:number):void{
        
        if(lifes > 0){
            Manager.changeScene( new Level2());
        }else{
            Manager.score = 0;
            Manager.hearts = 3;
            Board.card = 0;
            const gameOver = new ResultTable(false, new Level1(), new Level2());
            this.addChild(gameOver);
           
        }

    }
}