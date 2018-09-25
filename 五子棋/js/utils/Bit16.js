/**
 * 设置某位的值
 * @param {number} val
 * @param {number} bit
 */
function setBit(val, bit) {
  return val | (0x1 << bit);
}

/**
 * 获取某位的值
 * @param {number} bit
 */
function getBit(val, bit) {
  return (val & (0x1 << bit)) >> bit;
}

function clearBit() {}

function reserverBi() {}
