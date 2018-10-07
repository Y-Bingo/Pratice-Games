import { SpriteMrg } from "./base/SpriteMrg.js";
import { MAX_ANGLE, MIN_ANGLE, BUBBLE_FLY_SPEED } from "./base/Config.js";
import { DataMrg } from "./base/DataMrg.js";

/**
 * 导演类
 */
export class Director {
    
    constructor() {
        // 指针的当前角度
        this.pointerAngle = 0;
        this.curBubble =  SpriteMrg.get( "cur_bubble" );
        this.isShooting = false;
        this.timer = null;
    }
    // 泡泡发射
    shootBubble(  ) {
        if( this.isShooting ) return;
        this.isShooting = true; 
        this.curBubble.speedX = Math.floor( BUBBLE_FLY_SPEED * Math.sin( this.pointerAngle * Math.PI / 180 ) );
        this.curBubble.speedY = -Math.floor( BUBBLE_FLY_SPEED * Math.cos( this.pointerAngle * Math.PI / 180 ) );
        this.bubbleFlyAnimation();
    }

    // 泡泡飞行动画
    bubbleFlyAnimation() {
        SpriteMrg.drawSprites();
        this.timer = window.requestAnimationFrame( () => { this.bubbleFlyAnimation() } );
        this.curBubble.draw( this.curBubble.x + this.curBubble.speedX, this.curBubble.y + this.curBubble.speedY );
        switch( this.hitWall( this.curBubble ) ) {
            case 1: 
                this.curBubble.speedX = -this.curBubble.speedX;
                break;
            case 2:
                this.curBubble.speedY = -this.curBubble.speedY;
                break;
            default:
                break;
        }
        if( this.hitBubble( this.curBubble ).length ) {
            cancelAnimationFrame( this.timer );
        }
        
    }

    // 碰墙判定
    hitWall( target ) {
        let isHit = 0;
        let wallLeft = 0;
        let wallRight = this.ctx.canvas.width;
        let wallTop = 0;
        let wallBottom = this.ctx.canvas.height;
        let curBubbleModel = target.getModel();
        if( curBubbleModel.centerX + curBubbleModel.radius > wallRight ||
            curBubbleModel.centerX - curBubbleModel.radius < wallLeft
        ) {
                isHit = 1;
        } 
        else if( 
                curBubbleModel.centerY + curBubbleModel.radius > wallBottom ||
                curBubbleModel.centerY - curBubbleModel.radius < wallTop
            ) {
                isHit = 2;
            }
        return isHit;
    }

    hitBubble( target ) {
        let curBubbleModel = target.getModel();
        let bubbles = DataMrg.get( "bubbles" );
        for( let row = 0; row < bubbles.length; row++ ) {
            for( let col = 0; col < bubbles[ row ].length; col++ ) {
                let model = bubbles[ row ][ col ].getModel();
                if( Math.pow( ( curBubbleModel.centerX - model.centerX ), 2 ) + Math.pow( ( curBubbleModel.centerY - model.centerY ), 2 ) <= Math.pow( curBubbleModel.radius + model.radius, 2 )  ) {
                    return [ row, col ];
                }
            }
        }
        return [];
    }

    // 旋转指针
    spinPointer( detaAngle ) {
        this.pointerAngle = Math.max( 
            Math.min( this.pointerAngle + detaAngle, MAX_ANGLE ),
            MIN_ANGLE 
        );
        this.pointerRotateAnimation();
    }

    pointerRotateAnimation() {
        let pointer = SpriteMrg.get( "pointer" );
        this.ctx.clearRect( pointer.x, pointer.y, pointer.width, pointer.height );
        pointer.rotation( this.pointerAngle );
        this.curBubble.draw( ( window.innerWidth - this.curBubble.width ) / 2, window.innerHeight - this.curBubble.height );
    }

    // 泡泡定位
    fixedBubble() {
        
    }

    // 上装bubble 到发射器
    loadBubble() {

    }

    // 泡泡消除
    clearBubble(){

    }

    // 判断泡泡是否有支点
    hasLinkRoot() {
        return false;
    }

    // 检查是否越过临界线
    checkCrossLine() {
        return false;
    }

}