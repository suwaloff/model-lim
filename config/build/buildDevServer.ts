import { type IBuildOptions } from './types/config';
import { type Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { $api } from 'shared/api/api';

export function buildDevServer(option: IBuildOptions): DevServerConfiguration {
  return {
    port: option.port,
    open: true,
    historyApiFallback: true,
    hot: true,
  };
}
