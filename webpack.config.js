module.exports = {
    entry: {
        index: './src/app/index.js',
        sell: './src/app/SellStation.js'
    },
    output: {
        path: __dirname + '/src/public',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
    
};