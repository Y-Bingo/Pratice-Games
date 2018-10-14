import { DataStore } from "../base/DataStore.js";
import { Pie } from "./Pie.js";

/**
 * 下半部的铅笔
 */
export class DownPie extends Pie {

    constructor(top) {
        const img = DataStore.getInstance().getRes("pie_down");
        super(img, top);
		this.vGap = DataStore.getInstance().canvas.height / 5;
    }

    draw() {
        this.y = this.top + this.vGap;
        super.draw();
    }

}