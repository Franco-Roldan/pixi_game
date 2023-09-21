import { Container, Sprite, Text} from "pixi.js";
import { screen_app } from "..";
import { IScene } from "../IU/IScene";
import { Manager } from "../game/Manager";

export class Board extends Container implements IScene{
    

    public static Card:number = 0;
    public Score_value:Text;
    public heart:Sprite;
    public card_value: Text;
    public heartsLife: number = Manager.hearts;

    constructor(){
        super();

        this.Score_value = new Text('0', {fontSize: 28, fontFamily: 'PixelFont', fontWeight:'400', fill:0xFFFFFF});
        this.Score_value.position.set(screen_app.width - this.Score_value.width - 100, 0);
        const text_score = new Text('score:',{fontSize: 28, fontFamily: 'PixelFont', fontWeight:'400', fill:0xFFFFFF})
        text_score.position.set(this.Score_value.x - text_score.width -5, 0 );
        this.addChild(text_score);



        this.card_value = new Text('0', {fontSize: 28, fontFamily: 'PixelFont', fontWeight:'400', fill:0xFFFFFF});
        this.card_value.position.set(text_score.x - this.card_value.width -150, 0);
        const text_card = new Text('/3',{fontSize: 28, fontFamily: 'PixelFont', fontWeight:'400', fill:0xFFFFFF} );
        text_card.position.set(this.card_value.x + this.card_value.width,0);
        this.addChild(text_card);

        const texture_card = Sprite.from('card4.png');
        texture_card.scale.set(2.5);
        texture_card.position.set(this.card_value.x - texture_card.width/2 - 18, -7);
        texture_card.tint = 0x707B7C;
        this.addChild(texture_card);


        this.heart = Sprite.from('tile_0044.png');
      
        for(let i = 0; i<3; i++){

            const heartBg = Sprite.from('tile_0046.png');
            heartBg.scale.set(2);
            heartBg.position.set(this.heart.width * i +1, 0);
            this.addChild(heartBg);
            
            if(Manager.hearts > i){

                this.heart = Sprite.from('tile_0044.png');
                this.heart.scale.set(2);
                this.heart.position.set(this.heart.width * i +1, 0);
                this.addChild(this.heart);
            }
        }
        
        this.addChild(this.Score_value);
        this.addChild(this.card_value);
    }

    public static get card():number{
        return Board.Card;
    }
    public static set card(value){
        Board.Card = value;
    }

    public removeLife(): void{

        Board.card = 0;

        if(Manager.hearts < 3){
            this.removeChild(this.heart);
        }
    }

    public update(_deltaTime: number, _deltaFrame: number): void {
        this.Score_value.text = Manager.score.toString();
        this.card_value.text = Board.card.toString();
    }

}
