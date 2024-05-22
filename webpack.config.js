import path from 'path';
import { sync as globSync } from 'glob';
import Dotenv from 'dotenv-webpack';
import { fileURLToPath } from 'url';

// Convert __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development', // or 'production'
  entry: globSync('./src/**/*.{js,ts}').map(file => path.resolve(__dirname, file)), // Include TypeScript files in entry
  output: {
    filename: 'bundle.js', //'[name].bundle.js', // Use dynamic name based on entry file name
    path: path.resolve(__dirname, 'static/assets/js'),
  },
  resolve: {
    extensions: ['.js', '.ts'], // Add TypeScript extension
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.tsx?$/, // TypeScript files
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'ts-loader', // Use ts-loader for TypeScript
        },
      },
    ],
  },
  plugins: [
    new Dotenv(),
  ],
  devtool: 'source-map', // Use source-map for better debugging support
};