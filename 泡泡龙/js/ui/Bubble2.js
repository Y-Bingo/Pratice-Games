import { RES } from "../base/ResMrg.js";

/**
 * 泡泡： 用图片来代替手工画
 */
export class Bubble2 {

    constructor( value, row, col ) {
        this.value = value || 0;
        this.row = row !== undefined ? row : NaN;
        this.col = col !== undefined ? col : NaN;
        this.img = RES.getRes( `bubble_${this.value}` );
        this.width = this.img.width;
        this.height = this.img.height;
        this.y = 0;
        this.x = 0;
        this.offsetX = row % 2 ? this.width / 2 : 0;
    }
    /**
     * 如果传参，则根据参数来绘制canvas，如果没有则，按照row，col来绘制
     * @param {number} x 画图的新横坐标 
     * @param {number} y 画图的新纵坐标
     */
    draw( x, y ) {
        
        this.y = y || this.row * this.height;
        this.x = x || this.col * this.width + this.offsetX;
        if( !this.ctx ) {
            console.log( "该精灵还没有注册到精灵管理" );
        } else {
            this.ctx.drawImage(
                this.img,
                0, 0,
                this.img.width, this.img.height,
                this.x, this.y,
                this.width, this.height
            ); 
        }
    }

    // 获取泡泡球模型
    getModel( ) {
        let radius = this.width / 2;
        let centerX = this.x + radius;
        let centerY = this.y + radius;
        return {
            radius, centerX, centerY
        }
    }



}