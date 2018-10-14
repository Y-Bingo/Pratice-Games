import { DataStore } from "../base/DataStore.js";
import { Pie } from "./Pie.js";

/**
 * 上半部的铅笔
 */
export class UpPie extends Pie {
    
    constructor( top ) {
        const img = DataStore.getInstance().getRes( "pie_up" );
        super( img, top );
    }

    draw() {
        this.y = this.top - this.height;
        super.draw();
    }
}