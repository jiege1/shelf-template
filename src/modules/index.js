

window.shelfModules = {};

export const modules = {
  redRain: true, // 红包雨
  mainType: 'sellers', // oneOf([null, 'sellers', 'category'])
};

export const loadModules = async() => {

  const moduleKeys = Object.keys(modules);

  const promises = moduleKeys.map(key => {
    return new Promise((resolve) => {
      if (modules[key]) {
        import(`modules/${key}`).then(res => {
          window.shelfModules[key] = res.default;
          resolve(true);
        });
      } else {
        resolve(true);
      }
    });
  });

  return Promise.all(promises);
};