// global.Promise = require('bluebird');

const path = require('path');
const webpack = require('webpack');
// const autoprefixer = require('autoprefixer');

// project folder
const rootFolder = path.resolve(__dirname, '..');

const regularExpressions = {
    typescript: /\.tsx?$/,
    sass: /\.sass$/,
    css: /\.css$/
};

const config = {
    context: `${rootFolder}/src`,
    entry: {
        client: path.join(rootFolder, '/src/client.tsx'),
        './../../src/server/html': path.join(rootFolder, '/src/components/html.tsx')

    },
    output: {
        // filesystem path for static files
        path: path.join(rootFolder, '/public/assets/'),

        // network path for static files
        publicPath: '/public/assets/',

        // file name pattern for entry scripts
        filename: '[name].js',

        // file name pattern for chunk scripts
        chunkFilename: '[name].js'
    },

    module: {
        rules: [
            {
                test: regularExpressions.typescript,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ],
            },
            // { 
            //     enforce: 'pre',
            //     test: /\.js$/,
            //     loader: 'source-map-loader'
            // },
            {
                test: regularExpressions.css,
                use: [
                    {
                        loader: 'isomorphic-style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: false,
                            // importLoaders: 1,
                            localIdentName: '[local]'
                            // localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
    
                    }
                ]
            },
            {
                test: regularExpressions.sass,
                use: [
                    'isomorphic-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            modules: true,  
                            sourceMap: false,
                            sourceMapContents: false,
                            importLoaders: 1,
                            localIdentName: '[local]'
                            // localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ],
            },
            {
                test: /\.gif$/,
                loader: 'url-loader?limit=10000&mimetype=image/gif'
            },
            {
                test: /\.jpg$/,
                loader: 'url-loader?limit=10000&mimetype=image/jpg'
            },
            {
                test: /\.png$/,
                loader: 'url-loader?limit=10000&mimetype=image/png'
            },
            {
                test: /\.svg/,
                loader: 'url-loader?limit=26000&mimetype=image/svg+xml'
            },
            {
                test: /\.(woff|woff2|ttf|eot)/,
                loader: 'url-loader?limit=1'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    'img-loader',
                    'file-loader'
                ]
            },
            {
                test: /\.(mo|po)$/,
                loader: 'binary-loader'
            },
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.sass', '.css'],

        modules: [
            path.resolve('node_modules')
        ],
        alias: {
            components: path.resolve(__dirname, './../src/components')
        }
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    plugins: []
};

module.exports = {
    regularExpressions,
    config
};
