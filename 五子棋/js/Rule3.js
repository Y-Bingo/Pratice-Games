// 规则3

// 计算路径数
var tuple_count = 0;

/**
 * 计算所有的胜利路径
 * @param {Array} table 
 * @param {number} combo 
 */
function getWinPath( table, combo ) {
    // 比table大的数据大小
    var all_wins = initWins( table );
    // 一数组
    var tuple = [];
    // table的行数
    var row_len = table.length;
    // table的列数
    var col_len = table[ 0 ].length;
    // 横向
    for( var row = 0; row < row_len; ++row ) {
        for( var col = 0; col <= col_len - combo; ++col ) {
            tuple[ tuple_count ] = [];
            for( var k = 0; k < combo; ++k ) {
                tuple[ tuple_count ].push( encodeTableData( row, col + k, table[ row ][ col + k ] ) );
                all_wins[ row ][ col + k ].push( tuple_count );
            }
            tuple_count++;
        }
    }
    // 纵向
    for( var row = 0; row <= row_len - combo; ++row ) {
        for( var col = 0; col < col_len; ++col ) {
            tuple[ tuple_count ] = [];
            for( var k = 0; k < combo; ++k ) {
                tuple[ tuple_count ].push( encodeTableData( row + k, col, table[ row + k ][ col ] ) );
                all_wins[ row + k ][ col ].push( tuple_count );
            }
            tuple_count++;
        }
    }
    // 正斜
    for( var row = 0; row <= row_len - combo; ++row ) {
        for( var col = 0; col <= col_len - combo; ++col ) {
            tuple[ tuple_count ] = [];
            for( var k = 0; k < combo; ++k ) {
                tuple[ tuple_count ].push( encodeTableData( row + k, col + k, table[ row + k ][ col + k ] ) );
                all_wins[ row + k ][ col + k ].push( tuple_count );
            }
            tuple_count++;
        }
    }
    // 反斜
    for( var row = row_len - 1; row >= combo - 1; --row ) {
        for( var col = 0; col <= col_len - combo; ++col ) {
            tuple[ tuple_count ] = [];
            for( var k = 0; k < combo; ++k ) {
                tuple[ tuple_count ].push( encodeTableData( row - k, col + k, table[ row - k ][ col + k ] ) );
                all_wins[ row - k ][ col + k ].push( tuple_count );
            }
            tuple_count++;
        }
    }
    return {
        "wins": all_wins,
        "tuple": tuple
    }
}

function initWins( table ) {
    let row_len = table.length;
    let col_len = table[ 0 ].length;
    let all_wins = [];
    for( var row = 0; row < row_len; ++row ) {
        all_wins[ row ] = [];
        for( var col = 0; col < col_len; ++col ) {
            all_wins[ row ][ col ] = [];
        }
    }
    return all_wins;
}



/**
 * 根据传入的评分表和桌面数据来计算出分值
 * @param {*} source_table 评分表
 * @param {Array} table 桌面数据 
 * @return source_tabel
 */
function getScore( source_map, table ) {
    
    return [];
}


function checkCombo( tuple, target_type ) {
    var win_arr = [];
    var type;
    for( var i = 0; i < tuple.length; ++i ) {
        for( var j = 0; j < tuple[ i ].length; ++j ) {
            type = decodeTableData( tuple[ i ][ j ] ).type;
            if( type !== target_type ) break;
        }
        if( j === 5 ) return true;
    }
    return false;
}

checkWin( getWinPath( chess_data, GRID_COMBO ).tuple );

/**
 * 分析桌面
 * @param {Array} table 桌面数据 
 * @return 
 */
function analyseTable( table ) {

}   

/**
 * 把一个16进制的竖转化成位置状态数据
 * @param {number} data 16进制的数据 
 */
function decodeTableData( data ) {
   return {
       "row": ( data & ( 0xF << 8 ) ) >> 8,
       "col": ( data & ( 0xF << 4 ) ) >> 4,
       "type": ( data & ( 0xF ) ) >> 0
   }
}


/**
 * 把位置状态数据，转换成一个16进制的数据来存储
 * @param {number} row 行位置数据 
 * @param {number} col 竖位置数据 
 * @param {number} state 该位置的状态
 */
function encodeTableData( row, col, state ) {
    return ( row << 8 ) | ( col << 4 ) | ( state );
}
