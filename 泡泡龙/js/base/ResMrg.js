/**
 * 资源管理器
 */
export class RES {

    constructor ( resData ) {
        // 资源管理数据结构
        this.resLen = resData.length;
        this.hasLoaded = 0;
        this.res = new Map( resData );
        for ( let [ key, value ] of this.res )
        {
            let img = new Image();
            img.src = value;
            this.res.set( key, img );
        }
    }

    /**
     * 获取资源管理器单例
     */
    static createResMrg ( resData ) {
        if ( !this.instance )
        {
            this.instance = new RES( resData );
        }
        return this.instance;
    }

    /**
     * 监听资源加载完完成后，回调
     * @param {function} callback
     */
    onResourceCompelte ( callback ) {
        for ( let value of this.res.values() )
        {
            value.onload = () => {
                this.hasLoaded++;
                if ( this.hasLoaded >= this.resLen )
                {
                    callback( { total: this.resLen, hasLoaded: this.hasLoaded } );
                    return;
                }
            }
        }
    }

    static getRes ( key ) {
        if ( !this.instance )
        {
            throw Error( "资源管理器还没有实例化" );
        }
        if ( this.instance.res.has( key ) )
        {
            return this.instance.res.get( key );
        }
        console.error( "访问的资源不存在/传入错误的资源键" );
        return null;
    }
}
