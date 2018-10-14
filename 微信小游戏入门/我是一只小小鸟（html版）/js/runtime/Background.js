import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class BackGround extends Sprite {
    
    constructor( ) {
        const img = DataStore.getInstance().getRes( "background" );
        super( img , 
            0, 0, 
            img.width, img.height, 
            0, 0, 
            window.innerWidth, window.innerHeight );
        console.log( img.width, img.height, window.innerWidth, window.innerHeight );
    }
   
}