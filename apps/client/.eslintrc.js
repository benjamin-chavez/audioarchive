// apps/client/.eslintrc.js

module.exports = {
  // root: true,
  // ...other ESLint rules,
  extends: [
    // 'custom',
    // 'eslint-config-custom',
    'next/core-web-vitals',
    'prettier',
    'plugin:prettier/recommended',
    // 'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  plugins: [
    'prettier',
    // '@tanstack/query'
  ],
  rules: {
    'prettier/prettier': 'error',
  },
};
