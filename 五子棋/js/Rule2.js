// 落子类型
var FALL_TYPE = {
    // tuple is empty
    Blank = 0,
    // tuple contains a black chess
    B = 1,
    // tuple contains two black chesses
    BB = 2,
    // tuple contains tree black chesses
    BBB = 3,
    // tuple contains for black chesses
    BBBB = 4,
    // tuple contains a white chesses
    W = 5,
    // tuple contains two white chesses
    WW = 6,
    // tuple contains a three chesses
    WWW = 7,
    // tuple contains a four chesses
    WWWW = 8,
    // tuple does not exist
    Virtual = 9,
    // tuple contains at least one balck and at least one white
    Polluted = 10
}
// 元组数组
var tuples = [];
var tuple_count = 0;
function Tuple( tuple ) {
    this.row = row;
    this.col = col;
    // 索引
    this.index = tuple_count;
    tuple_count++;
    // 白棋 
    this.white = 0;
    // 黑棋
    this.black = 0;
    // 元组
    this.tuple = []; 
    // 类型
    this.type = FALL_TYPE.Blank;
    this.source = 
    this.value = function() {
        return this.tuple;
    }
    this.addWhite = function( row, col ) {
        if( this.type != FALL_TYPE.Polluted ) {

        }
    }
    this.addBlack = function( row, col ) {

    }
}

// 统计水平方向的元组
for( var i = 0; i < GRID_ROWS; i++ ) {
    for( var j = 0; j <= GRID_COLS - GRID_COMBO; j++ ) {
        var tuple = [];
        for( var k = 0; k < GRID_COMBO; k++ ) {
            tuple.push( [ i, j + k ] ); 
        }
        tuples.push( new Tuple( tuple ) ); 
    }
}
// 统计竖直方向上的
for( var i = 0; i <= GRID_ROWS - GRID_COMBO; i++ ) {
    for( var j = 0; j < GRID_COLS; j++ ) {
        var tuple = [];
        for( var k = 0; k < GRID_COMBO; k++ ) {
            tuple.push( [ i + k, j ] ); 
        }
        tuples.push( new Tuple( tuple ) ); 
    }
}

// 统计正斜方向上的
for( var i = 0; i <= GRID_ROWS - GRID_COMBO; i++ ) {
    for( var j = 0; j <= GRID_COLS - GRID_COMBO; j++ ) {
        var tuple = [];
        for( var k = 0; k < GRID_COMBO; k++ ) {
            tuple.push( [ i + k, j + k ] );
        }
        tuples.push( new Tuple( tuple ) ); 
    }
}

// 统计反斜方向上的
for( var i = 0; i <= GRID_ROWS - GRID_COMBO; i++ ) {
    for( var j = GRID_COLS - 1; j >= GRID_COMBO - 1; j-- ) {
        var tuple = [];
        for( var k = 0; k < GRID_COMBO; k++ ) {
            tuple.push( [ i + k, j - k ] );
        }
        tuples.push( new Tuple( tuple ) ); 
    }
}
console.log( tuples );