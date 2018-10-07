import { DataStore } from "./DataStore.js";

/**
 * 精灵基类
 */
export class Sprite {
    /**
     * @param { Image } img 图片资源 
     * @param { number } srcX 图片资源截取的开始X坐标 
     * @param { number } srcY 图片资源截取的开始Y坐标 
     * @param { number } srcW 截取的宽
     * @param { number } srcH 截取的高
     * @param { number } x 画图的开始X坐标
     * @param { number } y 画图的开始的Y坐标
     * @param { number } width 画图的宽
     * @param { number } height 画图的高
     */
    constructor(
        img = null,
        srcX = 0, srcY = 0,
        srcW = 0, srcH = 0,
        x = 0, y = 0,
        width = 0, height = 0
    ) {
        this.dataStore = DataStore.getInstance();
        this.ctx = this.dataStore.ctx;
        this.img = img;
        this.srcX = srcX;
        this.srcY = srcY;
        this.srcW = srcW;
        this.srcH = srcH;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw( img, srcX, srcY, srcW, srcH, x, y, width, height ) {
            img = img || this.img,
            srcX = srcX || this.srcX,
            srcY = srcY || this.srcY,
            srcW = srcW || this.srcW,
            srcH = srcH || this.srcH,
            x = x || this.x,
            y = y || this.y,
            width = width || this.width,
            height = height || this.height;
        this.ctx.drawImage(
            img, 
            srcX,
            srcY,
            srcW,
            srcH,
            x,
            y,
            width,
            height
        );
    }

    
}