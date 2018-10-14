/**
 * 管理资源，管理游戏中的精灵对象
 */
export class DataStore {
    
    static getInstance() {
        if( !DataStore.instance ) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    constructor() {
        this.map = new Map();
        this.res = null;
    }

    put( key, value ) {
        if( typeof value === "function" ) {
            value = new value();
        }

        this.map.set( key, value );
        return this;
    }

    get( key ) {
        return this.map.get( key );
    }

    getRes( key ) {
        return this.res.get( key );
    }

    destory() {
        for( let value of this.map.values() ) {
            value = null;
        }
    }
}