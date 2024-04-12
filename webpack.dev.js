const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: "eval",
    cache: {
        type: "filesystem",
        cacheDirectory: path.resolve(__dirname, ".webpack_cache"),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 8888,
        open: true,
        watchFiles: ['index.html', 'src/**/*'],
        open: true,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
    },
});