import camelCase from 'lodash/camelCase';

const requireModule = require.context(
  '.', // dir to search in
  false, // should webpack search sub dirs
  /\.js$/, // regEx to match the file names
);

const modules = {}; // holds modules

requireModule.keys().forEach((fileName) => {
  if (fileName === './index.js' || fileName === './dummy.js') {
    return;
  }

  const moduleConfig = requireModule(fileName); // returns exported data
  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''));
  modules[moduleName] = moduleConfig.default || moduleConfig;
});

export default modules;
