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
    BBBBB = 5,
    // tuple contains a white chesses
    W = 5,
    // tuple contains two white chesses
    WW = 6,
    // tuple contains a three chesses
    WWW = 7,
    // tuple contains a four chesses
    WWWW = 8,
    WWWWW = 9,
    // tuple does not exist
    Virtual = 9,
    // tuple contains at least one balck and at least one white
    Polluted = 10;

var user_source = [],
    computer_source = [];
for( var i = 0; i < GRID_ROWS; i++ ) {
    user_source[ i ] = [];
    computer_source[ i ] = [];
    for( var j = 0; j < GRID_COLS; j++ ) {
        user_source[ i ][ j ] = 0;
        computer_source[ i ][ j ] = 0;
    }
}


function ComputerAction() {
    if( over ) return;
    // drawPiece( row, col, true );
    // chessData[ row ][ col ] = 1;
    var blackType = 0;
    var whiteType = 0;
    var source = 0;

    // 计算每个点的评分 ，只有没有下的点才能评分
    for( var row = 0; row < GRID_ROWS; row++ ) {
        for( var col = 0; col < GRID_COLS; col++ ) {
            if( chessData[ row ][ col ] === 0 ) {
                for ( var count = 0; count < tuple_count; count++ )
                {
                    if( !tuple[ row ][ col ][ count ] ) continue;
                    blackType += my_win[ count ];
                    whiteType += computer_win[ count ];
                    source = tupleSourceTable[ blackType ] + tupleSourceTable[ whiteType ];
                    if ( blackType == 1 )
                    {
                        console.log( "row col source", row, col, source );
                    }
                    user_source[ row ][ col ] = source;
                    computer_source[ row ][ col ] = source;
                }
            }
        }
    }
    console.log( "user_source", user_source );
}
