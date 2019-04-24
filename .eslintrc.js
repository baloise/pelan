module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unmodified-loop-condition': 1,
        'standard/no-callback-literal': 1,
        'indent': ['error', 4],
        'no-mixed-operators': [
            'warn', {
                'groups': [
                    ['+', '-', '*', '/', '%', '**'],
                    ['&', '|', '^', '~', '<<', '>>', '>>>'],
                    ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                    ['in', 'instanceof']
                ],
                'allowSamePrecedence': true
            }
        ]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
