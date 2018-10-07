/**
 * 管理数据的类
 */

 export class DataMrg {

    constructor() {
        this.map = new Map( );
    }

     // 获取该管理器的单例
     static getInstance() {
        if( !this.instance ) {
            this.instance = new DataMrg();
        }
        return this.instance;
    }

    static add( key, value ) {
        if( !this.instance ) {
            console.error( "没有初始化数据管理器" );
            return ;
        }
        this.instance.map.set( key, value );
        return value;
    }
    static get( key ) {
        if( !this.instance ) {
            console.error( "没有初始化数据管理器" );
            return ;
        }
        return this.instance.map.get( key );
    }

    static clear( ) {
        this.instance.clear();
    }

    static getColor( value ) {
        if( this.bubbleColor.has( value ) ) { 
            return this.bubbleColor.get( value );
        }
        console.error( "没有该值得颜色，请传入正确的颜色值" );
        return "#282828";
    }

}

const bubbleColor = [
    [ 0, "#FFFFFF" ],
    [ 1, "#6495ED" ],
    [ 2, "#00FF7F" ],
    [ 3, "#FF83FA" ],
    [ 4, "#EE3B3B" ]
]
