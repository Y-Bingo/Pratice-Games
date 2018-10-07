// 规则3

var Rule = function() {
    // 所有落子位置相关的赢法
    this.wins = [];
    // 所有赢法
    this.tuples = [];
    /**
     * 计算所有的胜利路径
     * @param {Array} table 
     * @param {number} combo 
     */
    this.getWinPath = function( table, combo ) {

        this.wins = initWins( table );
        this.tuples = [];
        
        let wins = this.wins; 
        let tuples = this.tuples;
        
        // 计算路径数
        var tuple_count = 0;
        // table的行数
        var row_len = table.length;
        // table的列数
        var col_len = table[ 0 ].length;
        // 横向
        for( var row = 0; row < row_len; ++row ) {
            for( var col = 0; col <= col_len - combo; ++col ) {
                tuples[ tuple_count ] = [];
                for( var k = 0; k < combo; ++k ) {
                    tuples[ tuple_count ].push( encodeTableData( row, col + k, table[ row ][ col + k ] ) );
                    wins[ row ][ col + k ].push( tuple_count );
                }
                tuple_count++;
            }
        }
        // 纵向
        for( var row = 0; row <= row_len - combo; ++row ) {
            for( var col = 0; col < col_len; ++col ) {
                tuples[ tuple_count ] = [];
                for( var k = 0; k < combo; ++k ) {
                    tuples[ tuple_count ].push( encodeTableData( row + k, col, table[ row + k ][ col ] ) );
                    wins[ row + k ][ col ].push( tuple_count );
                }
                tuple_count++;
            }
        }
        // 正斜
        for( var row = 0; row <= row_len - combo; ++row ) {
            for( var col = 0; col <= col_len - combo; ++col ) {
                tuples[ tuple_count ] = [];
                for( var k = 0; k < combo; ++k ) {
                    tuples[ tuple_count ].push( encodeTableData( row + k, col + k, table[ row + k ][ col + k ] ) );
                    wins[ row + k ][ col + k ].push( tuple_count );
                }
                tuple_count++;
            }
        }
        // 反斜
        for( var row = row_len - 1; row >= combo - 1; --row ) {
            for( var col = 0; col <= col_len - combo; ++col ) {
                tuples[ tuple_count ] = [];
                for( var k = 0; k < combo; ++k ) {
                    tuples[ tuple_count ].push( encodeTableData( row - k, col + k, table[ row - k ][ col + k ] ) );
                    wins[ row - k ][ col + k ].push( tuple_count );
                }
                tuple_count++;
            }
        }
    };
    // @private
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
    this.getScore = function( source_map, table ) {

        return [];
    }
    /**
     * 分析桌面
     * @param {Array} table 桌面数据 
     * @return 
     */
    this.analyseTable = function( table ) {

    }   
    /**
     * 检查是否满足combo
     * @param {Array} tuple 当前局势 
     * @param {chess_type} target_type combo类型 
     */
    this.checkCombo = function( target_type ){
        let win_arr = [];
        let tuples = this.tuples;
        let type;
        target_type = target_type || chess_type.black;
        for( var i = 0; i < tuples.length; ++i ) {
            for( var j = 0; j < tuples[ i ].length; ++j ) {
                type = decodeTableData( tuples[ i ][ j ] ).type;
                if( type !== target_type ) break;
            }
            if( j === 5 ) return true;
        }
        return false;
    }

    this.updateTuple = function( row, col, type ) {
        let wins = this.wins;
        let tuples = this.tuples;
        let win = wins[ row ][ col ] || [];
        let tuple_index;
        let data;
        for( let count = 0; count < win.length; count++ ) {
            tuple_index = win[ count ];
            data = decodeTableData( tuples[ tuple_index ] );
            if( data.row === row && data.col === col && data.type === chess_type.blank ) {
                tuples[ tuple_index ] = encodeTableData( row, col, type );
                console.log( tuple_index );
            }
        }
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
    function encodeTableData( row, col, type ) {
        return ( row << 8 ) | ( col << 4 ) | ( type );
    }
    return this;
}








