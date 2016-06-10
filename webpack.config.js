var webpack = require("webpack");
var path    = require("path");

var out = {
    entry: {
        "vendor": [
            "react",
            "react-dom",
            "react-redux",
            "redux",
            "jquery"
        ],
        index: [ "./frontend/src/index.jsx" ]
    },
    plugins : [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"' + (process.env.NODE_ENV || "production") + '"'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name      : "vendor",
            filename  : "commons.js"
        })
    ],
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "backend/www/js"),
        publicPath:  "/js/"
    },
    module: {
        loaders: [
            {
                test   : /\.jsx?$/,
                exclude: /node_modules/,
                loaders: [ "babel" ]
            }
        ]
    },
    resolve : {
        extensions : [ "", ".js", ".jsx" ]
    }
};

// production ------------------------------------------------------------------
if (process.env.NODE_ENV === "production") {

    out.plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );

    out.stats = {
        colors : true,
        modules: false,
        reasons: false,
        errorDetails: false
    }

    console.log("Webpack running in production mode. Please wait...");
}

// development -----------------------------------------------------------------
else {
    out.stats = {
        colors : true,
        modules: false,
        reasons: true,
        errorDetails: true
    };
    console.log("Webpack running in development mode. Please wait...");
}

module.exports = out;
