// 规则3
var source_map = {
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
};

/**
 * 计算所有的胜利路径
 * @param {Array} table 
 * @param {number} combo 
 */
function getWinPath( table, combo ) {
    // 比table大的数据大小
    var all_wins = [];
    // 一位数组
    var tuple = [];
    // table的行数
    var rowLen = table.length;
    // table的列数
    var colLen = table[ 0 ].length;
    for( var row = 0; row < rowLen; ++row ) {
        all_wins[ row ] = [];
        for( var col = 0; col < colLen - combo; ++col ) {
            all_wins[ row ][ col ] = []; 
            for( var count = 0; count < combo; ++count ) {

            }
        }
    }
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
       "row": ( data & 0x100 ) >> 8,
       "col": ( data & 0x010 ) >> 4,
       "state": ( data & 0x001 ) >> 0
   }
}


/**
 * 把位置状态数据，转换成一个16进制的数据来存储
 * @param {number} row 行位置数据 
 * @param {number} col 竖位置数据 
 * @param {number} state 该位置的状态
 */
function encodeTableData( row, col, state ) {
    return 0x000 | ( row << 8 ) | ( col << 4 ) | ( state );
}
