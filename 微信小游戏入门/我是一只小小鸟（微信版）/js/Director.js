import { DataStore } from "./base/DataStore.js";
import { UpPie } from "./runtime/UpPie.js";
import { DownPie } from "./runtime/DownPie.js";

/**
 * 导演类： 控制整个游戏的进程
 */
export class Director {
    
    static getInstance() {
        if( !Director.instance ) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        this.dataStore = DataStore.getInstance();
        this.maxTop = DataStore.getInstance().canvas.height / 2;
        this.minTop = DataStore.getInstance().canvas.height / 8;
    }

    createPies() {
        let pies = this.dataStore.get( "pies" );
        let top = this.minTop +  Math.random() * ( this.maxTop - this.minTop );
        if( pies.length === 4 && pies[ 0 ].x + pies[ 0 ].width < 0 ) {
            pies.shift();
            pies.shift();
            this.dataStore.get( "score" ).isScore = true;
        } else if( pies.length === 0 || ( pies[ 0 ].x + pies[ 0 ].width <= DataStore.getInstance().canvas.width / 2 && pies.length === 2 ) ) {
            pies.push( new UpPie( top ) );
            pies.push( new DownPie( top ) );
        }
    }

    createScene() {
        DataStore.getInstance().ctx.clearRect(
            0, 0,
            DataStore.getInstance().canvas.width,
            DataStore.getInstance().canvas.height
        );
        this.dataStore.get( "background" ).draw();
        this.createPies();
        this.dataStore.get( "pies" ).forEach( pie => {
            pie.draw();
        });
        this.dataStore.get( "birds" ).draw();
        this.dataStore.get( "land" ).draw();
        this.dataStore.get( "score" ).draw();
    }

    createBackgroundMusic(){
        const innerAudioContext = wx.createInnerAudioContext();
        innerAudioContext.autoplay = true;
        innerAudioContext.loop = true;
        innerAudioContext.src = "audios/bgm.mp3";
        innerAudioContext.onPlay(() => {
            console.log('开始播放')
        })
        innerAudioContext.onError((res) => {
            console.log(res.errMsg)
            console.log(res.errCode)
        })
    }

    run() {

        this.check();
        if( !this.isGameOver ) {
            let timer = requestAnimationFrame( () => { 
                this.run();
            } );
            this.dataStore.put( "timer", timer );
            this.createScene();
        } else {
            console.log( "游戏结束" );
            cancelAnimationFrame( this.dataStore.get( "timer" ) );
            this.createScene();
            this.dataStore.get( "StarButton" ).draw();
            this.dataStore.destory();
            // 微信API之垃圾回收
            wx.triggerGC();
        }
    }
    // 点击屏幕，操作小鸟
    onTouchEvnet( e ) {
        let birds = this.dataStore.get( "birds" );
        for( let i = 0; i < birds.birdsY.length; i++ ) {
           birds.y[ i ] = birds.birdsY[ i ];
        }
        birds.time = 0;
    }

    // 判断小鸟是否撞击地板和管道
    check() {
        let birds = this.dataStore.get( "birds" );
        let land = this.dataStore.get( "land" );
        let pies = this.dataStore.get( "pies" );
        let score = this.dataStore.get( "score" );
        // 地板撞击判断
        if( birds.birdsY[ 0 ] + birds.birdsHeight[ 0 ] >= land.y ) {
            console.log( "撞击的地板" );
            this.isGameOver = true;
            return;
        } 

        // 小鸟模型
        const birdsBorder = {
            x: birds.birdsX[ 0 ],
            y: birds.birdsY[ 0 ],
            width: birds.birdsWdith[ 0 ],
            height: birds.birdsHeight[ 0 ],
            top: birds.birdsY[ 0 ],
            bottom: birds.birdsY[ 0 ] + birds.birdsHeight[ 0 ],
            left: birds.birdsX[ 0 ],
            right: birds.birdsX[ 0 ] + birds.birdsWdith[ 0 ]
        };

        const len = pies.length;
        for( let i = 0; i < len; ++i ) {
            const pie = pies[ i ];
            const pieBorder = {
                top: pie.y,
                bottom: pie.y + pie.height,
                left: pie.x,
                right: pie.x + pie.width,
                x: pie.x,
                y: pie.y,
                width: pie.width,
                height: pie.height
            };

            if( this.isStrike( birdsBorder, pieBorder ) ) {
                console.log( "撞击的管道" );
                this.isGameOver = true;
                return;
            }
        }
        // 加分判断
        if( birds.x > pies[ 0 ].x + pies[ 0 ].width - 20 ) {
            score.addScore();

        }
    }

    
    isStrike( objA, objB ) {
        let flag = false;
        if( 
            // objA.x < objB.x + objB.width &&
            // objA.x + objA.width > objB.x &&
            // objA.y < objB.y + objB.height && 
            // objA.y + objA.height > objB.y
                objA.top < objB.bottom &&
                objA.bottom > objB.top &&
                objA.right > objB.left &&
                objA.left < objB.right
            ) {
                flag = true
            }
        return flag;
    }

}