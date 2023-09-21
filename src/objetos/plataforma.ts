import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "../IU/IHitbox";


export class Plataformas extends Container implements IHitbox{
    private hitbox: Graphics;
    private texture_plat: Sprite;

    constructor(texture: string[]| string, repeat:number = 1, orientation_h:boolean = true, angle:number = 0){
        super();

        let hitbox_width = 0;
        this.texture_plat = Sprite.from('3 Objects/2 Decoration/6.png');

        if(typeof texture !== 'string'){
            for (const text of texture) {
                this.texture_plat = Sprite.from(text);
                this.texture_plat.scale.set(1);
                if(orientation_h){
    
                    this.texture_plat.position.set(hitbox_width - 3, 0);
                    
                    hitbox_width += this.texture_plat.width - 3;
                }else{

                    this.texture_plat.position.set(0, hitbox_width- 3);
                    hitbox_width += this.texture_plat.height - 3;
                }
                this.texture_plat.angle = angle;
                this.addChild(this.texture_plat);

            }
        }else{
            for (let i = 0; i<repeat; i++) {
                this.texture_plat = Sprite.from(texture);
                this.texture_plat.scale.set(1);
                this.texture_plat.position.set(hitbox_width - 3, 0);
                this.texture_plat.angle = angle;
                this.addChild(this.texture_plat);

                hitbox_width += this.texture_plat.width - 3;
            }
        }

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x23ffFF, 0.001);
        orientation_h?      
        this.hitbox.drawRect(0,0,hitbox_width,this.texture_plat.height):
        this.hitbox.drawRect(0,0,this.texture_plat.width, hitbox_width);
        this.hitbox.endFill();
        this.hitbox.angle = angle;

        this.addChild(this.hitbox);
    }
    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }


}