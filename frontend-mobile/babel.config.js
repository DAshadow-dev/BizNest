module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.js', '.ts', '.tsx', '.json'],
          alias: {
            '@src': './src',
            '@components': './src/components',
            '@redux': './src/redux',
            '@screens': './src/screens',
            '@utils': './src/utils',
            '@libs': './src/libs',
            '@requestComponent': './src/screens/request/component',
            '@assets': './assets',
          },
        },
      ],
    ],
  };
};
