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

Watch mode
CLI: `webpack --watch` 
Or set `watch: true` and CLI `webpack` 

Webpack Development Server (with hot-loading)
`npm install webpack-dev-server -g` 
Run: `webpack-dev-server`
View: `localhost:8080/webpack-dev-server/` in webpack iframe

Run `webpack-dev-server --inline` (hot loading from `localhost:8080` - browser defaults to serve index.html)
