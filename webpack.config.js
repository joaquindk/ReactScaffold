'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const webpackParts = require('./webpack-parts.config');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const common = {

    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'node_modules/html-webpack-template/index.ejs',
            title: 'Webpack demo',
            appMountId: 'app',
            inject: false
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};


let config;

// Detect how npm is run and branch based on that
// noinspection Eslint
switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(
            common,
            {devtool: 'source-map'},
            webpackParts.reactBabel(PATHS.app),
            webpackParts.linting(PATHS.app),
            webpackParts.setupCSS(PATHS.app)
        );
        break;
    default:
        config = merge(
            common,
            {devtool: 'eval-source-map'},
            webpackParts.reactBabel(PATHS.app),
            webpackParts.setupCSS(PATHS.app),
            webpackParts.linting(PATHS.app),
            webpackParts.devServer({
                // Customize host/port here if needed
                host: process.env.HOST,
                port: process.env.PORT
            })
        );
}

// validates that the webpack config is well structured before returning it
module.exports = validate(config);
