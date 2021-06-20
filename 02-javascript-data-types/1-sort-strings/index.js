/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const newArr = [...arr];

  const collator = new Intl.Collator(["ru-RU"], { caseFirst: 'upper', localeMatcher: 'best fit'});
  let enLangArr = newArr.filter(el => el.codePointAt(0) <= 220 && el.codePointAt(0) >= 65);
  let ruLangArr = newArr.filter(el => el.codePointAt(0) > 220 || el.codePointAt(0) < 65);
  const result = [];
  if (param === 'asc') {
    ruLangArr.sort((a, b) => {return collator.compare(a, b);}).forEach(el => result.push(el));
    enLangArr.sort((a, b) => {return collator.compare(a, b);}).forEach(el => result.push(el));
  }
  else {
    enLangArr.sort((a, b) => {return collator.compare(b, a);}).forEach(el => result.push(el));
    ruLangArr.sort((a, b) => {return collator.compare(b, a);}).forEach(el => result.push(el));
  }
  return result;
  // return newArr.sort((a, b) => {
  //   return param === 'asc' ? collator.compare(a, b) : collator.compare(b, a);
  // });
  //b.localeCompare(a, ['ru', 'en'], { caseFirst: 'upper'}); sensitivity: 'case',
}
