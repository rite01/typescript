module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'disable-next-line': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-import-module-exports': 'off',
    'no-unused-vars': 'off',
    'func-names': 'off',
    'no-console': 'off',
    'max-len': 'off',
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
    extensions: 'off',
  },
  ignorePatterns: ['**/*.ejs'],
};