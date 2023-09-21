import { Container, Sprite, Text } from "pixi.js";
import { screen_app } from "..";
import { IScene } from "../IU/IScene";
import { Button } from "../objetos/button";
import { Manager } from "../game/Manager";
import { World_game } from "./World";

export class MenuScene extends Container implements IScene{
    constructor(){
        super();

        const background: Sprite = Sprite.from('fondo');
        background.scale.set(0.7);
        this.addChild(background);
        const Title = new Text('Game Platforms', {fontSize: 56, fontFamily: 'PixelFont', fontWeight:'700'});
        Title.position.set((screen_app.width/2) - (Title.width /2), 200); 
        
        this.addChild(Title);

        const Btn_play = new Button('Play',  'botton_green_up');
        Btn_play.position.set((screen_app.width/2) - (Btn_play.width /2), 400);
        Btn_play.scale.set(2.5);

        Btn_play.on('mouseup', () => {Manager.changeScene(new World_game())});

        this.addChild(Btn_play);
    
    }
    update(_deltaTime: number, _deltaFrame: number): void {
        
    }

}