var 
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
    Polluted = 10;

var tupleSourceTable = [];
tupleSourceTable[ 0 ] = 7;
tupleSourceTable[ 1 ] = 35;
tupleSourceTable[ 2 ] = 800;
tupleSourceTable[ 3 ] = 15000;
tupleSourceTable[ 4 ] = 800000;
tupleSourceTable[ 5 ] = 15;
tupleSourceTable[ 6 ] = 400;
tupleSourceTable[ 7 ] = 1800;
tupleSourceTable[ 8 ] = 100000;
tupleSourceTable[ 9 ] = 0;
tupleSourceTable[ 10 ] = 0;

var user_source = [],
    computer_source = [];
for( var i = 0; i < GRID_ROWS; i++ ) {
    user_source = [];
    computer_source = [];
    for( var j = 0; j < GRID_COLS; j++ ) {
        user_source[ i ][ j ] = 0;
        computer_source[ i ][ j ] = 0;
    }
}


function ComputerAction() {
    if( over ) return;
    drawPiece( row, col, true );
    chessData[ row ][ col ] = 1;
    var blackType = 0;
    var whiteType = 0;
    var source = 0;
    for( var i = 0; i < tuple_count; i++ ) {
        blackType = my_win[ i ];
        whiteType = computerin[ i ];
        source = tupleSourceTable[ blackType ] + tupleSourceTable[ whiteType + 5];
    }
    for( var row = 0; row < GRID_ROWS; row++ ) {
        for( var col = 0; col < GRID_COLS; col++ ) {
            if( chessData[ row ][ col ] === 0 ) {
               
            } else {

            }
           
        }
    }
}