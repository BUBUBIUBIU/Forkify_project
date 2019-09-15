// This is just to include a built in node module,
// again called path, and then put it in the 'path' variable.
const path = require('path');
// 这种语句其实就是import
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 这是一个js object。他的作用是作为设置文件
module.exports = {
    /*
    * And the entry point is where webpack will start the bundling.
    * So basically, this is the file where it will start looking
    * for all the dependencies which it should then bundle together.
    * 我们可以选择一个或多个file作为entry point，这里我们选用project里的index.js
    * file作为entry point
    */

    entry: ["@babel/polyfill", './src/js/index.js'],

    /* 
    * 这个property会告诉webpack把bundle file存到哪里
    */

    output: {
        // 这个path必须是absolute path, in order to have access to that absolute path,
        // we need to use a build in node package.

        // So the '__dirname' variable here, it is the current absolute path.
        // And so we use path revolve to now join this current path
        // so that the working directory, the Forkify directory,
        // with the one that we want our bundle to be in, which is dist.
        // 目标地址 = __dirname + dist/js

        // 这里有一点要注意 webpack-dev-server will actually not write it to a file on disk,
        // but instead it will automatically inject it into the html. 所以lecture里会出现错误。
        
        // Lecture的问题：And the problem is that the outpost path here is this
        // dist and then slash js and so it will basically try
        // to inject this bundle into an html that is here
        // in the same folder, so also in the JavaScript folder,
        // which is not the case, cause the index.html is outside.
        path: path.resolve(__dirname, 'dist'),  
        filename: 'js/bundle.js'
    },

    devServer: {
        // And in here we will specify the folder
        // from which webpack should serve our files.
        // And in this case that is the distribution (dist) folder.
        // 在这里，dist这个folder是我们要ship给client的folder。
        // All of the final code of that app,
        // is here inside of this distribution folder,
        // so we will always have an index file with the html,
        // then the JavaScript, image, and CSS,
        // the source folder here is only for our development purposes,
        // so all our source code basically goes here.
        // Which then gets compiled or bundled
        // into this distrubution folder as bundle.js.
        contentBase: './dist'
    },

    plugins: [
        // basically this is here like a function constructor
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],

    // for loaders
    module: {
        rules: [
            // 每个loader我们用一个object来specify
            {
                // Babel的config file叫Babelrc

                // 这里的test指的是所有需要转化的目标文件，这里是所有
                // 后缀为.js的文件
                test: /\.js$/,
                // 这个exclude property把所有node_module中的文件排除了，不然太多了，运行很慢
                exclude: /node_modules/,
                // 这里use property指明的是所有test的file都要用某些loader。
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}