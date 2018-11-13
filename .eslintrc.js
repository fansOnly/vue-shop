module.exports = {
    'parser': 'babel-eslint',
        'parserOptions': {
            'ecmaVersion': 6,
            'sourceType': 'module',
            'ecmaFeatures': {
                'jsx': true,
                'modules': true,
                'experimentalObjectRestSpread': true
            }
        },
    'rules': {
        'no-console': 0
    }
}