import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { type IBuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildPlagins (
  options: IBuildOptions
): webpack.WebpackPluginInstance[] {
  const { paths, isDev } = options;
  return [
    new HtmlWebpackPlugin({
      template: paths.html
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),

    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev)
    }),

    new webpack.HotModuleReplacementPlugin()
  ];
}
