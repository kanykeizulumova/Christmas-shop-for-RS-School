const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    entry: {
      index: './index.js',
      gifts: './gifts.js',
    },

    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      assetModuleFilename: 'assets/[hash][ext][query]',
    },

    devServer: {
      static: './dist',
      port: 3002,
      hot: true,
      open: true,
    },

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        chunks: ['index'],
      }),
      new HtmlWebpackPlugin({
        template: './gifts.html',
        filename: 'gifts.html',
        chunks: ['gifts'],
      }),
      ...(isDev
        ? []
        : [
            new MiniCssExtractPlugin({
              filename: '[name].[contenthash].css',
            }),
          ]),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'assets',
            to: 'assets',
            noErrorOnMissing: true,
          },
          {
            from: 'gifts.json',
            to: 'gifts.json',
          },
        ],
      }),
    ],

    devtool: isDev ? 'eval-source-map' : 'source-map',
  };
};
