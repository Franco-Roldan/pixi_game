import { Container, Sprite } from "pixi.js";


export class Deco_asset extends Container{
    constructor(collection:any){
        super();

        let deco_asset: Sprite;

        for (const asset of collection) {
            deco_asset = Sprite.from(asset.name);
            deco_asset.scale.set(asset.scale)
            if(asset.rotation != 0){
                deco_asset.angle = asset.rotation;
            }
            deco_asset.position.set(asset.x, asset.y);
            this.addChild(deco_asset);
        }
        
    }
}

export const deco_level_one = [
    {
        name: '1 Tiles/Tile_55.png',
        x: 840,
        y: 400,
        rotation: 0,
        scale: 10
    },
    {
        name: '3 Objects/3 Power lines/4.png',
        x: 20,
        y: 115,
        rotation: 0,
        scale: 1.5
    },
    {
        name: '3 Objects/3 Power lines/1.png',
        x: 900,
        y: 310,
        rotation: 0,
        scale: 1.5
    },
    {
        name: '1 Tiles/Tile_49.png',
        x: 495,
        y: 520,
        rotation: 0,
        scale: 4.4
    },
    {
        name: '1 Tiles/Tile_49.png',
        x: 346,
        y: 560,
        rotation: 0,
        scale: 1
    },
    {
        name: '1 Tiles/Tile_61.png',
        x: 378,
        y: 560,
        rotation: 0,
        scale: 1
    },            
    {
        name: '1 Tiles/Tile_61.png',
        x: 410,
        y: 560,
        rotation: 0,
        scale: 1
    },
    {
        name: '1 Tiles/Tile_61.png',
        x: 442,
        y: 560,
        rotation: 0,
        scale: 1
    },
    {
        name: '1 Tiles/Tile_61.png',
        x: 442,
        y: 592,
        rotation: 0,
        scale: 1
    },
    {
        name: '1 Tiles/Tile_61.png',
        x: 442,
        y: 624,
        rotation: 0,
        scale: 1
    },
    {
        name: '1 Tiles/Tile_49.png',
        x: 346,
        y: 592,
        rotation: 0,
        scale: 1
    },
    {
        name: '1 Tiles/Tile_61.png',
        x: 378,
        y: 592,
        rotation: 0,
        scale: 1
    },
    {
        name: '1 Tiles/Tile_49.png',
        x: 346,
        y: 624,
        rotation: 0,
        scale: 1
    },
    {
        name: '1 Tiles/Tile_61.png',
        x: 378,
        y: 624,
        rotation: 0,
        scale: 1
    },
    {
        name: '3 Objects/2 Decoration/25.png',
        x: 390,
        y: 578,
        rotation: 0,
        scale: 1
    },
    {
        name: '3 Objects/2 Decoration/26.png',
        x: 550,
        y: 608,
        rotation: 0,
        scale: 1
    },
    {
        name: '3 Objects/1 Tube/2.png',
        x: 572,
        y: 550,
        rotation: 90,
        scale: 1
    },
    {
        name: '3 Objects/1 Tube/1.png',
        x: 572,
        y: 585,
        rotation: 90,
        scale: 1
    },
    {
        name: '3 Objects/2 Decoration/24.png',
        x: 0,
        y:  578,
        rotation: 0,
        scale: 1
    },
    {
        name: '3 Objects/2 Decoration/27.png',
        x: 50,
        y: 620,
        rotation: 0,
        scale: 1
    },
    {
        name: '1 Tiles/Tile_55.png',
        x: 312,
        y: 172,
        rotation: 0,
        scale: 9.2
    },
    {
        name: '3 Objects/2 Decoration/15.png',
        x: 330,
        y: 190,
        rotation: 0,
        scale: 2.5
    },
    {
        name: '3 Objects/2 Decoration/17.png',
        x: 335,
        y: 260,
        rotation: 0,
        scale: 2
    },
    {
        name: '3 Objects/2 Decoration/8.png',
        x: 355,
        y: 235,
        rotation: 0,
        scale: 2.3
    },
    {
        name: '3 Objects/2 Decoration/1.png',
        x: 490,
        y: 190,
        rotation: 0,
        scale: 1.5
    },
    {
        name: '3 Objects/2 Decoration/2.png',
        x: 490,
        y: 220,
        rotation: 0,
        scale: 1.5
    },
    {
        name: '3 Objects/1 Tube/6.png',
        x: 360,
        y: 310,
        rotation: 90,
        scale: 3.5
    },
    {
        name: '3 Objects/1 Tube/10.png',
        x: 400,
        y: 320,
        rotation: 0,
        scale: 2.7
    },
    {
        name: '3 Objects/1 Tube/3.png',
        x: 350,
        y: 320,
        rotation: 0,
        scale: 2.3
    },
    {
        name: '3 Objects/1 Tube/5.png',
        x: 500,
        y: 315,
        rotation: 0,
        scale: 2.3
    },
    {
        name: '3 Objects/2 Decoration/12.png',
        x: 490,
        y: 427,
        rotation: 0,
        scale: 2
    },


]