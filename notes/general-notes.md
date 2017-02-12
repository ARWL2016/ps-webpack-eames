####The Purpose of a Build Step
- minification   
- combining files (allows modular development) 
- maintaining file order  
- transpilation  
- linting  

####Alternatives to Webpack
Task runners can accomplish everything that webpack does and many other things. Webpack is a kind of specialised task runner. ASP.net also has a bundling function. In some front-end frameworks, such as Angular, file order is unimportant.

####Webpack Usage
- use NPM not Bower for client-side dependencies   
- use a module system, such as AMD, CommonJS (require), ES6 modules to bundle .js files 
- webpack and npm scripts tend to be used together    