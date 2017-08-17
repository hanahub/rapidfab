module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  env: {
    browser: true,
    mocha: true,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [ 'error', {
      singleQuote: true,
      trailingComma: "es5"
    }],
  },
  settings: {
    'import/resolver': 'webpack',
  },
};
