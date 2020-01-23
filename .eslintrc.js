module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    semi: ['error', 'never'],
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
