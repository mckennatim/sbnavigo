var path = require('path');
module.exports={
	entry: './src/app.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
  module: {
    loaders: [
      { test: /\.js$/, 
        exclude: /node_modules/,
        loader: 'babel-loader' ,
        include: __dirname,
        query:
        {
          presets:['es2015']
        }
      },
      { test: /\.css$/, loader: "style!css?modules" },
      { test: /\.html$/, loader: "html-loader" }
    ],
  },
  devServer: {
    port:4300,
    host: 'http://0.0.0.0',
    contentBase: './dist',
    hot: true,
    historyApiFallback: true
  },
	devtool: 'source-map',    	
}