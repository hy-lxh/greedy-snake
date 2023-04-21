module.exports = {
	'root': true,
	'overrides': [
		{
			'files': ['./src/**/*.ts'],
			'parser': '@typescript-eslint/parser',
			'parserOptions': {
				'ecmaVersion': 'latest',
				'sourceType': 'module'
			},
			'env': {
				'browser': true,
				'es2021': true
			},
			'extends': [
				'eslint:recommended',
				'plugin:@typescript-eslint/recommended'
			],
			'plugins': [
				'@typescript-eslint'
			],
			'rules': {
				'indent': [
					'error',
					'tab'
				],
				'linebreak-style': [
					'error',
					'unix'
				],
				'quotes': [
					'error',
					'single'
				],
				'semi': [
					'error',
					'always'
				]
			}
		}
	]
};
