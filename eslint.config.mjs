import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    }
  },
  pluginJs.configs.recommended,
  {
    // TypeScript specific rules
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["error", { "ignoreRestSiblings": true }]
    }
  },
  {
    // Prettier configuration
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      "prettier/prettier": [
        "error", 
        { 
          endOfLine: "auto", 
          printWidth: 120, 
          singleQuote: false 
        }
      ],
      "eqeqeq": "error"
    }
  },
  {
    ignores: [
      "node_modules/**", 
      "**/dist/**", 
      "eslint.config.mjs", 
      "playwright-report/**", 
      "test-results/**"
    ]
  }
];