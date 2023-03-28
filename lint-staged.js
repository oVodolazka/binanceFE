module.exports = {
    '*.{js,jsx,ts,tsx}': [
        'eslint --max-warnings=10', 
        () => 'tsc-files --noEmit',
    ]
}
