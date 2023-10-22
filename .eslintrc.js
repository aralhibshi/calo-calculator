module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  plugins: ['react', 'prettier', 'standard'],
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['warn', { code: 120 }]
  }
};
