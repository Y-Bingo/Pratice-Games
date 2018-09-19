function windowToCanvas( x, y ) {
    var boardBox = canvas.getBoundingClientRect();
    return {
        x: Math.ceil( x - boardBox.left * ( canvas.width / boardBox.width  ) ) ,
        y: Math.ceil( y - boardBox.top * ( canvas.height / boardBox.height ) )
    }
}

// UI..........................
function drawBorad() {
    context.save();
    context.strokeStyle = "#bfbfbf";
    context.beginPath();
    for( var i = 0; i < GRID_ROWS; i++ ) {
        context.moveTo( i * GRID_WIDTH + BOARD_PADDING_LEFT + 0.5, BOARD_PADDING_TOP );
        context.lineTo( i * GRID_WIDTH + BOARD_PADDING_LEFT + 0.5, BOARD_HEIGHT - BOARD_PADDING_TOP );
        context.stroke();
    }
    for( var i = 0; i < GRID_ROWS; i++ ) {
        context.moveTo( BOARD_PADDING_LEFT, i * GRID_HEIGHT + BOARD_PADDING_TOP + 0.5 );
        context.lineTo( BOARD_WIDTH - BOARD_PADDING_LEFT, i * GRID_HEIGHT + BOARD_PADDING_TOP + 0.5 );
        context.stroke();
    }
    context.closePath();
    context.restore();
}
/**
 *
 * @param { number } row 行索引
 * @param { number } col 列索引
 * @param { boolean } side 角色，false: 黑棋，true: 白棋
 */
function drawPiece( row, col, side ) {
    context.save(); 
    side = side || false;
    var row_px = row * GRID_WIDTH + BOARD_PADDING_LEFT,
        col_px = col * GRID_HEIGHT + BOARD_PADDING_TOP;
    var gradient = context.createRadialGradient( row_px + PIECE_GRADIENT_OFFSET_X, col_px + PIECE_GRADIENT_OFFSET_Y, PIECE_RADIUS,
                                                 row_px + PIECE_GRADIENT_OFFSET_X, col_px + PIECE_GRADIENT_OFFSET_Y, PIECE_GRADIENT_RADIUS );
    if( side ) {
        gradient.addColorStop( 0, "#d1d1d1" );
        gradient.addColorStop( 1, "#f9f9f9" );
    } else {
        gradient.addColorStop( 0, "#0a0a0a" );
        gradient.addColorStop( 1, "#636766" );
    }
    context.fillStyle = gradient;
    context.beginPath();
    context.arc( row_px, col_px, PIECE_RADIUS, 0, 2 * Math.PI, false );
    context.fill();
    context.closePath();
    context.restore();
}

// Init.....................................
drawBorad();
