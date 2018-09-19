function windowToCanvas( x, y ) {
    var bounding = canvas.getBoundingClientRect();
    return {
        x: x - bounding.left * ( canvas.width / bounding.width ),
        y: y - bounding.top * ( canvas.height / bounding.height )
    }
}

function drawBoard() {
    context.save();
    context.strokeStyle = "#bfbfbf";
    context.beginPath();
    for( var x = BOARD_PADDING_LEFT; x <= BOARD_WIDTH + BOARD_PADDING_LEFT; x += BOARD_CELL_WIDTH ) {
        context.moveTo( x + 0.5, BOARD_PADDING_TOP );
        context.lineTo( x + 0.5, BOARD_PADDING_TOP + BOARD_HEIGHT );
        context.stroke();
    }
    for ( var y = BOARD_PADDING_TOP; y <= BOARD_HEIGHT + BOARD_PADDING_TOP; y += BOARD_CELL_HEIGHT ) {
        context.moveTo( BOARD_PADDING_LEFT, y + 0.5 );
        context.lineTo( BOARD_PADDING_LEFT + BOARD_WIDTH, y + 0.5 );
        context.stroke();
    }
    context.closePath();
    context.restore();
}

function drawPiece( row, col, side ) {
    var centerX = row * BOARD_CELL_WIDTH + BOARD_CELL_WIDTH / 2 + BOARD_PADDING_LEFT;
    var centerY = col * BOARD_CELL_HEIGHT + BOARD_CELL_HEIGHT / 2 + BOARD_PADDING_TOP;
    if( side === SIDE.circle ) {
        drawCircle( centerX, centerY );
    } else {
        drawCross( centerX, centerY );
    }
}

function drawCross( x, y ) {
    context.save();
    context.beginPath();
    context.strokeStyle = "#ff3030"
    context.lineWidth = CROSS_LINE_WIDTH;
    context.moveTo( x - Math.cos( Math.PI / 4 ) * CROSS_WIDTH / 2, y - Math.sin( Math.PI / 4 ) * CROSS_HEIGTH / 2 );
    context.lineTo( x + Math.cos( Math.PI / 4 ) * CROSS_WIDTH / 2, y + Math.sin( Math.PI / 4 ) * CROSS_HEIGTH / 2 );
    context.moveTo( x - Math.cos( Math.PI / 4 ) * CROSS_WIDTH / 2, y + Math.sin( Math.PI / 4 ) * CROSS_HEIGTH / 2 );
    context.lineTo( x + Math.cos( Math.PI / 4 ) * CROSS_WIDTH / 2, y - Math.sin( Math.PI / 4 ) * CROSS_HEIGTH / 2 );
    context.stroke();
    context.closePath();
    context.restore();
}

function drawCircle( x, y ) {
    context.save();
    context.beginPath();
    context.fillStyle = "#1c1c1c";
    // context.strokeStyle = "#0f0f0f";
    context.moveTo( x + CIRCLE_RADIUS - CIRCLE_LOOP_WIDTH, y );
    context.lineTo( x + CIRCLE_RADIUS, y );
    context.arc( x, y, CIRCLE_RADIUS, 0, 2 * Math.PI, false );
    context.arc( x, y, CIRCLE_RADIUS - CIRCLE_LOOP_WIDTH, 0, 2 * Math.PI, true );
    context.fill();
    // context.stroke();
    context.restore();
}

drawBoard();

var isUser = true;

canvas.onclick = function( e ) {
    var offset = windowToCanvas( e.clientX, e.clientY );
    if( offset.x < BOARD_PADDING_LEFT || offset.y < BOARD_PADDING_TOP ) return;
    var row = Math.floor( ( offset.x - BOARD_PADDING_LEFT ) / BOARD_CELL_WIDTH );
    var col = Math.floor( ( offset.y - BOARD_PADDING_TOP ) / BOARD_CELL_HEIGHT );
    drawPiece( row, col, isUser ? SIDE.cross : SIDE.circle );
    isUser = !isUser;
}
// drawPiece( 0, 0, SIDE.cross );
