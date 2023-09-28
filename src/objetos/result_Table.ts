import { Container, Graphics, Text } from "pixi.js";
import { screen_app } from "..";
import { Button } from "./button";
import { Manager } from "../game/Manager";
import { MenuScene } from "../Scenes/menu";
import { World_game } from "../Scenes/World";

export class ResultTable extends Container{

    private title_result: string;

    constructor(match_result: boolean){
        super();

        const UI_win: Graphics = new Graphics();
        UI_win.beginFill(0x000000, 0.1);
        UI_win.drawRect((screen_app.width/2)- 300, (screen_app.height/2)-250, 600, 500);

        match_result ? this.title_result = '¡Winner!' : this.title_result = 'Game Over :(';

        const content_text: Text = new Text(this.title_result, {fontSize: 48, fontFamily: 'PixelFont', fill: 0xffffff});
        content_text.anchor.set(0.5);
        content_text.position.set(screen_app.width/2, screen_app.height/2 - content_text.height);

        const home_button = new Button('', 'home');
        home_button.position.set( screen_app.width/2 ,  screen_app.height/2 + content_text.height);
        
        
        const Return_button = new Button('', 'return');
        Return_button.position.set((screen_app.width/2) - 200 ,  screen_app.height/2 + content_text.height);
        
        this.addChild(UI_win);
        this.addChild(content_text);
        
        if(match_result){
            const Continue_button = new Button('', 'arrow_right');
            Continue_button.position.set((screen_app.width/2) + 200 ,  screen_app.height/2 + content_text.height);
            UI_win.addChild(Continue_button);
        }else{
            home_button.position.set( screen_app.width/2 + 100 ,  screen_app.height/2 + content_text.height);
            Return_button.position.set((screen_app.width/2) - 100 ,  screen_app.height/2 + content_text.height);

        }


        UI_win.addChild(Return_button);
        UI_win.addChild(home_button);
    
        home_button.on('mouseup', () => {Manager.changeScene(new MenuScene())});
        Return_button.on('mouseup', () => {Manager.changeScene( new World_game())});

    }
}