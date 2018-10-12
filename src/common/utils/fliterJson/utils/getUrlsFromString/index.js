const validateUrl = (str) => {
  const expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  const regexp = new RegExp(expression);
  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
};

const getUrlsFromString = (str, splitSymbol = ',') => {
  if (typeof str !== 'string') {
    return [];
  }

  const splitList = str.split(splitSymbol);
  const urls = splitList.filter((item, index) => {
    return validateUrl(item);
  });

  return urls;
};

export {getUrlsFromString};

