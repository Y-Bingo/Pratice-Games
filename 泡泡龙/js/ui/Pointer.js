import { RES } from "../base/ResMrg.js";
/**
 * 指针
 */
export class Pointer {

    constructor () {
        this.x = 0;
        this.y = 0;
        this.img = RES.getRes( "pointer" );
        this.width = this.img.width;
        this.height = this.img.height;
        this.angle = 0;
        // 设置精灵的锚点
        this.anchoOffsetX = window.innerWidth / 2;
        this.anchoOffsetY = window.innerHeight - 31;
    }

    draw ( x, y ) {
        // let angle = this.angle ;
        this.ctx.save();
        this.x = x - this.anchoOffsetX || window.innerWidth / 2 - this.width / 2;
        this.y = y - this.anchoOffsetY || window.innerHeight - this.height;
        if ( !this.ctx )
        {
            console.log( "该精灵还没有注册到精灵管理" );
        } else
        {
            let traX = this.anchoOffsetX;
            let traY = this.anchoOffsetY;
            this.ctx.translate( traX, traY );
            this.ctx.rotate( this.angle );
            this.ctx.translate( -traX, -traY );
            this.ctx.drawImage(
                this.img,
                0, 0,
                this.img.width, this.img.height,
                this.x, this.y,
                this.width, this.height
            );
            this.ctx.translate( traX, traY );
            this.ctx.rotate( -this.angle );
            this.ctx.translate( -traX, -traY );
            // 恢复设置
            this.ctx.restore();
        }
    }

    rotation ( angle ) {
        this.angle = angle * Math.PI / 180;
        // this.ctx.save();
        // // this.ctx.translate( window.innerWidth / 2, window.innerHeight / 2 );
        // // this.ctx.rotate( this.angle );
        // // let traX = window.innerHeight / 2 * Math.sin( angle );
        // // let traY = window.innerHeight / 2 * ( 1 -  Math.cos( angle ) );
        // // this.ctx.translate( -traX, -traY );
        // let traX = this.anchoOffsetX;
        // let traY = this.anchoOffsetY;
        // this.ctx.translate( traX, traY );
        // this.ctx.rotate( this.angle );
        // this.ctx.translate( -traX, -traY );
        // this.draw( );
        // this.ctx.translate( traX, traY );
        // this.ctx.rotate( -this.angle );
        // this.ctx.translate( -traX, -traY );
        // // 恢复设置
        // this.ctx.restore();
        return this;
    }

}
