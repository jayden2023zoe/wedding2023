const path = require('path');
const sassLoader = require('sass-loader');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const rules = webpackConfig.module.rules;

      // find the rule that handles CSS files
      const cssRule = rules.find((rule) => rule.test.toString().includes('css'));

      // add the SCSS rule before the CSS rule
      rules.splice(
        rules.indexOf(cssRule),
        0,
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }
      );

      return webpackConfig;
    }
  },
  resolve: {
    fallback: {
      fs: require.resolve('fs'),
      path: require.resolve('path'),
      os: require.resolve('os')
    },
  }
};
