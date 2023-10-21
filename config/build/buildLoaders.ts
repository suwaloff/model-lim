import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { IBuildOptions } from './types/config';

export function buildLoaders(options: IBuildOptions): webpack.RuleSetRule[] {
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: true,
            localIdentName: options.isDev
              ? '[path][name]__[local]--[hash:base64:5]'
              : '[hash:base64:5]',
          },
        },
      },
      // Compiles Sass to CSS
      'sass-loader',
    ],
  };
  return [typescriptLoader, cssLoader];
}
