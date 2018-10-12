import { SpriteMrg } from "./base/SpriteMrg.js";
import { MAX_COL, MAX_ANGLE, MIN_ANGLE, BUBBLE_FLY_SPEED, table } from "./base/Config.js";
import { DataMrg } from "./base/DataMrg.js";
import { Bubble } from "./ui/Bubble.js";

/**
 * 导演类
 */
export class Director {

    constructor () {
        // 指针的当前角度
        this.pointerAngle = 0;
        this.curBubble = SpriteMrg.get( "cur_bubble" );
        this.isShooting = false;
        this.timer = null;
        this.bubbles = DataMrg.get( "bubbles" );
    }
    // 泡泡发射
    shootBubble () {
        if ( this.isShooting ) return;
        this.isShooting = true;
        this.curBubble.speedX = Math.floor( BUBBLE_FLY_SPEED * Math.sin( this.pointerAngle * Math.PI / 180 ) );
        this.curBubble.speedY = -Math.floor( BUBBLE_FLY_SPEED * Math.cos( this.pointerAngle * Math.PI / 180 ) );
        this.bubbleFlyAnimation();
    }

    // 泡泡飞行动画
    bubbleFlyAnimation () {
        SpriteMrg.drawSprites();
        this.timer = window.requestAnimationFrame( () => { this.bubbleFlyAnimation() } );
        this.curBubble.draw( this.curBubble.x + this.curBubble.speedX, this.curBubble.y + this.curBubble.speedY );
        switch ( this.hitWall( this.curBubble ) )
        {
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
        if ( hitedBubbleIndex )
        {
            cancelAnimationFrame( this.timer );
            this.fixedBubble( hitedBubbleIndex );
        }
    }

    // 碰墙判定
    hitWall ( target ) {
        let isHit = 0;
        let wallLeft = 0;
        let wallRight = this.ctx.canvas.width;
        let wallTop = 0;
        let wallBottom = this.ctx.canvas.height;
        let curBubbleModel = target.getCircleModel();
        if ( curBubbleModel.centerX + curBubbleModel.radius >= wallRight ||
            curBubbleModel.centerX - curBubbleModel.radius <= wallLeft
        )
        {
            isHit = 1;
        }
        else if (
            curBubbleModel.centerY + curBubbleModel.radius >= wallBottom ||
            curBubbleModel.centerY - curBubbleModel.radius <= wallTop
        )
        {
            isHit = 2;
        }
        return isHit;
    }

    // 泡泡碰撞
    hitBubble ( target ) {
        // 圆形碰撞模型
        let curBubbleModel = target.getCircleModel();
        let bubbles = DataMrg.get( "bubbles" );
        for ( let row = 0; row < bubbles.length; row++ )
        {
            for ( let col = 0; col < bubbles[ row ].length; col++ )
            {
                if ( !bubbles[ row ][ col ] ) continue;
                let model = bubbles[ row ][ col ].getCircleModel();
                if ( Math.pow( ( curBubbleModel.centerX - model.centerX ), 2 ) + Math.pow( ( curBubbleModel.centerY - model.centerY ), 2 ) <= Math.pow( curBubbleModel.radius + model.radius, 2 ) )
                {
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
    spinPointer ( detaAngle ) {
        if ( this.isShooting ) return;
        this.pointerAngle = Math.max(
            Math.min( this.pointerAngle + detaAngle, MAX_ANGLE ),
            MIN_ANGLE
        );
        this.pointerRotateAnimation();
    }

    // 指针旋转
    pointerRotateAnimation () {

        let pointer = SpriteMrg.get( "pointer" );
        // this.ctx.clearRect( pointer.x, pointer.y, pointer.width, pointer.height );
        pointer.rotation( this.pointerAngle );
        SpriteMrg.drawSprites();
        this.curBubble.draw( ( window.innerWidth - this.curBubble.width ) / 2, window.innerHeight - this.curBubble.height );
    }

    /**
     * 泡泡定位
     * @param { "( row, col )" } hitedBubbleIndex
     */
    fixedBubble ( hitedBubbleIndex ) {
        let fixedIndex = this.getHitedBubbleNearestBubble( SpriteMrg.get( hitedBubbleIndex ) );
        let row = fixedIndex[ 0 ],
            col = fixedIndex[ 1 ],
            value = this.curBubble.value,
            bubbles = DataMrg.get( "bubbles" ),
            newBubble = new Bubble( value, row, col );
        if ( !table[ row ] )
        {
            table[ row ] = new Array( row % 2 ? MAX_COL - 1 : MAX_COL ).fill( 0 );
            bubbles[ row ] = new Array( row % 2 ? MAX_COL - 1 : MAX_COL ).fill( null );
        }
        table[ row ][ col ] = value;
        bubbles[ row ][ col ] = newBubble;
        SpriteMrg.add( `( ${ row }, ${ col } )`, newBubble );
        SpriteMrg.drawSprites();
        // 消除动画
        this.clearBubbleAnimation( newBubble );
        // 上弹
        this.loadBubble();

    }

    /**
     * 获取最近击中泡泡的位置的泡泡
     * @param { Bubble } hitedBubble
     * @return { [ row, col ] } nearestIndex
     */
    getHitedBubbleNearestBubble ( hitedBubble ) {
        let curBubbleModel = this.curBubble.getCircleModel();
        // 获取周围的泡泡位置
        let boundings = hitedBubble.boundings;
        // 被击中的泡泡周围的空位
        let emptyIndexs = boundings.filter( bubbleIndex => {
            return !SpriteMrg.has( `( ${ bubbleIndex[ 0 ] }, ${ bubbleIndex[ 1 ] } )` )
        } );

        // 最短距离
        let minDistance = 9999999,
            diameter = this.curBubble.width,
            nearestIndex = [];
        if ( emptyIndexs.length <= 0 )
        {
            console.error( "撞击位置有误， 周围应该有空位" );
        }
        for ( let i = 0; i < emptyIndexs.length; ++i )
        {
            let model = getCircleModel( emptyIndexs[ i ][ 0 ], emptyIndexs[ i ][ 1 ], diameter );
            let distance = Math.pow( ( curBubbleModel.centerX - model.centerX ), 2 ) + Math.pow( ( curBubbleModel.centerY - model.centerY ), 2 );
            if ( distance < minDistance )
            {
                minDistance = distance;
                nearestIndex = emptyIndexs[ i ];
            }
        }
        return nearestIndex;
    }

    // 上弹bubble 到发射器
    loadBubble () {
        let value = Math.floor( Math.random() * 4 ) + 1;
        this.curBubble = SpriteMrg.reset( "cur_bubble", new Bubble( value ) );
        // 定点描绘
        this.curBubble.draw( ( window.innerWidth - this.curBubble.width ) / 2, window.innerHeight - this.curBubble.height );
        this.isShooting = false;
    }

    /**
     * 获取连击
     * @param { Bubble } fixedBubble 被定位的泡泡
     * @return { Bubble[] } bubles combo的泡泡数
     */
    getCombos ( fixedBubble ) {
        let root = fixedBubble,
            mapModel = getMapModel( table ),
            combos = [],
            stacks = [];
        mapModel[ root.row ][ root.col ] = 1;
        combos.push( root );
        stacks.push( root );
        while ( stacks.length )
        {
            let target = stacks.pop();
            let boundings = target.boundings.filter( bubbleIndex => {
                return SpriteMrg.has( `( ${ bubbleIndex[ 0 ] }, ${ bubbleIndex[ 1 ] } )` )
            } );
            for ( let i = 0; i < boundings.length; ++i )
            {
                let bubbleIndex = boundings[ i ];
                if ( mapModel[ bubbleIndex[ 0 ] ][ bubbleIndex[ 1 ] ] ) continue;
                let nextBubble = SpriteMrg.get( `( ${ bubbleIndex[ 0 ] }, ${ bubbleIndex[ 1 ] } )` );
                if ( nextBubble.value === root.value )
                {
                    mapModel[ nextBubble.row ][ nextBubble.col ] = 1;
                    combos.push( nextBubble );
                    stacks.push( nextBubble );
                }
            }
        }

        return combos;
    }

    // 泡泡消除
    clearBubbleAnimation ( fixedBubble ) {
        // 连击的泡泡
        let combos = this.getCombos( fixedBubble ),
            bubbles = DataMrg.get( "bubbles" );
        if ( combos.length <= 2 ) return;
        combos.forEach( bubble => {
            bubbles[ bubble.row ][ bubble.col ] = null;
            table[ bubble.row ][ bubble.col ] = 0;
            SpriteMrg.remove( `( ${ bubble.row }, ${ bubble.col } )` );
        } );

        this.getNoHangs().forEach( bubble => {
            bubbles[ bubble.row ][ bubble.col ] = null;
            table[ bubble.row ][ bubble.col ] = 0;
            SpriteMrg.remove( `( ${ bubble.row }, ${ bubble.col } )` );
        });
        SpriteMrg.drawSprites();
    }

    // 获取哪些泡泡没有支撑点
    getNoHangs () {
        let noHands = [], // 没有悬挂的球
            hands = this.getHangs();
        for( let row = 0; row < hands.length; ++row ) {
            for( let col = 0; col < hands[ row ].length; ++col ) {
                if ( table[ row ][ col ] > 0 && hands[ row ][ col ] === 0 )
                {
                    noHands.push( SpriteMrg.get( `( ${ row }, ${ col } )` ) );
                }
            }
        }
        console.log( "noHands", noHands );
        return noHands;
    }
    // 生成悬挂映射
    getHangs () {
        let bubbles = this.bubbles,
            mapModel = getMapModel( table ),
            col = 0,
            root = null,
            stacks = [];
        while ( col < MAX_COL )
        {
            stacks = [];
            if ( !bubbles[ 0 ][ col ] )
            {
                col++;
                continue;
            }
            root = bubbles[ 0 ][ col ];
            stacks.push( root );
            mapModel[ root.row ][ root.col ] = 1;
            while ( stacks.length )
            {
                let target = stacks.pop(),
                    boundings = target.boundings.filter( bubbleIndex => {
                        return SpriteMrg.has( `( ${ bubbleIndex[ 0 ] }, ${ bubbleIndex[ 1 ] } )` )
                    } );
                for ( let i = 0; i < boundings.length; ++i )
                {
                    let bubbleIndex = boundings[ i ];
                    if ( mapModel[ bubbleIndex[ 0 ] ][ bubbleIndex[ 1 ] ] ) continue;
                    mapModel[ bubbleIndex[ 0 ] ][ bubbleIndex[ 1 ] ] = 1;
                    let nextBubble = SpriteMrg.get( `( ${ bubbleIndex[ 0 ] }, ${ bubbleIndex[ 1 ] } )` );
                    stacks.push( nextBubble );
                }
            }
            col++;
        };
        console.log( "hand", mapModel );
        return mapModel;
    }

    // 检查是否越过临界线
    checkCrossLine () {
        return false;
    }

}

// 获取泡泡模型
function getCircleModel ( row, col, diameter ) {

    let offsetX = row % 2 ? diameter / 2 : 0,
        y = row * ( diameter - 6 ),
        x = col * diameter + offsetX,
        radius = diameter / 2,
        centerX = x + radius,
        centerY = y + radius;
    return {
        radius, centerX, centerY
    }
}

// 获取地图模型
function getMapModel ( table ) {
    let newTable = [];
    for ( let i = 0; i < table.length; ++i )
    {
        newTable[ i ] = [];
        for ( let j = 0; j < table[ i ].length; ++j )
        {
            newTable[ i ][ j ] = 0;
        }
    }
    return newTable;
}
