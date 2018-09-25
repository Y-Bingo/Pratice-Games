var BOARD_WIDTH = 300,
    BOARD_HEIGHT = 300,
    BOARD_PADDING_TOP = 75,
    BOARD_PADDING_LEFT = 75,
    BOARD_CELL_WIDTH = 100,
    BOARD_CELL_HEIGHT = 100,
    CROSS_WIDTH = 90,
    CROSS_HEIGTH = 80,
    CROSS_LINE_WIDTH = 10,
    CIRCLE_RADIUS = 40,
    CIRCLE_LOOP_WIDTH = 10;

var SIDE = {
    cross: "x",
    circle: "o"
}

var canvas = document.querySelector( "#demo" );
var context = canvas.getContext( "2d" );
