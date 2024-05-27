import globals from 'globals'
import pluginJs from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  { ignores: ['dist/', 'node_modules/'] },
  {
    files: ['**/*.js'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'commonjs' },
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { plugins: { '@stylistic/js': stylisticJs } },
  pluginJs.configs.recommended,
  {
    rules: {
      eqeqeq: 'error',
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/js/arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
  },
  eslintConfigPrettier,
]
