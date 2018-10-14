import { DataStore } from "../base/DataStore.js"
/**
 * 分数类
 */
export class Score {
    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.scoreNumer = 0;
        this.isScore = true;
    }

    draw() {
        this.ctx.font = "25px Arial";
        this.ctx.fillStyle = "#ffcbeb";
        this.ctx.fillText(
            this.scoreNumer,
            window.innerWidth / 2,
            window.innerHeight / 8,
            500
        )
    }

    addScore() {
        if( this.isScore ) {
            this.scoreNumer++ ;
            this.isScore = false;
        }
    }
}