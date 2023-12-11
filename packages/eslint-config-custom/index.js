module.exports = {
  extends: [
    'next',
    'turbo',
    'prettier',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
};
