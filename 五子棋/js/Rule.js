// 五元组集合，是一个三位数组
var tuple = [];
// 元组计数
var tuple_count = 0;
// 赢法数组
var my_win = [];
var computer_win = [];

// 定义元祖的数据结构
 var tupleItem = {
     index : 0,
     white_piece: [],
     black_piece: [],
     type: 0,
 }

// 初始化
for ( var i = 0; i < GRID_ROWS; i++ )
{
    tuple[ i ] = [];
    for ( var j = 0; j < GRID_COLS; j++ )
    {
        tuple[ i ][ j ] = [];
    }
}

// 统计水平方向的元组
for ( var i = 0; i < GRID_ROWS; i++ )
{
    for ( var j = 0; j <= GRID_COLS - GRID_COMBO; j++ )
    {
        for ( var k = 0; k < GRID_COMBO; k++ )
        {
            tuple[ i ][ j + k ][ tuple_count ] = true;
        }
        tuple_count++;
    }
}
// 统计竖直方向上的
for ( var i = 0; i <= GRID_ROWS - GRID_COMBO; i++ )
{
    for ( var j = 0; j < GRID_COLS; j++ )
    {
        for ( var k = 0; k < GRID_COMBO; k++ )
        {
            tuple[ i + k ][ j ][ tuple_count ] = true;
        }
        tuple_count++;
    }
}

// 统计正斜方向上的
for ( var i = 0; i <= GRID_ROWS - GRID_COMBO; i++ )
{
    for ( var j = 0; j <= GRID_COLS - GRID_COMBO; j++ )
    {
        for ( var k = 0; k < GRID_COMBO; k++ )
        {
            tuple[ i + k ][ j + k ][ tuple_count ] = true;
        }
        tuple_count++;
    }
}

// 统计反斜方向上的
for ( var i = 0; i <= GRID_ROWS - GRID_COMBO; i++ )
{
    for ( var j = GRID_COLS - 1; j >= GRID_COMBO - 1; j-- )
    {
        for ( var k = 0; k < GRID_COMBO; k++ )
        {
            tuple[ i + k ][ j - k ][ tuple_count ] = true;
        }
        tuple_count++;
    }
}
// 初始化赢法数组
for ( var i = 0; i < tuple_count; i++ )
{
    my_win[ i ] = 0;
    computer_win[ i ] = 0;
}

// 判断胜利
function checkWin ( row, col ) {
    for ( var i = 0; i < tuple_count; i++ )
    {
        if ( tuple[ row ][ col ][ i ] && my_win[ i ] != 10 )
        {
            my_win[ i ]++;
            computer_win[ i ] = 10;
        }
        if ( my_win[ i ] === 5 )
        {
            return true;
        }
    }
    return false;
}

// function checkComputerWin ( row, col ) {
//     for ( var i = 0; i < tuple_count; i++ )
//     {
//         if ( tuple[ row ][ col ][ i ] )
//         {
//             if ( !computer_win[ i ] && computer_win[ i ] != 10 )
//             {
//                 computer_win = 5;
//             } else
//             {
//                 computer_win[ i ]++;
//             }
//             my_win[ i ] = 10;
//         }
//         if ( computer_win[ i ] === 9 )
//         {
//             return true;
//         }
//     }
//     return false;
// }
