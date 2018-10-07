import { RES } from "./js/base/ResourceLoader.js";
import { Director } from './js/Director.js';
import { BackGround } from "./js/runtime/Background.js";
import { DataStore } from "./js/base/DataStore.js";
import { Land } from "./js/runtime/Land.js";
import { Birds } from "./js/player/Birds.js";
import { StarButton } from './js/player/StarButton.js';
import { Score } from "./js/player/Score.js";
/**
 * 入口类：游戏项目的入口文件
 */
export class Main {
    

    constructor() {
        console.log( "游戏项目开始创建" );
        this.canvas = document.querySelector( "#canvas" );
        this.ctx = canvas.getContext( "2d" );
        this.dataStore = DataStore.getInstance();
        const loader = RES.createResourceLoader();
        loader.onLoaded( map => this.onResourceFirstLoaded( map ) );
        this.registerEvent();
    }

    onResourceFirstLoaded( map ) {
        this.dataStore.ctx = this.ctx;
        this.dataStore.canvas = this.canvas;
        this.dataStore.res = map;
        this.init();
    }

    init() {
        this.dataStore
            .put( "pies", [] )
            .put( "background", BackGround )
            .put( "land", Land)
            .put( "birds", Birds )
            .put( "StarButton", StarButton )
            .put( "score", Score );
        this.director = Director.getInstance();
        this.director.isGameOver = false;
        this.director.createPies();
        this.director.run();
    }

    registerEvent() {
        this.canvas.addEventListener( "touchstart", e => {
            e.preventDefault();
            if( this.director.isGameOver ) {
                console.log( "游戏重新开始！" );
                this.init();
            } else {
                this.director.onTouchEvnet();
            }
        });
    }


}