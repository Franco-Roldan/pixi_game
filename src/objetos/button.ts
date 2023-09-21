import { Container, Sprite, Text} from "pixi.js";


export class Button extends Container{


    private texture_button:Sprite;
   
    constructor(text_content:string, texture:string ){

        super(); 
        
      
        this.texture_button = Sprite.from(texture);
        this.texture_button.anchor.set(0.5);

        if(text_content != ''){
            const text_button = new Text(
                text_content, {fontSize: 11, fill:0x000000, fontFamily: 'PixelFont'}
            );

            text_button.anchor.set(0.5);
            text_button.position.set(0,0);

            this.texture_button.addChild(text_button);
        }
      
        this.addChild(this.texture_button);

        this.on('mousedown', () => {
            this.texture_button.scale.set(0.9);
        });
        this.on('mouseup', () => {
            this.texture_button.scale.set(1);
        });
        this.interactive = true;

        this.cursor = 'pointer';

    }
}