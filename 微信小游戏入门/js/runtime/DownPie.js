import { DataStore } from "../base/DataStore.js";
import { Director } from "../Director.js";
import { Pie } from "./Pie.js";

/**
 * 下半部的铅笔
 */
export class DownPie extends Pie {
    
    constructor( top ) {
        const img = DataStore.getInstance().getRes( "pie_down" );
        super( img, top );
    }

    draw() {
        this.y = this.top + Director.getInstance().vGap;
        super.draw();
    }

}