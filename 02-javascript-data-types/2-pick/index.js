/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const bufObj = {...obj};
  let bufArr = Object.keys(bufObj);
  bufArr.forEach(el => {
    if (!fields.includes(el)) {Reflect.deleteProperty(bufObj, el);}
  });
  return bufObj;
};
