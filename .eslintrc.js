module.exports = {
  root: true, // tells the root directory of the project
  env: { // it can run in multiple environments - tells esLint where our project will run
    node: true,
    jest: true,
  },
  extends: [ // allows us to use a predrfined set of rules
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: { // parsers processes the code in our file - babel option used to help it parse Js
    parser: 'babel-eslint',
  },
  rules: { // rules object obj where we can overide the rules - rules defined here will take precedence over others
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [ // overrides property - allows us to overide the eslint settings for specific files
    {
      files: [ // specify which files the overriten settings to apply to
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      // env: {
      //   jest: true,
      // },
    },
  ],
};
