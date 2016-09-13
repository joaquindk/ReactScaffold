const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const localScope = require('postcss-local-scope');

exports.devServer = function (options) {
    return {
        devServer: {
            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,

            // Unlike the cli flag, this doesn't set
            // HotModuleReplacementPlugin!
            hot: true,
            inline: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env to allow customization.
            //
            // If you use Vagrant or Cloud9, set
            // host: options.host || '0.0.0.0';
            //
            // 0.0.0.0 is available to all network devices
            // unlike default `localhost`.
            host: options.host,
            port: options.port
        },
        plugins: [
            // Enable multi-pass compilation for enhanced performance
            // in larger projects. Good default.
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            })
        ]
    };
};


exports.setupCSS = function (paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loaders: ['style', 'css-loader?sourceMap', 'postcss'],
                    include: paths
                }
            ]
        },
        postcss: function () {
            return [autoprefixer, precss, localScope];
        }
    };
};

exports.linting = function (paths) {
    return {
        module: {
            preLoaders: [
                {
                    test: /\.jsx?$/,
                    loaders: ['eslint'],
                    include: paths
                }
            ]
        }
    }
};

exports.reactBabel = function (paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: ['babel?cacheDirectory'],
                    include: paths
                }
            ]
        }
    }
}