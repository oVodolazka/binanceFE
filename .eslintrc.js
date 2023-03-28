module.exports = {
    'parser': 'babel-eslint',
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'overrides': [
    ],
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'react/prop-types': ['off'],
        'react/react-in-jsx-scope': 'off',
        'no-console':'off',
        'no-undef':'warn'
    },
}