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
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'no-unmodified-loop-condition': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'standard/no-callback-literal': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'indent': ['error', 4]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
