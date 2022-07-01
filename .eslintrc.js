module.exports = {
  extends: [
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:vue/vue3-recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: {
        'map': [
          ['@', './src']
        ],
        'extensions': ['.js', '.ts', '.vue'],
      },
    },
  },
};
