import { AnimatedSprite, Container, Texture } from "pixi.js";

export class StateAnimation extends Container{
    private state: Map<string, AnimatedSprite> = new Map();

    public playState(stateName:string, restarAnim:boolean = true){
        this.removeChildren();
        
        const currentState = this.state.get(stateName);
        if(currentState){
            this.addChild(currentState);
            if(restarAnim){
                currentState.gotoAndPlay(0);
            }
        }
    }

    public addState(stateName:string, frames:string[], speed:number= 0.20, loop:boolean = true){
        const textArray: Texture[] = [];
        for (const text of frames) {
            textArray.push(Texture.from(text));
        }

        const tempAnim: AnimatedSprite= new AnimatedSprite(textArray);
        tempAnim.animationSpeed = speed;
        tempAnim.loop = loop;
        tempAnim.anchor.set(0.25, 0);

        tempAnim.play();
        this.state.set(stateName, tempAnim);
    }

    public update(frames: number){
        for (const state of this.state.values()) {
            state.update(frames);
        }
    }

}