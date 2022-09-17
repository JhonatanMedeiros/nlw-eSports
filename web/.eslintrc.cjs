module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
	settings: {
		react: {
			// Tells eslint-plugin-react to automatically detect the version of React to use.
			version: 'detect',
		},
	},
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
		project: ['./tsconfig.json']
  },
  plugins: [
    'react'
  ],
  rules: {
		"semi": "off",
		"indent": "off",
		"no-tabs": "off",
		"no-mixed-spaces-and-tabs": 0,
		"react/react-in-jsx-scope": "off",
		"@typescript-eslint/indent": ["error", "tab"],
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-misused-promises": "off",
		"@typescript-eslint/strict-boolean-expressions": "off",
		"@typescript-eslint/semi": ["error", "always"],
		"@typescript-eslint/member-delimiter-style": [
			"error",
			{
				"multiline": {
					"delimiter": "semi",
					"requireLast": true
				},
				"singleline": {
					"delimiter": "semi",
					"requireLast": false
				},
				"multilineDetection": "brackets"
			}
		],
		"@typescript-eslint/triple-slash-reference": "off",
		"@typescript-eslint/no-floating-promises": "off"
  }
}
