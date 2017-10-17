const webpack = require('webpack');

const { config } = require('./webpack.config');

config.devtool = 'source-map';

console.log('webpack.optimize: ', webpack.optimize);

config.plugins = config.plugins.concat(
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),

    // environment variables
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.BABEL_ENV': JSON.stringify('production'),
        'process.env.BROWSER': JSON.stringify(1),

        __CLIENT__: true,
        __SERVER__: false,
        __PRODUCTION__: true,
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false
    }),

    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
);

module.exports = config;