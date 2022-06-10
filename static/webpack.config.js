const path = require('path');

module.exports = {

   resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
   
  entry: {
    app: './src/index.tsx',
    jad: './src/old/main.js'
  },
  
  
  output: {
    path: path.resolve(__dirname, 'assets/js'),
    filename: '[name].js'
   },

module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript",]
        }
      }
    },
       
    {
     test: /(\.css|\.scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
    },
    
    
    
    {
        test: /\.tsx?$/,
        use: ['ts-loader']
      },
      
      
      
       {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
      
      
    
    ]
}, 



devServer: {
    contentBase: path.join(__dirname, "assets/js"),
    compress: true,
    port: 4000,
  },
  
mode :  'development',
};

