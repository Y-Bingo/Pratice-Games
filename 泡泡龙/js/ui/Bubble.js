import { DataMrg } from "../base/DataMrg.js";
import { SpriteMrg } from "../base/SpriteMrg.js";
/**
 * 泡泡类
 */
export class Bubble {

    constructor( value, row, col ) {
        // 获取上下文
        this.ctx = SpriteMrg.getInstance().ctx;
        // 泡泡的值
        this.value = value || 0;
        this.color = DataMrg.getInstance().getColor( this.value );
        // 泡泡的半径
        this.radius = 15;
        // 泡泡的横坐标
        this.row = row || 1;
        // 泡泡的纵坐标
        this.col = col || 1;
    }

    // 画泡泡
    draw() {
        this.ctx.save();
        this.ctx.beginPath();
        let gradient = this.ctx.createRadialGradient(
            this.row * 10, this.col * 13, 2,
            this.row * 15, this.col * 15, 15
        );  
        gradient.addColorStop( 0, "#ffffff" );
        gradient.addColorStop( 1, this.color );
        this.ctx.fillStyle = gradient;
        this.ctx.arc( 
            this.row * 15, this.col * 15,
            this.radius,
            0, Math.PI * 2, 
            false );
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
            // this.drawValue();
    }

    drawValue() {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#11111";
        this.ctx.font = "15px Arial";
        this.ctx.strokeText(
            this.value,
            this.row * 15 /2,
            this.col * 15 
        );
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }

}