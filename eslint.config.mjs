import pluginVue from 'eslint-plugin-vue'
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import typescriptEslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

export default tseslint.config(
  ...tseslint.configs.recommended,
  js.configs.recommended,
  ...pluginVue.configs['flat/strongly-recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        sourceType: 'module',
        parser: {
          ts: typescriptEslint.parser,
        },
      },
    },
  },
  {
    files: ["src/**/*.ts"],
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
  }
);
