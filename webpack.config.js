const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const baseConfig = {
  mode: process.env.NODE_ENV || 'development',

  node: {
    __dirname: false,
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@resources': path.resolve(__dirname, './resources'),
    },
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.(png|ico)$/,
        use: {
          loader: 'node-file-path-loader',
          options: {
            outputPath: '../resources',
          },
        },
      },
      {
        test: /\.(css|html)$/,
        use: 'raw-loader',
      },
    ],
  },
};

const mainConfig = {
  ...baseConfig,

  target: 'electron-main',

  entry: './src/main/index.ts',

  output: {
    filename: 'main.js',
    path: path.join(__dirname, '/app/main'),
  },

  plugins: [new CleanWebpackPlugin()],
};

const preloadConfig = {
  ...baseConfig,

  target: 'electron-preload',

  entry: './src/renderer/preload.ts',

  output: {
    filename: 'preload.js',
    path: path.join(__dirname, '/app/renderer'),
  },

  plugins: [new CleanWebpackPlugin()],
};

module.exports = [mainConfig, preloadConfig];
