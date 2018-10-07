/**
 * 管理精灵的类
 */
export class SpriteMrg {

    constructor() {
        this.map = new Map();
        this.adapter();
    }

    // 获取该管理器的单例
    static getInstance() {
        if( !this.instance ) {
            this.instance = new SpriteMrg();
        }
        return this.instance;
    }

    // 添加精灵
    static add( name, sprite ) {
        if( !this.instance ) {
            console.error( "还没有初始化该管理器" );
            return ;
        }
        sprite.ctx = this.instance.ctx;
        sprite.width = sprite.width * this.instance.scale;
        sprite.height = sprite.height * this.instance.scale;
        this.instance.map.set( name, sprite );
        return sprite;
    }

    // 移除精灵
    static remove( name ) {
        if( !this.instance ) {
            console.error( "还没有初始化该管理器" );
            return ;
        }
        if( this.instance.map.has( name ) ) {
            this.instance.map.delete( name );
        }
    }

    static get( name ) {
        if( !this.instance ) {
            console.error( "还没有初始化该管理器" );
            return ;
        }
        return this.instance.map.get( name );
    }

    static clear() {
        if( !this.instance ) {
            console.error( "还没有初始化该管理器" );
            return ;
        }
        this.instance.map.clear();
    }

    static drawSprites() {
        this.instance.ctx.clearRect( 0, 0, this.instance.ctx.canvas.width, this.instance.ctx.canvas.height );
        for( let [ key, value ] of this.instance.map ) {
            if( key !== "cur_bubble" ) {
                value.draw();
            }
        }
    }

    // 适配屏幕
    adapter() {
        let maxWidth = Math.min( window.innerWidth, ORI_WINDOW.width );
        // 缩放比
        this.scale = maxWidth /  ORI_WINDOW.width ;
    }
}

const ORI_WINDOW = {
    width: 440,
    height: 782
}