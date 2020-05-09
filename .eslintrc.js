module.exports = {
	parser: "@typescript-eslint/parser",

	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
	},

	extends: [
		"plugin:@typescript-eslint/recommended",
	],

	rules: {
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"semi-style": ["error", "last"],
		"semi": ["error", "always"]
	},
};