module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/indent': ["error", 2],
    '@typescript-eslint/no-unused-vars': "error",
    '@typescript-eslint/no-explicit-any': "error",
    "no-console": 2,
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
  }
};
