import type webpack from 'webpack';
import { type IBuildOptions } from './types/config';
import { builCssLoader } from './loaders/buildCssLoader';

export function buildLoaders(options: IBuildOptions): webpack.RuleSetRule[] {
  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const cssLoader = builCssLoader(options.isDev);

  return [typescriptLoader, cssLoader, svgLoader, fileLoader];
}
