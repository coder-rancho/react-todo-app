module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['react-app', 'eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};
