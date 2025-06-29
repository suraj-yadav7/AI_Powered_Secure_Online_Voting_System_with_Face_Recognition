export const objSanitizeflatten = (obj, prefix = '', res = {}) => {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;

    // Skip unwanted values
    if (value === '' || value === null || key === 'id') {
      console.log('Skipping key:', path, 'with value:', value);
      continue;
    };

    // Recurse if value is a nested object
    if (typeof value === 'object' && !Array.isArray(value)) {
      objSanitizeflatten(value, path, res);
    } else {
      res[path] = value;
    };
  }
  return res;
};