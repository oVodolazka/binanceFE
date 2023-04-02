module.exports = {
    '*.{js,jsx,ts,tsx}': [
        'eslint --max-warnings=30', 
        () => 'tsc-files --noEmit',
    ]
}
