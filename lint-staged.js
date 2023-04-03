module.exports = {
    '*.{js,jsx,ts,tsx}': [
        'eslint', 
        () => 'tsc-files --noEmit',
    ]
}
