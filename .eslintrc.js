module.exports = {
	root: true,
	env: {
	  node: true,
	  jest: true,
	},
	parserOptions: {
	  ecmaVersion: 2020,
	  sourceType: "module",
	},
	globals: {
	  process: "readonly",
	},
	plugins: ["@typescript-eslint"],
	rules: {
	  "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
	  "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
	  "no-process-env": "off",
	  "@typescript-eslint/no-explicit-any": "off",
	  '@typescript-eslint/interface-name-prefix': 'off',
	  '@typescript-eslint/explicit-function-return-type': 'off',
	  '@typescript-eslint/explicit-module-boundary-types': 'off',
	},
	ignorePatterns: ['.eslintrc.js'],
	overrides: [
	  {
		files: ['./**/*.ts'],
		parser: "@typescript-eslint/parser",
		parserOptions: {
		  sourceType: "module",
		  project: "./tsconfig.json",
		},
		extends: [
		  "plugin:prettier/recommended",
		  "plugin:@typescript-eslint/recommended"
		]
	  },
	]
  }