import _ from 'lodash';
// utility js library

export default {
  install(app) {
    const baseComponents = require.context(
      '../components/base/', false, /[A-Za-z0-9-_, \s]+\.vue$/i,
    );
    // function defined by webpack
    // 3 args -
    // 1. where webpack should begin search - relative path
    // 2. weather to search sub dirs
    // 3. regEx for the file names
    // returns information about the file

    baseComponents.keys().forEach((fileName) => {
      const componentConfig = baseComponents(fileName);
      // data returned form the baseComponents function

      const componentName = _.upperFirst(
        _.camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
      );

      // console.log(fileName, componentName);

      app.component(
        `Base${componentName}`, componentConfig.default || componentConfig,
      );
    });
    // returns an array of files found - based on the passed args
  },
};
