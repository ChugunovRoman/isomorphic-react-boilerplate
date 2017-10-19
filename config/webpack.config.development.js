const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');

const { regularExpressions, config } = require('./webpack.config');

const appConfig = require('./');

config.devtool = 'source-map';

const jsLoader = config.module.rules.find(loader => loader.test.toString() === regularExpressions.typescript.toString());

// jsLoader.use[0].options = {
//     presets: [
//         'react', // babel-preset-react
//         'es2015', // babel-preset-es2015
//         'stage-0' // need babel-preset-stage-0
//     ]
// }

// Возможно буду юзать prettier
// jsLoader.use.push({
//     loader: 'eslint-loader',
//     options: {
//         configFile: path.resolve(__dirname, '../.eslintrc.json'),
//         quiet: true,
//         emitError: true,
//         failOnError: true
//     }
// });

jsLoader.use.unshift({
    loader: 'happypack/loader',
    options: {
        id: 'js'
    }
});


config.plugins.push(
    // environment variables
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        'process.env.BABEL_ENV': JSON.stringify('es6'),
        'process.env.BROWSER': JSON.stringify(1),

        __CLIENT__: true,
        __SERVER__: false,
        __PRODUCTION__: false,
        __DEVELOPMENT__: true,
        __DEVTOOLS__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HappyPack({
        id: 'js',
        loaders: ['babel-loader'],
        threads: 8
    })
);

// const devServerHost = appConfig.server.host;
// const devServerPort = appConfig.server.port;

// // network path for static files: fetch all statics from webpack development server
// config.output.publicPath = `http://${devServerHost}:${devServerPort}${config.output.publicPath}`;

module.exports = config;
