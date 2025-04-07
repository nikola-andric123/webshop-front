module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        // Add a fallback for the "path" module using path-browserify
        webpackConfig.resolve.fallback = {
          ...webpackConfig.resolve.fallback,
          path: require.resolve("path-browserify"),
          fs: false,
        };
        return webpackConfig;
      },
    },
  };