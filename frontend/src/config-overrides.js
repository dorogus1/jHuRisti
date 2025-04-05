const path = require('path');

module.exports = function override(config) {
    config.module.rules.push({
        test: /\.(mp3)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    });
    return config;
}