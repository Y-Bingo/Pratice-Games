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
            DataStore.getInstance().canvas.width / 2,
            DataStore.getInstance().canvas.height / 8,
            500
        )
    }

    addScore() {
        if( this.isScore ) {
            this.scoreNumer++ ;
            this.isScore = false;
            // 微信API 震动
            // wx.vibrateShort( {
            //     success: () =>{
            //         console.log( "震动成功！" );
            //     },
            //     fail: () =>{
            //         console.log( "震动失败" );
            //     },
            //     complete: () =>{
            //     }
            // } )
        }
    }
}