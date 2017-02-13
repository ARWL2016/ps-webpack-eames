var path = require('path'); 
var webpack = require('webpack');

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('shared'); 

module.exports = {
    context: path.resolve('js'), 
    // entry: ["./utils", "./app"], - single bundle
    entry: {
        about: './about_page.js', 
        home: './home_page.js',
        contact: './contact_page.js'  
    },
    output: {
        path: path.resolve('build/js'),
        publicPath: '/public/assets/js/', 
        // filename: "bundle.js" - single bundle
        filename: "[name].js" //matches entry
    }, 

    plugins: [commonsPlugin], 
    devServer: {
        contentBase: 'public'
    }, 
    watch: false, 

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "jshint-loader"
            },
            {
                test: /\.es6$/, 
                exclude: /node_modules/, 
                loader: "babel-loader"
            }
        ] 
    }, 

    resolve: {
        extensions: ['.js', '.es6']
    }

}

