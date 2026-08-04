const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const { library } = require('webpack');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/libs/graphql'),
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/index.ts',
      tsConfig: './tsconfig.lib.json',
      optimization: false,
      outputHashing: 'none',
    }),
  ],
};
