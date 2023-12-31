module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    "no-empty": 0,
    "prettier/prettier": ["error"],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-console": "error",
    "no-multiple-empty-lines": ["error", { "max": 3, "maxEOF": 0, "maxBOF": 1 }],
    "comma-dangle": ["error", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "always-multiline",
    }],
  //   "object-curly-newline": ["error", {
  //     "ObjectExpression": { "multiline": true, "minProperties": 5 },
  //     "ObjectPattern": { "multiline": true },
  // }],
    "object-curly-spacing": ["error", "always"],
    "key-spacing": ["error", { "beforeColon": false }],
    // "padded-blocks": ["error", "always"],
    "newline-after-var": ["error", "always"],
    "linebreak-style": ["error", "unix"],
    "padding-line-between-statements": ["error", { blankLine: "always", prev: ["const", "let", "var", "import", "function", "block-like", "expression"], next: ["function", "block-like", "expression", "export"]}, {blankLine: 'always', prev: 'return', next: '*'}]
  },
}
