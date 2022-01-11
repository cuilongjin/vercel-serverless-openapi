/**
  * 获取指定长度的随机字符串
  *  @param {number} len 长度
  *  @return {string} 随机字符串
*/
function randomWord (len) {
  let o = ''
  const s = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < len; i++) {
    const pos = Math.round(Math.random() * (s.length - 1))
    o += s[pos]
  }
  return o
}

module.exports = {
  randomWord
}
