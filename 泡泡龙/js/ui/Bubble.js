import { RES } from "../base/ResMrg.js";
import { MAX_COL } from "../base/Config.js";
// 直径
const DIAMATER = 50;
/**
 * 泡泡： 用图片来代替手工画
 */
export class Bubble {

    constructor( value, row, col ) {
        this.value = value || 0;
        this.row = row !== undefined ? row : NaN;
        this.col = col !== undefined ? col : NaN;
        this.index = `( ${ this.row }, ${ this.col } )`;
        this.img = RES.getRes( `bubble_${this.value}` );
        this.isHang = false;
        this.width = DIAMATER;
        this.height = DIAMATER;
        this.boundings = this.getBoundings();
        this.resetProps();
    }

    resetProps() {
        this.offsetX = this.row % 2 ? this.width / 2 : 0;
        this.y = this.row * ( this.height - 6 );
        this.x = this.col * this.width + this.offsetX;
    }
    /**
     * 如果传参，则根据参数来绘制canvas，如果没有则，按照row，col来绘制
     * @param {number} x 画图的新横坐标
     * @param {number} y 画图的新纵坐标
     */
    draw( x, y ) {

        this.y = y || this.y;
        this.x = x || this.x;
        // this.ctx.moveTo( this.x, this.y );
        // this.ctx.lineTo( this.x + this.width, this.y )
        // this.ctx.lineTo( this.x + this.width, this.y + this.height );
        // this.ctx.lineTo( this.x, this.y + this.height );
        // this.ctx.lineTo( this.x, this.y );
        // this.ctx.stroke();
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
    getCircleModel( ) {
        let radius =  this.width / 2,
            centerX = this.x + radius,
            centerY = this.y + radius;
        return {
            radius, centerX, centerY
        }
    }

    getRectModel() {
        let x = this.x,
            y = this.y,
            width = this.width,
            height = this.height;
        return {
            x, y, width, height
        }
    }

    // 获取周围没有球的点, 调用该方法时，球必须在上方悬挂
    getBoundings() {
        let row = this.row,
            col = this.col,
            // 左边位置
            offsetLeft = ( row + 1 ) % 2,
            // 右边偏移位置
            offsetRight = ( row ) % 2,
            // 附近六个球的坐标
            boundings = [
                [ row - 1, col - offsetLeft ], [ row - 1, col + offsetRight ],
                [ row, col - 1 ], [ row, col + 1 ],
                [ row + 1, col - offsetLeft ], [ row + 1, col + offsetRight ],
            ];
        boundings =  boundings.filter( ( bubbleIndex, i ) => {
            if( bubbleIndex[ 1 ] < 0 || bubbleIndex[ 1 ] >= MAX_COL - bubbleIndex[ 0 ] % 2 || bubbleIndex[ 0 ] < 0 ) {
                return false;
            }
            return true;
        });
        // 下边界
        return boundings;
    }



}
