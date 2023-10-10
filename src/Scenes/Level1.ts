import { Container, Sprite} from "pixi.js";
import { PlayerAnimated } from "../objetos/player";
import { IScene } from "../IU/IScene";
import { checkCollition } from "../IU/IHitbox";
import { Plataformas } from "../objetos/plataforma";
import { screen_app } from "..";
import { Door } from "../objetos/door";
import { ResultTable } from "../objetos/result_Table";
import { Deco_asset, deco_level_one } from "../objetos/deco";
import { Card } from "../objetos/card";
import { Board } from "../objetos/board";
import { Manager } from "../game/Manager";
import { Trap } from "../objetos/trap";
import { Lever } from "../objetos/lever";
import { Enemies } from "../objetos/enemies";
import { Sound, sound } from "@pixi/sound";
import { Level2 } from "./Level2";

export class Level1 extends Container implements IScene{


    public player: PlayerAnimated = new PlayerAnimated();
    private result_flag: boolean = false;
    private enemy_flag: boolean = true; 
    private platform:Plataformas[];
    private modey_card: Card[];
    private Cards: Card[];
    private Trap: Trap;
    private board: Board;
    private door: Door;
    private lever: Lever = new Lever()
    private enemy: Enemies;
    private music:Sound;
    constructor(){
        super();
        
        this.music = sound.find('sound_bg');

        this.music.play({loop: true, singleInstance: true});
        this.music.volume = 0.1;
        const background:Sprite = Sprite.from('bg_1');
        background.scale.set(2.3);
        this.addChild(background)

        const World = new Container;
        this.platform = [];
        this.modey_card = [];
        this.Cards = [];


        this.board = new Board();
        World.addChild(this.board);

        const deco = new Deco_asset( deco_level_one);

        World.addChild(deco);
        
        const base1 = new Plataformas('1 Tiles/Tile_37.png',23);
        base1.position.set(0, screen_app.height - base1.height);
        this.platform.push(base1);
        World.addChild(base1);

        const base2 = new Plataformas('1 Tiles/Tile_02.png', 23);
        base2.position.set(0,  base1.y - base2.height);
        this.platform.push(base2);
        World.addChild(base2);

        const base3 = new Plataformas('1 Tiles/Tile_37.png',15);
        base3.position.set(870, screen_app.height - base1.height);
        this.platform.push(base3);
        World.addChild(base3);

        const base4 = new Plataformas('1 Tiles/Tile_02.png', 15);
        base4.position.set(870,  base1.y - base2.height);
        this.platform.push(base4);
        World.addChild(base4);

        const plat3 = new Plataformas(['1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_27.png']);
        plat3.position.set(0, base2.y - plat3.height - 80);
        this.platform.push(plat3);
        World.addChild(plat3);

        const plat4 = new Plataformas(['1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_27.png',]);
        plat4.position.set(0, 400);
        this.platform.push(plat4);
        World.addChild(plat4);

        const plat5 = new Plataformas(['1 Tiles/Tile_09.png','1 Tiles/Tile_10.png','1 Tiles/Tile_11.png']);
        plat5.position.set(464, base2.y - plat3.height);
        this.platform.push(plat5);
        World.addChild(plat5);

        const plat6 = new Plataformas(['1 Tiles/Tile_09.png','1 Tiles/Tile_10.png','1 Tiles/Tile_11.png']);
        plat6.position.set(464, plat5.y - plat5.height);
        this.platform.push(plat6);
        World.addChild(plat6);
        
        const plat7 = new Plataformas(['1 Tiles/Tile_09.png','1 Tiles/Tile_10.png','1 Tiles/Tile_11.png']);
        plat7.position.set(464, plat6.y - plat6.height);
        this.platform.push(plat7);
        World.addChild(plat7);

        const plat8 = new Plataformas(['1 Tiles/Tile_17.png','1 Tiles/Tile_18.png','1 Tiles/Tile_18.png','1 Tiles/Tile_18.png','1 Tiles/Tile_35.png','1 Tiles/Tile_10.png','1 Tiles/Tile_11.png']);
        plat8.position.set(348, plat7.y - plat7.height);
        this.platform.push(plat8);
        World.addChild(plat8);

        const plat9 = new Plataformas(['1 Tiles/Tile_17.png','1 Tiles/Tile_18.png','1 Tiles/Tile_35.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png','1 Tiles/Tile_36.png','1 Tiles/Tile_18.png','1 Tiles/Tile_18.png','1 Tiles/Tile_19.png']);
        plat9.position.set(290, plat8.y - plat8.height);
        this.platform.push(plat9);
        World.addChild(plat9);

        const plat10 = new Plataformas(['1 Tiles/Tile_01.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_03.png']);
        plat10.position.set(290, plat9.y - plat9.height);
        this.platform.push(plat10);
        World.addChild(plat10);

        const plat11 = new Plataformas(['1 Tiles/Tile_01.png','1 Tiles/Tile_09.png','1 Tiles/Tile_09.png','1 Tiles/Tile_09.png','1 Tiles/Tile_09.png','1 Tiles/Tile_09.png','1 Tiles/Tile_09.png','1 Tiles/Tile_09.png','1 Tiles/Tile_09.png','1 Tiles/Tile_09.png','1 Tiles/Tile_09.png','1 Tiles/Tile_09.png'],1,false );
        plat11.position.set(812, screen_app.height - plat11.height + 3);
        this.platform.push(plat11);
        World.addChild(plat11);

        const plat12 = new Plataformas(['1 Tiles/Tile_02.png','1 Tiles/Tile_11.png','1 Tiles/Tile_11.png','1 Tiles/Tile_11.png','1 Tiles/Tile_11.png','1 Tiles/Tile_11.png','1 Tiles/Tile_11.png','1 Tiles/Tile_11.png','1 Tiles/Tile_11.png','1 Tiles/Tile_11.png','1 Tiles/Tile_10.png','1 Tiles/Tile_10.png'],1,false );
        plat12.position.set(841, screen_app.height - plat12.height + 3);
        this.platform.push(plat12); 
        World.addChild(plat12);

        const plat13 = new Plataformas(['1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_27.png']);
        plat13.position.set(873, screen_app.height - plat12.height);
        this.platform.push(plat13); 
        World.addChild(plat13);

        const plat14 = new Plataformas(['1 Tiles/Tile_25.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png']);
        plat14.position.set(screen_app.width - plat14.width + 3, 520);
        this.platform.push(plat14); 
        World.addChild(plat14);
        const platSub14 = new Plataformas(['1 Tiles/Tile_25.png','1 Tiles/Tile_27.png']);
        platSub14.position.set(plat14.x - platSub14.width, 520 + platSub14.height/2 );
        this.platform.push(platSub14);
        World.addChild(platSub14);

        const plat15 = new Plataformas(['1 Tiles/Tile_12.png','1 Tiles/Tile_12.png','1 Tiles/Tile_12.png','1 Tiles/Tile_12.png','1 Tiles/Tile_12.png'], 1, false);
        plat15.position.set(300, 320);
        World.addChild(plat15);


        const plat16 = new Plataformas(['1 Tiles/Tile_12.png','1 Tiles/Tile_12.png','1 Tiles/Tile_12.png','1 Tiles/Tile_12.png','1 Tiles/Tile_12.png'], 1, false);
        plat16.position.set(590, 320);
        World.addChild(plat16);

        const plat17 = new Plataformas(['1 Tiles/Tile_17.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_26.png','1 Tiles/Tile_27.png']);
        plat17.position.set(290, 323 - plat17.height);
        this.platform.push(plat17);
        World.addChild(plat17);

        const plat18 = new Plataformas(['1 Tiles/Tile_01.png','1 Tiles/Tile_12.png','1 Tiles/Tile_12.png','1 Tiles/Tile_12.png','1 Tiles/Tile_12.png'], 1, false);
        plat18.position.set(287, plat17.x - plat18.height + 3);
        this.platform.push(plat18);
        World.addChild(plat18);

        const plat19 = new Plataformas(['1 Tiles/Tile_03.png','1 Tiles/Tile_20.png'], 1, false);
        plat19.position.set(plat17.x + plat17.width - 3 - plat19.width, plat17.x - plat18.height + 3);
        this.platform.push(plat19);
        World.addChild(plat19);

        const plat20 = new Plataformas(['1 Tiles/Tile_18.png','1 Tiles/Tile_18.png','1 Tiles/Tile_18.png','1 Tiles/Tile_18.png','1 Tiles/Tile_18.png','1 Tiles/Tile_18.png','1 Tiles/Tile_18.png','1 Tiles/Tile_18.png','1 Tiles/Tile_18.png','1 Tiles/Tile_18.png']);
        plat20.position.set(plat18.x + plat18.width - 3 , plat19.y - 3);
        this.platform.push(plat20);
        World.addChild(plat20);

        const plat21 = new Plataformas(['1 Tiles/Tile_01.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_02.png','1 Tiles/Tile_03.png']);
        plat21.position.set(plat18.x + plat18.width - 3 , plat20.y - plat21.height);
        World.addChild(plat21);

        const plat22 = new Plataformas(['1 Tiles/Tile_25.png','1 Tiles/Tile_27.png']);
        plat22.position.set(screen_app.width - plat22.width, 500 - plat22.height);
        this.platform.push(plat22);
        World.addChild(plat22);

        const tube = new Plataformas('3 Objects/1 Tube/4.png',1, true, -90 );
        tube.position.set(812 - tube.width + 3 , screen_app.height - tube.height + 40 );
        this.platform.push(tube);
        World.addChild(tube);

        this.Trap = new Trap(0,0,0.20);
        this.Trap.position.set(150 ,585);
        this.Trap.scale.set(1.5);
        this.addChild(this.Trap);

        this.door = new Door();
        this.door.position.set(1170, 550);
        this.door.scale.set(1.7);
        World.addChild(this.door);


        this.lever.position.set(430, 245);
        World.addChild(this.lever);
        

        for(let i=0;i<5; i++){
            const modey_card = new Card(['0.png','1.png','2.png','3.png','4.png','5.png'],350 + 50 * i,410);
            this.modey_card.push(modey_card);
            World.addChild(modey_card);
        }

        for(let i=0;i<3; i++){
            let x = 0;
            let y = 0;
            i==0 ?  (x = 20 , y = 600): i==1 ?  (x = 570 , y = 600): i==2 ?(x = 900 , y = 300): null;  
            const card = new Card(['card0.png','card1.png','card2.png','card3.png','card4.png','card5.png','card6.png','card7.png',],x,y);
            this.Cards.push(card);
            World.addChild(card);
        }

        this.enemy = new Enemies(
            ['enemy/walk/0.png','enemy/walk/1.png','enemy/walk/2.png','enemy/walk/3.png','enemy/walk/4.png','enemy/walk/5.png',],
            ['enemy/death/0.png','enemy/death/1.png','enemy/death/2.png','enemy/death/3.png','enemy/death/4.png','enemy/death/5.png',]
            ,[50,0], 185
        )
        this.enemy.position.set(825, 210)
        this.enemy.scale.set(1.7);
        World.addChild(this.enemy);

        World.addChild(this.player);
        this.addChild(World);

    }

    update(deltaTime: number, deltaFrame: number): void {

        this.player.update(deltaTime, deltaFrame);
        this.board.update(deltaTime, deltaFrame);
        this.enemy.update(deltaTime, deltaFrame);


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
        if(overlap != null &&  this.result_flag == false){
            if(this.Trap.red_flag){
                this.player.Separacion(overlap , this.Trap);
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

        if(checkCollition(this.player,  this.enemy) != null && this.result_flag == false){

            this.player.death();
            this.result_flag = true;
                        
            setTimeout(() => {
                            
                Manager.hearts--;
                this.board.removeLife();
                this.GameOver(Manager.hearts);
            },1000);
        }else{
            this.enemy.walk();
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

        if(this.enemy_flag){

            const hitbox_bullet = this.player.hitboxBullet();
            for(const h  of hitbox_bullet) {
                
                if(checkCollition(h, this.enemy) != null){
                    h.destroy();
                    this.enemy.Damage_received += 1;
                    if(this.enemy.hurt()){
                        this.enemy.death();
                        setTimeout(() => {
                            
                            this.enemy.destroy();
                            this.enemy_flag = false;
                        }, 1000);
                    }
                }
            }
        }

        if(checkCollition(this.player, this.lever) != null){
            this.lever.heldDown();
            this.Trap.offEffect();
            this.lever.lever_state = true;
        }

        if(Board.card == 3 && this.door.flag_door == false){
            this.door.OpenDoor();
        }
        
    }

    public WinLevel():void{
        const win = new ResultTable(true, new Level1(), new Level2());
        Manager.hearts = 3;
        Board.card = 0;
        this.addChild(win);
    }
    public GameOver(lifes:number):void{
        
        if(lifes > 0){
            Manager.changeScene( new Level1());
        }else{
            Manager.score = 0;
            Manager.hearts = 3;
            Board.card = 0;
            const gameOver = new ResultTable(false, new Level1(), new Level2());
            this.addChild(gameOver);
           
        }

    }
}