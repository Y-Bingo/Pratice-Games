var BOARD_WIDTH = 450,
    BOARD_HEIGHT = 450,
    BOARD_PADDING_TOP = 15,
    BOARD_PADDING_LEFT = 15,
    GRID_ROWS = 15, // 行数
    GRID_COLS = 15, // 列数
    GRID_COMBO = 5, // 连击数
    GRID_WIDTH = 30,
    GRID_HEIGHT = 30,
    PIECE_RADIUS = 13,
    PIECE_GRADIENT_RADIUS = 3,
    PIECE_GRADIENT_OFFSET_X = 2,
    PIECE_GRADIENT_OFFSET_Y = 2;

// 棋子的种类
var chess_type = {
    // 空
    blank: 0,
    // 白棋
    white: 1,
    // 黑棋
    black: 2
} 

var source_map = {
    // tuple is empty
    Blank: 0,
    // tuple contains a black chess
    B: 1,
    // tuple contains two black chesses
    BB: 2,
    // tuple contains tree black chesses
    BBB: 3,
    // tuple contains for black chesses
    BBBB: 4,
    // tuple contains a white chesses
    W: 5,
    // tuple contains two white chesses
    WW: 6,
    // tuple contains a three chesses
    WWW: 7,
    // tuple contains a four chesses
    WWWW: 8,
    // tuple does not exist
    Virtual: 9,
    // tuple contains at least one balck and at least one white
    Polluted: 10
};

var chess_data = [];
for( var i = 0; i < GRID_ROWS; i++ ) {
    chess_data[ i ] = [];
    for( var j = 0; j < GRID_COLS; j++ ) {
        chess_data[ i ][ j ] = chess_type.blank;
    }
}
var rule = new Rule();
rule.getWinPath( chess_data, GRID_COMBO );
var wins = rule.wins;
var tuple = rule.tuples;

console.log( "wins", wins )
console.log( "tuple", tuple );

var canvas = document.querySelector( "#chess" );
var context = canvas.getContext( "2d" );




