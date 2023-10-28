export type BuildMode = 'production' | 'development';

export interface IBasePath {
  entry: string;
  build: string;
  html: string;
  src: string;
}

export interface IBuildOptions {
  mode: BuildMode;
  paths: IBasePath;
  port: number;
  isDev: boolean;
}

export interface IBuildEnv {
  mode: BuildMode;
  port: number;
}
