####Basics  
- Install webpack globally to use CLI
- Basic build defines source and target files: `webpack ./app.js bundle.js`  
- This is equivalent to defining entry and output in webpack config.

####Watch mode  
CLI: `webpack --watch`   
Alternative: `watch: true` and CLI `webpack` 
---

####Webpack Development Server (with hot-loading)  
1. `npm install webpack-dev-server -g`   
2. Run `webpack-dev-server`  
3. View: `localhost:8080/webpack-dev-server/` in webpack iframe
4. Alternatively: `webpack-dev-server --inline` (hot loading from `localhost:8080` - browser defaults to serve index.html)  


####Environment  
- Changes to the `webpack.config.js` file require restarting the dev-server
- running the `webpack-dev-server` also reruns the bundle (in dev mode)    
 

####Mulitple entry points  
The basic mechanism for bundling is the module system. Webpack reads this to create the bundle. Files not required in the module system can be added in `webpack.config` as multiple entry points. This is good for third-party modules and plugins.  
---

####Babel Changes  
Between babel v.5 and v.6, there were two important changes:   
- `.babelrc` file required  
- `babel-presets-2015` module become separate from `babel-core`  
 
####Adding an ES6 file to the bundle with Babel
*npm install babel-core, babel-loader, and babel-preset-es2015* 
1. Change js file extensions to es6 for modules using es6   
2. configure the `babel-loader` in the `webpack.config` file, under the property `module`: a) `test: /\.es6$/` regex to define file extension that will load b) `exclude: /node_modules/` c) `loader: "babel-loader"`  
3. Loaders is an array and each loader is configured in an object 
4. Use the `resolve` property to manage file extensions. By default, webpack will search for files with a `.js` extension. So we do not need to add this in module imports. Using `resolve`, we remove the defaults and add `.js` and `.es6`. *The first position defines a null extension (in the course). However, this no longer seems to be necessary.* 
5. run webpack and restart server      


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
Strip loader is a package which strips out code needed in development but not production, such as console.log statements  
1. `npm install strip-loader --save-dev`  
2. Create a `webpack-production.config.js` file. This will import the default `webpack.config` and add to it, creating a superset.  
3. require strip-loader and webpack.config  
4. Configure the strip-loader in the same way as babel and jshint: define test, exclude and loader   
5. push onto the Webpack 2.0 `rules` array  
6. export the superset module - reason unclear  
7. CL: `webpack --config webpack-production.config.js -p` - this will run webpack using the new config file and minify (-p)  
8. Nb. To test in the browser, we cannot use `web-dev-server` since this will rerun the bundler with the `webpack.config`. So, install `http-server` globally and run that instead. 
 

