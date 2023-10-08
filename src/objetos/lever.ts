import { Container, Graphics, Rectangle, Sprite} from "pixi.js";
import { IHitbox } from "../IU/IHitbox";
import { sound } from "@pixi/sound";


export class Lever extends Container implements IHitbox{
    
    private hitbox: Graphics;

    public lever_state: boolean = false;

    private lever_base: Sprite;
    private lever_top: Sprite;

    constructor(){
        super();   
        
        this.lever_base = Sprite.from('3 Objects/2 Decoration/5.png');
        this.lever_top = Sprite.from('3 Objects/2 Decoration/6.png');

        this.lever_base.scale.set(3);
        this.lever_top.scale.set(3);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x23ffFF, 0.0001);
        this.hitbox.drawRect(0, 0, this.lever_base.width, this.lever_base.height);
        this.hitbox.endFill();

        this.addChild(this.hitbox);
        this.addChild(this.lever_base);
        this.addChild(this.lever_top);

    }

    public heldDown(){
        if(this.lever_state == false){

            sound.play('click', {volume: 0.3, loop:false});
            this.lever_base.scale.y =2;
            this.lever_base.position.y = +5;
            this.lever_top.position.y = +5;
        }
    }

    public getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }
}