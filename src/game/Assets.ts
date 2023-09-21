import { ResolverManifest } from "pixi.js";


export const assets: ResolverManifest = {
    bundles: [
        {
            name: 'background',
            assets: {
                bg_1: './background/bg-1.png',
                bg_2: './background/bg-2.png',
                bg_3: './background/bg-3.png',
                bg_4: './background/bg-4.png',
                bg_5: './background/bg-5.png',
                bg_6: './background/bg-6.png',
                bg_7: './background/bg-7.png',
                bg_8: './background/bg-8.png',
            }
        },
        {
            name: 'assets',
            assets: {
                fondo : './puente_fondo.jpg',
            }
        },
        { 
            name: 'player',
            assets: {
                player_one: './player_assets/bobrob.json'
            }   
            
        },
        {
            name : 'power_station_assets',
            assets: {
                block: './power_station_assets/power_station.json',
                money: './animation/money.json',
                card: './animation/card.json',
                door: './animation/doorAnimated.json',
                trap: './animation/trapAnimated.json',
                corazon: './block/corazon.json'
            }
          
        },
        {
            name: 'IU',
            assets: {
                botton_green_up : './IU/Button_texture_1.png',
                botton_green_down : './IU/Button_texture_2.png',
                arrow_right: './IU/arrowRight.png',
                home: './IU/home.png',
                return: './IU/return.png',  
            }
        }

    ]
};


// export const assets = {
//     player_frame1: './player_assets/player_11.png',
//     player_frame2: './player_assets/player_12.png',
//     player_frame3: './player_assets/player_13.png',
//     stone_block: './block/bloque_piedra.png',
//     stone_block2: './block/ground_04.png',
//     caja: './block/crate_07.png',
//     cajaHierro: './block/crate_11.png',
//     bockRed: './block/crate_18.png',
//     plat_center: './block/platformIndustrial_003.png',
//     plat_left: './block/platformIndustrial_015.png',
//     plat_rigth: './block/platformIndustrial_016.png',
// };