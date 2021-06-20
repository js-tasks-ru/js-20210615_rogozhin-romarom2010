/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const bufObj = {...obj};
  let bufArr = Object.entries(bufObj);
  const fieldsArr = [...fields];
  bufArr = bufArr.map(el => {
    let ind = fieldsArr.findIndex(el1 => el1 === el[0]);
    if (ind === -1) {return el;}
  })
    .filter(el => el !== undefined);
  return Object.fromEntries(bufArr);
};
