const config = (api) => {
  api.cache(true);

  return {
    presets: [
      ['@babel/preset-env', {
        targets: {
          //node: 10,
        },
      }],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    env: {
      test: {
        plugins: [
          '@babel/plugin-transform-runtime',
        ],
      },
    },
  };
};

module.exports = config;