/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const bufObj = {...obj};
  let bufArr = Object.entries(bufObj);
  const fieldsArr = [...fields];
  bufArr = bufArr.map(el => {
    let ind = fieldsArr.findIndex(el1 => el1 === el[0]);
    if (ind !== -1) {return el;}
  })
    .filter(el => el !== undefined);
  return Object.fromEntries(bufArr);
};
