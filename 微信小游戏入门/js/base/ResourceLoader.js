import { Resource } from "./Resource.js";

export class RES {

    constructor() {
        this.res_map = new Map( Resource );
        for( let [ key, value ] of this.res_map ) {
            let image = new Image();
            image.src = value;
            this.res_map.set( key, image );
        }
    }

    onLoaded( callback ) {
        let loaded_count = 0;
        for( let value of this.res_map.values() ) {
            value.onload = () => {
                loaded_count++;
                if( loaded_count >= this.res_map.size ) {
                    callback( this.res_map );
                    return ;
                }
            }
        }
    }

    static createResourceLoader() {
        return new RES();
    }

}