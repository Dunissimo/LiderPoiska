module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  ignorePatterns: [
    ".eslintrc.cjs",
    "vite.config.ts",
    "tailwind.config.js",
    "postcss.config.js",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],

    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "no-console": "warn",
    "react/react-in-jsx-scope": "off",

    "prettier/prettier": [
      "warn",
      {
        printWidth: 80,
        tabWidth: 2,
        semi: true,
        singleQuote: false,
        jsxSingleQuote: false,
        trailingComma: "es5",
        bracketSpacing: true,
        bracketSameLine: false,
        endOfLine: "lf",
        arrowParens: "always",
      },
    ],
  },
};
