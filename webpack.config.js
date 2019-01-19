const path = require('path');

module.exports = {
    entry: './app/templates/form.js',
    module: {
        rules: [
            {
                test:/\.js|jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test:/\.(jpe?g|png|gif|svg)$/i,
                use: ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false']
            },
            {
                test:/\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"]
    },
    output: {
        filename: 'form-pack.js',
        path: path.resolve(__dirname, 'app/templates')
    },
    mode: 'development'
}