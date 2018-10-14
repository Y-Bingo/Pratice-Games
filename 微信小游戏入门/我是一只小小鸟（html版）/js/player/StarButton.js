import { Sprite } from '../base/Sprite.js'
import { DataStore } from '../base/DataStore.js';


export class StarButton extends Sprite {
    constructor() {
        const img = DataStore.getInstance().getRes( "start_button" );
        super( 
            img,
            0, 0,
            img.width, img.height,
            ( window.innerWidth - img.width ) / 2, ( window.innerHeight - img.height ) / 2.5,
            img.width, img.height  );
    }
}