import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

/**
 * 小鸟类
 */
export class Birds extends Sprite {
    
    constructor() {
        const img = DataStore.getInstance().getRes( "birds" );
        super( 
            img,
            0, 0,
            img.width / 3, img.height,
            0, 0, 
            img.width / 3, img.height
        );
        this.clippingX = [ 
            8, 
            8 + 31 + 21,
            8 + 31 + 21 + 31 + 21  
        ];
        this.clippingY = [ 11, 11, 11 ];
        this.clippingWidth = [ 31, 31, 31 ];
        this.clippingHeight = [ 24, 24, 24 ];
        const birdX = DataStore.getInstance().canvas.width / 4;
        this.birdsX = [ birdX, birdX, birdX ];
        const birdY = DataStore.getInstance().canvas.height / 2;
        this.birdsY = [ birdY, birdY, birdY ];
        const birdWidth = 31;
        this.birdsWdith = [ birdWidth, birdWidth, birdWidth ];
        const birdHeight = 24;
        this.birdsHeight = [ birdHeight, birdHeight, birdHeight ];
        this.y = [ birdY, birdY, birdY ];
        this.index = 0;
        this.count = 0;
        this.time = 0;
        // 重力加速度
        this.gavity = 0.98;
    }

    draw() {
        const speed = 0.2;
        this.count += speed;
        if( this.index >= 2 ) {
            this.count = 0;
        }
        // 减速器的作用，减少切换速度
        this.index = Math.floor( this.count );
        // 上升的偏移量
        let offsetUp = 30;
        // 加速度
        const g = this.gavity / 2.4; 
        let offsetY = g * this.time * ( this.time - offsetUp ) / 2 ;
        // console.log( offsetY );
        for( let i = 0; i < this.birdsY.length; i++ ) {
            this.birdsY[ i ] = this.y[ i ] + offsetY;
        }
        if( this.birdsY[ 0 ] + this.birdHeight > window.innerHeight ) {
            this.time = 0;
        }
        this.time++;
        
        // this.srcX = this.clippingX[ this.index ];
        // this.srcY = this.clippingY[ this.index ];
        // this.srcW = this.clippingWidth[ this.index ];
        // this.srcH = this.clippingHeight[ this.index ];
        // this.x = this.birdsX[ this.index ];
        // this.y = this.birdsY[ this.index ];
        // this.width = this.birdsWdith[ this.index ];
        // this.height = this.birdsHeight[ this.index ];
        super.draw( 
            this.img, 
            this.clippingX[ this.index ], this.clippingY[ this.index ],
            this.clippingWidth[ this.index ], this.clippingHeight[ this.index ],
            this.birdsX[ this.index ], this.birdsY[ this.index ],
            this.birdsWdith[ this.index ], this.birdsHeight[ this.index ]
         );
    }


}