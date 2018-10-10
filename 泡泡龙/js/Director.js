import { SpriteMrg } from "./base/SpriteMrg.js";
import { MAX_ANGLE, MIN_ANGLE, BUBBLE_FLY_SPEED, table } from "./base/Config.js";
import { DataMrg } from "./base/DataMrg.js";
import { Bubble2 } from "./ui/Bubble2.js";

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
        // 被撞的bubble
        let hitedBubbleIndex = this.hitBubble( this.curBubble );
        if( hitedBubbleIndex ) {
            cancelAnimationFrame( this.timer );
            this.fixedBubble( hitedBubbleIndex );
        }
        
    }

    // 碰墙判定
    hitWall( target ) {
        let isHit = 0;
        let wallLeft = 0;
        let wallRight = this.ctx.canvas.width;
        let wallTop = 0;
        let wallBottom = this.ctx.canvas.height;
        let curBubbleModel = target.getCircleModel();
        if( curBubbleModel.centerX + curBubbleModel.radius >= wallRight ||
            curBubbleModel.centerX - curBubbleModel.radius <= wallLeft
        ) {
                isHit = 1;
        } 
        else if( 
                curBubbleModel.centerY + curBubbleModel.radius >= wallBottom ||
                curBubbleModel.centerY - curBubbleModel.radius <= wallTop
            ) {
                isHit = 2;
            }
        return isHit;
    }

    // 泡泡碰撞
    hitBubble( target ) {
        // 圆形碰撞模型
        let curBubbleModel = target.getCircleModel();
        let bubbles = DataMrg.get( "bubbles" );
        for( let row = 0; row < bubbles.length; row++ ) {
            for( let col = 0; col < bubbles[ row ].length; col++ ) {
                if( !bubbles[ row ][ col ] ) continue;
                let model = bubbles[ row ][ col ].getCircleModel();
                if( Math.pow( ( curBubbleModel.centerX - model.centerX ), 2 ) + Math.pow( ( curBubbleModel.centerY - model.centerY ), 2 ) <= Math.pow( curBubbleModel.radius + model.radius, 2 )  ) {
                    return `( ${ row }, ${ col } )`;
                }
            }
        }

        // 虽然泡泡是圆的，但是贴图是方的，所以泡泡碰撞判定还是使用方形碰撞
        // let curBubbleModel = target.getRectModel();
        // let bubbles = DataMrg.get( "bubbles" );
        // for( let row = 0; row < bubbles.length; row++ ) {
        //     for( let col = 0; col < bubbles[ row ].length; col++ ) {
        //         if( !bubbles[ row ][ col ] ) continue;
        //         let model = bubbles[ row ][ col ].getRectModel();
        //         if( curBubbleModel.x + curBubbleModel.width > model.x &&
        //             curBubbleModel.x < model.width + model.x && 
        //             curBubbleModel.y + curBubbleModel.height > model.y &&
        //             curBubbleModel.y < model.height + model.y
        //             ) {
        //                 return `( ${ row }, ${ col } )`;
        //             }
        //     }
        // }
        return "";
    }

    // 旋转指针
    spinPointer( detaAngle ) {
        if( this.isShooting ) return ;
        this.pointerAngle = Math.max( 
            Math.min( this.pointerAngle + detaAngle, MAX_ANGLE ),
            MIN_ANGLE 
        );
        this.pointerRotateAnimation();
    }
    // 指针旋转
    pointerRotateAnimation() {
        
        let pointer = SpriteMrg.get( "pointer" );
        // this.ctx.clearRect( pointer.x, pointer.y, pointer.width, pointer.height );
        pointer.rotation( this.pointerAngle );
        SpriteMrg.drawSprites();
        this.curBubble.draw( ( window.innerWidth - this.curBubble.width ) / 2, window.innerHeight - this.curBubble.height );
    }

    // 泡泡定位
    fixedBubble( hitedBubbleIndex ) {
        let fixedIndex =  this.getHitedBubbleNearestBubble( SpriteMrg.get( hitedBubbleIndex ) );
        let row = fixedIndex[ 0 ],
            col = fixedIndex[ 1 ],
            value = this.curBubble.value,
            bubbles = DataMrg.get( "bubbles" );      
        if( !table[ row ] ) {
            table[ row ] = [];
            bubbles[ row ] = [];
        }
        table[ row ][ col ] = value;
        let newBubble = new Bubble2( value, row, col );
        bubbles[ row ][ col ] = newBubble;
        SpriteMrg.add( `( ${ row }, ${ col } )`, newBubble );
        SpriteMrg.drawSprites();
        this.loadBubble();
    }

    // 获取最近击中泡泡的位置的泡泡
    getHitedBubbleNearestBubble( hitedBubble ) {
        let curBubbleModel = this.curBubble.getCircleModel();
        // 获取周围的泡泡位置
        let boundings = hitedBubble.boundings;
        // 被击中的泡泡周围的空位
        let emptyIndexs = boundings.filter( bubbleIndex => {
            return !SpriteMrg.has( `( ${ bubbleIndex[ 0 ] }, ${ bubbleIndex[ 1 ] } )` )
        });

        // 最短距离
        let minDistance = 9999999,
            diameter = this.curBubble.width,
            nearestIndex = [];
        if( emptyIndexs.length <= 0 ) {
            console.error( "撞击位置有误， 周围应该有空位" );
        }
        for( let i = 0; i < emptyIndexs.length; ++i ) {
            let model = getCircleModel( emptyIndexs[ i ][ 0 ], emptyIndexs[ i ][ 1 ], diameter );
            let distance = Math.pow( ( curBubbleModel.centerX - model.centerX ), 2 ) + Math.pow( ( curBubbleModel.centerY - model.centerY ), 2  );
            if( distance < minDistance ) {
                minDistance = distance;
                nearestIndex = emptyIndexs[ i ];
            }
        }
        return nearestIndex;
    }
    
    // 上弹bubble 到发射器
    loadBubble() {
        let value = Math.floor( Math.random() * 4 )  + 1 ;
        this.curBubble = SpriteMrg.add( "cur_bubble", new Bubble2( value ) );
        // 定点描绘
        this.curBubble.draw( ( window.innerWidth - this.curBubble.width ) / 2, window.innerHeight - this.curBubble.height );
        this.isShooting = false;  
    }

    // 泡泡消除
    clearBubble( hitedBubbleIndex ){
        // 连击的泡泡
        let combos = [];
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

function getCircleModel( row, col, diameter ) {
    let offsetX = row % 2 ? diameter / 2 : 0,
        y = row * ( diameter - 6 ),
        x = col * diameter + offsetX,
        radius =  diameter / 2,
        centerX = x + radius, 
        centerY = y + radius; 
    return {
        radius, centerX, centerY
    }
}