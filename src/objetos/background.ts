import { Container, Sprite } from "pixi.js";

export class Background extends Container {
    constructor(){
        super();

        const top_texture:  Sprite = Sprite.from('backg_top');
        const center_texture:  Sprite = Sprite.from('backg_center');
        const bottom_texture:  Sprite = Sprite.from('backg_bottom');

        this.addChild(top_texture);


        
        for(let i = 0; i < 10; i++ ){
            for(let j = 0; j < 10; j++){

            }
        }

        this.addChild(center_texture);
        this.addChild(bottom_texture);

    }
}