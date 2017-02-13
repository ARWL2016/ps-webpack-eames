####Basics  
- Install webpack globally to use CLI
- Basic build defines source and target files: `webpack ./app.js bundle.js`  
- This is equivalent to defining entry and output in webpack config.

---
####Watch mode  
- CLI: `webpack --watch`   
- Alternative: `watch: true` and CLI `webpack` 

---
####Webpack Development Server (with hot-loading)  
1. `npm install webpack-dev-server -g`   
2. Run `webpack-dev-server`  
3. View: `localhost:8080/webpack-dev-server/` in webpack iframe
4. Alternatively: `webpack-dev-server --inline` (hot loading from `localhost:8080` - browser defaults to serve index.html)  

---
####Environment  
- Changes to the `webpack.config.js` file require restarting the dev-server
- running the `webpack-dev-server` also reruns the bundle (in dev mode)    
 
---
####Mulitple entry points  
- The basic mechanism for bundling is the module system. Webpack reads this to create the bundle. 
- Files not required in the module system can be added in `webpack.config` as multiple entry points. 
- This is good for third-party modules and plugins.  

---
####Babel Changes  
Between babel v.5 and v.6, there were two important changes:   
- `.babelrc` file required  
- `babel-presets-2015` module become separate from `babel-core`  

---
####Adding an ES6 file to the bundle with Babel
*npm install babel-core, babel-loader, and babel-preset-es2015*   
1. Change js file extensions to es6 for modules using es6   
2. configure the `babel-loader` in the `webpack.config` file, under the property `module`: a) `test: /\.es6$/` regex to define file extension that will load b) `exclude: /node_modules/` c) `loader: "babel-loader"`  
3. Loaders is an array and each loader is configured in an object 
4. Use the `resolve` property to manage file extensions. By default, webpack will search for files with a `.js` extension. So we do not need to add this in module imports. Using `resolve`, we remove the defaults and add `.js` and `.es6`. *The first position defines a null extension (in the course). However, this no longer seems to be necessary.* 
5. run webpack and restart server   

####Supporting ES6 Modules 
1. change file extensions to es6  
2. use import and export statements  
3. remove file extensions from `entry` in `webpack.config.js`. The `resolve` property will enable webpack to find the es6 modules.
4. To export a single function, use the shorthand `export {function}`   

---
####Webpack 2 Changes (IMPORTANT)  
1. `preLoaders` as used in the course is no longer valid  
2. the loaders array has been renamed `rules` and is now an array of anon objects. To specify a preloader, use `enforce: 'pre'` 
3. See http://stackoverflow.com/questions/39919793/tslint-loader-with-webpack-2-1-0-beta-25/39997947#39997947  

--- 

####Minification  
1. running `webpack -p` will output a minified build  
2. Normally we don't do this in development. In a professional system, this would be handled by a **Continuous Integration (CI) Server**  

---
####Using JSHint  
1. `npm install jshint jshint-loader --save-dev`  
2. add a `.jshintrc` file to the root with an empty `{}` - reason unclear    
3. configure `webpack.config` under `module` and `rules`to configure the loader. Use `enforce: 'pre'`  

--- 
####Creating a Production Config and Using Strip-Loader
0. Strip loader is a package which strips out code needed in development but not production, such as console.log statements  
1. `npm install strip-loader --save-dev`  
2. Create a `webpack-production.config.js` file. This will import the default `webpack.config` and add to it, creating a superset.  
3. require strip-loader and webpack.config  
4. Configure the strip-loader in the same way as babel and jshint: define test, exclude and loader   
5. push onto the Webpack 2.0 `rules` array  
6. export the superset module - reason unclear  
7. CL: `webpack --config webpack-production.config.js -p` - this will run webpack using the new config file and minify (-p)  
8. Nb. To test in the browser, we cannot use `web-dev-server` since this will rerun the bundler with the `webpack.config`. So, install `http-server` globally and run that instead. 

---
####Creating a Realistic Folder Structure  
1. In `index.html` the script src is set to `"/public/assets/js/bundle.js"`. This folder will be referenced in the browser as the location of bundle.js. But it WILL NOT be created in the project folder. It will exist virtually at runtime when web-dev-server is run. 
2. webpack.config: require the node `path` module. This module provides utilities for working with paths: https://nodejs.org/api/path.html#path_path  
3. Set `context: path.resolve('js')`. This creates the context (or root) for the entry points. So webpack will search for our entry files in `js` instead of the root.  
4. Set the `output.path` to `path.resolve('build/js')`. This is the location of the output build ONLY WHEN we run `webpack`. The local path.     
5. Set `output.publicPath` to `/public/assets/js/`. This is the path when served in the browser, or on the public web server. This is the path that `index.html` looks for in the browser.   
6. Set `devServer.contentBase: 'public'`. This provides the context for `index.html`  
7. Summary: the `context` and `contentBase` properties describe the location of the entry  files and index.html. The `output.path` property describes the build location and the `output.publicPath` describes the location of the build on the webserver. When a request comes to the public path, webpack will search in the local path.   
8. See https://webpack.github.io/docs/configuration.html for more details.   

---
####Creating Multiple Bundles  
*This section configures webpack to create separate bundles. In the example, we have three separate html files each with their own js file. Webpack injects a lot of functionality into a bundle which we do not want to duplicate. Therefore, we create a shared.js file to contain these functions. In this scenario, there is no modular bundling.*  
*This can be used for lazy-loading, only loading files as needed. In this example, the js bundles are only loaded when the link is clicked to the associated html file. It is also useful for multiple webpages.*  

1. In each html file, create a link to `shared.js` and then a link to its own `js` file. 
2. In `webpack.config` require webpack, and then:     
3. `var commonPlugin = new webpack.CommonsChunkPlugin('shared');` This function creates the shared file. Nb. in the course, he uses 'shared.js' but this seems to output 'shared.js.js' and breaks.  
4. Redefine our entry points from an array to an object. List each js file under an appropriate property name  
5. redefine `output.filename`  to `"[name].js"` This will output js files with the name from (4). 
6. set plugins: `[commonsPlugin]` - this is the shared file  
7. If we run `webpack`, it will now output all the built files to the path specified in `output.path`. As before, if we run `webpack-dev-server` these bundles will be created virtually

