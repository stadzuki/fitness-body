const path = require('path')

module.exports = {
    watch: true,
    entry: './scripts/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    }
}