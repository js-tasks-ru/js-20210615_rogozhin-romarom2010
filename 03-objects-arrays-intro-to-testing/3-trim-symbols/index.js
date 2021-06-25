/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) {return string;}
  if (!size) {return '';}
  const arr = string.split('');
  let bufStringLength = 0;
  let bufValue = '';
  return arr.map(el => {
    if (bufStringLength === 0) {
      bufValue = el;
      bufStringLength++;
      return el;
    }
    else {
      if (el === bufValue) {
        bufStringLength++;
        return bufStringLength <= size ? el : '';
      }
      else {
        bufStringLength = 1;
        bufValue = el;
        return el;
      }
    }
  }).join('');
}
