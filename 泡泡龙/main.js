import { DataMrg } from "./js/base/DataMrg.js";
import { SpriteMrg } from "./js/base/SpriteMrg.js";
import { RES } from "./js/base/ResMrg.js";
import { res, table } from "./js/base/Config.js";
import { Bubble2 } from "./js/ui/Bubble2.js";
import { Pointer } from "./js/ui/Pointer.js";
import { DeadLine } from "./js/ui/DeadLine.js";
import { Director } from "./js/Director.js";


export class Main {
    
    constructor() {
        console.log( "这里是游戏入口" );
        this.init();
    }

    init() {
        // 实例化数据管理器
        this.dataMrg = DataMrg.getInstance();
        // 获取画布上下文
        this.canvas = document.querySelector( "#canvas" );
        this.ctx = this.canvas.getContext( "2d" );
        // 实例化精灵管理器
        this.spriteMrg = SpriteMrg.getInstance();
        this.spriteMrg.canvas = this.canvas;
        this.spriteMrg.ctx = this.ctx;
        // 适配canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        RES.createResMrg( res ).onResourceCompelte( ( resEvent ) => {
            this.creatScene();
        });
        
    }
    // 创建场景
    creatScene() {
        // 所有泡泡数据
        let bubbles = DataMrg.add( "bubbles", [] );
        // 创建泡泡
        for( let row = 0; row < table.length; row++ ) {
            bubbles[ row ] = [];
            for( let col = 0; col < table[ row ].length; col++ ){
                if( !table[ row ][ col ] ) continue;
                let bubble = SpriteMrg.add( `( ${ row }, ${ col } )`, new Bubble2( table[ row ][ col ], row, col ) );
                bubble.draw();
                bubbles[ row ][ col ] = bubble;
            }
        }
        console.log( bubbles );
        // 创建指针
        SpriteMrg.add( "pointer",  new Pointer() ).rotation( 0 ).draw();
        // 创建分割线
        SpriteMrg.add( "deadLine", new DeadLine() ).draw( 0, SpriteMrg.get( "pointer" ).y );
        // 创建待发泡泡
        let curBubble = SpriteMrg.add( "cur_bubble", new Bubble2( 2 ) );
        curBubble.draw( ( window.innerWidth - curBubble.width ) / 2, window.innerHeight - curBubble.height );
        // 实例化导演类
        this.director = new Director();
        this.director.ctx = this.ctx;
        //  添加事件监听
        window.onkeydown = ( e ) => {
            e.preventDefault();
            switch( e.keyCode ) {
                // 空格键
                case 32: 
                    this.director.shootBubble();
                    break;
                // 左键
                case 37:
                    this.director.spinPointer( -2 );
                    break;
                // 右键
                case 39:
                    this.director.spinPointer( 2 );
                    break;
                default:
                    break;

            }
        }
    }
}

// 实例化main
new Main();
