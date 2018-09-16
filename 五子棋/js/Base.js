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

var canvas = document.querySelector( "#chess" );
var context = canvas.getContext( "2d" );

var chessData = [];
for( var i = 0; i < GRID_ROWS; i++ ) {
    chessData[ i ] = [];
    for( var j = 0; j < GRID_COLS; j++ ) {
        chessData[ i ][ j ] = 0;
    }
}


