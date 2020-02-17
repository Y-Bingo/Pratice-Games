/**
 * 游戏配置 以及初始化环境
 */


/**canvas */
const CVS = document.querySelector( "#canvas" );
/** 游戏宽度 */
const STAGE_WIDTH = CVS.width;
/*  游戏宽度*/
const STAGE_HEIGHT = CVS.height;

/** 屏幕宽度 */
let SCREEN_WIDTH = STAGE_WIDTH;

/** 屏幕高度 */
let SCREEN_HEIGHT = STAGE_HEIGHT;

// 适配方案
let designWidth = CVS.width; // 设计宽度为640

let designHeight = CVS.height; // 设计高度为1136

let viewWidth = document.documentElement.clientWidth; // 获取浏览器可视区域宽度

let viewHeight = document.documentElement.clientHeight; // 获取浏览器可视区域高度

// let mmScale = designWidth / designHeight;       // 设计宽高比
// let scale = viewWidth / designWidth;            // 缩放因子
// CVS.width = designWidth;
// CVS.height = designHeight;

setSize( CVS, designWidth, designHeight, viewWidth, viewHeight );
window.onresize = onResize;

function onResize( self, ev ) {
    let vw = document.documentElement.clientWidth;
    let vh = document.documentElement.clientHeight;
    setSize( CVS, designWidth, designHeight, vw, vh );
}

/**
 * 设置size
 * @param cav   canvas 对象
 * @param dw    设计宽度   
 * @param dh    设计高度
 * @param sw    屏幕宽度
 * @param sh    屏幕高度
 */
function setSize( cav, dw, dh, sw, sh ) {
    let ds = dw / dh;
    let vs = sw / sh;

    let nw = 0, nh = 0;
    if ( vs > ds ) {
        nw = Math.ceil( sh * ds );
        nh = sh;
    } else if ( vs <= ds ) {
        nw = sw;
        nh = Math.ceil( sw / ds );
    }

    cav.style.width = nw + "px";
    cav.style.height = nh + "px";

    SCREEN_WIDTH = nw;
    SCREEN_HEIGHT = nh;

    console.log( "执行一次" );
}