export default function (includes = {}) {
  let includedKeys = {};

  Object.keys(includes).forEach((key) => {
    if (typeof includes[key] === 'object') {
      Object.keys(includes[key]).forEach((itemKey) => {
        if (typeof includes[key][itemKey] === 'object') {
          Object.keys(includes[key][itemKey]).forEach((childKey) => {
            includedKeys[`${key}.${itemKey}.${childKey}`] = 1;
          });
        } else {
          includedKeys[`${key}.${itemKey}`] = 1;
        }
      });
    } else {
      includedKeys[key] = 1;
    }
  });

  return includedKeys;
}
