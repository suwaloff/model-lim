import type webpack from 'webpack';
import path from 'path';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { type IBasePath, type IBuildEnv } from './config/build/types/config';

export default (env: IBuildEnv) => {
  const paths: IBasePath = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  };

  const PORT = env.port || 3000;
  const mode = env.mode || 'development';
  const isDev = mode === 'development';

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    port: PORT,
    isDev,
    project: 'frontend',
  });

  return config;
};
