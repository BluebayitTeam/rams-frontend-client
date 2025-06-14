module.exports = {
	root: true,
	parser: '@babel/eslint-parser',
	parserOptions: {
		requireConfigFile: false,
		babelOptions: {
			presets: ['@babel/preset-react']
		}
	},
	plugins: ['prettier', 'unused-imports'],
	extends: ['airbnb', 'plugin:prettier/recommended'],
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx']
			}
		}
	},
	ignorePatterns: [
		'src/app/main/documentation/material-ui-components/components/**',
		'src/app/main/documentation/material-ui-components/pages/**',
		'tailwind.config.js'
	],
	rules: {
		'prettier/prettier': [
			'warn',
			{
				endOfLine: 'auto',
				arrowParens: 'always',
				bracketSpacing: true,
				jsxBracketSameLine: false,
				printWidth: 120,
				proseWrap: 'preserve',
				requirePragma: false,
				semi: true,
				singleQuote: true,
				tabWidth: 4,
				trailingComma: 'none',
				useTabs: true,
				singleAttributePerLine: true
			}
		],
		'no-global-assign': ['error', { exceptions: ['Object'] }],
		quotes: [
			1,
			'single',
			{
				allowTemplateLiterals: true,
				avoidEscape: true
			}
		],

		'padding-line-between-statements': [
			'warn',
			{ blankLine: 'always', prev: 'function', next: '*' },
			{ blankLine: 'always', prev: '*', next: 'if' },
			{ blankLine: 'always', prev: 'if', next: '*' },
			{ blankLine: 'always', prev: '*', next: 'function' }
		],
		// Disabling because this rule is extremely slow.
		'import/no-cycle': 'off',
		// Disabling because this rule is slow and not a common violation.
		'import/no-named-as-default': 'off',
		// Disabling because this rule is slow and not a common violation.
		'import/no-named-as-default-member': 'off',
		// This rule is already covered by the TypeScript compiler.
		'import/default': 'off',
		// This rule is already covered by the TypeScript compiler.
		'import/no-unresolved': 'on',
		'operator-linebreak': 'off',
		'no-param-reassign': 'off',
		'implicit-arrow-linebreak': 'off',
		'max-len': 'off',
		indent: 'off',
		'no-shadow': 'off',
		'arrow-parens': 'off',
		'no-confusing-arrow': 'off',
		'no-use-before-define': 'off',
		'object-curly-newline': 'off',
		'function-paren-newline': 'off',
		'import/prefer-default-export': 'off',
		'max-classes-per-file': 'off',
		'react/jsx-filename-extension': 'off',
		'import/extensions': 'off',
		'no-unused-vars': 'on',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_'
			}
		],
		'no-useless-constructor': 'off',
		'no-tabs': 'off',
		'react/jsx-indent': 'off',
		'react/jsx-indent-props': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-uses-react': 'off',
		'react/jsx-wrap-multilines': 'off',
		'react/prop-types': 'off',
		'react/require-default-props': 'off',
		'react/no-unescaped-entities': 'off',
		'no-underscore-dangle': 'off',
		'react/jsx-no-bind': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/no-array-index-key': 'off',
		'no-restricted-exports': ['off', { restrictedNamedExports: ['default'] }],
		'import/no-import-module-exports': 'off',
		'import/no-extraneous-dependencies': 'off'
	}
};
