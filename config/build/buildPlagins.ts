import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { type IBuildOptions } from './types/config';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export function buildPlagins(options: IBuildOptions): webpack.WebpackPluginInstance[] {
  const { paths, isDev, project } = options;

  const plugin = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),

    new webpack.ProgressPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),

    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __PROJECT__: JSON.stringify(project),
    }),
  ];

  if (isDev) {
    plugin.push(new webpack.HotModuleReplacementPlugin());

    plugin.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
      })
    );

    plugin.push(new ForkTsCheckerWebpackPlugin());
  }

  return plugin;
}
