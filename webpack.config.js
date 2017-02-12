var path = require('path'); 

module.exports = {
    context: path.resolve('js'), 
    entry: ["./utils.js", "./app.js"], 
    output: {
        path: path.resolve('build/js'),
        publicPath: '/public/assets/js/', 
        filename: "bundle.js"
    }, 

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

