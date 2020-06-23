const path = require('path');
const HtmlWebpackplugin= require('html-webpack-plugin');
module.exports= {
    entry: ['babel-polyfill','./src/js/index.js'],
    /*so when we're running the development server,webpack will bundle our modules together,but it will actually not write it to a file on disk,
     but instead it will automatically inject it into the html.And so we could actually go ahead and delete this bundle file here because right 
     now it still looks the same here in this console because it's still simply reading the results from this bundle.js file and not from the one
      that we're generating on the fly,through the dev server because there's something that's wrong here.And the problem is that the outpost path
     here is this dist and then /js and so it will basically try to inject this bundle into an html that is here in the same folder, so also in the
      JavaScript folder,which is not the case, so the index.html is outside, and so we want to get rid of this part here,so the real path of the 
      output is now only dist,and then we can put the js here in this file name,all we're saying is that really now the output folder is this entire 
      dist folder here, okay.And no longer just a JavaScript folder,and this will be important for something else */
      /*
       output: {
        path: path.resolve(__dirname , 'dist/js'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist'
    }
     instead of this
     tbelow code is right for web-dev-server
      output: {
        path: path.resolve(__dirname , 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    }

       */
      output: {
        path: path.resolve(__dirname , 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins:[
        new HtmlWebpackplugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
    

};