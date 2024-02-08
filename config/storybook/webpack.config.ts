import webpack, { RuleSetRule, DefinePlugin } from 'webpack';
import path from 'path';
import { IBasePath } from '../build/types/config';
import { builCssLoader } from '../build/loaders/buildCssLoader';

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: IBasePath = {
    build: '',
    entry: '',
    html: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
  };
  config.resolve!.modules!.push(paths.src);
  config.resolve!.extensions!.push('.tsx', '.ts');
  config.module!.rules!.push(builCssLoader(true));

  config.module!.rules = config.module!.rules!.map(
    //@ts-ignore
    (rule: RuleSetRule) => {
      if (/svg/.test(rule.test as string)) {
        return { ...rule, exclude: /\.svg$/i };
      }
      return rule;
    }
  );

  config.module?.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });

  config!.plugins!.push(
    new DefinePlugin({
      __IS_DEV__: JSON.stringify(true),
      __API__: JSON.stringify(''),
    })
  );
  return config;
};
