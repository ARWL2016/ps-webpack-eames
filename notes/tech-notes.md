Install webpack globally to use CLI

Basic build defines source and target files: 
`webpack ./app.js bundle.js`

This is equivalent to webpack config: 
    `module.exports = {
        entry: "./app.js", 
        output: {
            filename: "bundle.js"
        }
    }`

####Watch mode
CLI: `webpack --watch` 
Or set `watch: true` and CLI `webpack` 

####Webpack Development Server (with hot-loading)
`npm install webpack-dev-server -g` 
Run: `webpack-dev-server`
View: `localhost:8080/webpack-dev-server/` in webpack iframe

Run `webpack-dev-server --inline` (hot loading from `localhost:8080` - browser defaults to serve index.html)

####Environment
- Run the dev-server in one terminal and webpack in another.
- Changes to the `webpack.config.js` file require restarting the dev-server

**Mulitple entry points**
The basic mechanism for bundling is the module system. Webpack reads this to create the bundle. Files not required in the module system can be added in `webpack.config` as multiple entry points. This is good for third-party modules and plugins.

####Babel Changes  
Between babel v.5 and v.6, there were two important changes:   
- `.babelrc` file required  
- `babel-presets-2015` module become separate from `babel-core`  

####Adding an ES6 file to the bundle with Babel
1. Change js file extension to es6  
2. configure the `babel-loader` in the `webpack.config` file, under the property `module`: a) `test: /\.es6$/` regex to define file extension that will load b) `exclude: /node_modules/` c) `loader: "babel-loader"`  
3. Loaders is an array and each loader is configured in an object 
4. Use the `resolve` property to manage file extensions. By default, webpack will search for files with a `.js` extension. So we do not need to add this in module imports. Using `resolve`, we remove the defaults and add `.js` and `.es6`. *The first position defines a null extension (in the course). However, this no longer seems to be necessary.*   
