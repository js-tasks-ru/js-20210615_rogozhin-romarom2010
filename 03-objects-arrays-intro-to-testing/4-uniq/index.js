/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
  if (!arr) {return [];}
  const set = new Set([...arr]);
  const newArr = [];
  for (let item of set.values()) {newArr.push(item);}
  return newArr;
}
