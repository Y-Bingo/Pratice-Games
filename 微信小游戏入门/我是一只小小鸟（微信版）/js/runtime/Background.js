import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class BackGround extends Sprite {
    
    constructor( ) {
        const img = DataStore.getInstance().getRes( "background" );
        super( 
			img , 
            0, 0, 
            img.width, img.height, 
            0, 0, 
            DataStore.getInstance().canvas.width, DataStore.getInstance().canvas.height );
    }
   
}