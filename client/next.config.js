module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
// Note!
// Next does not detect new config changes automatically,
// Then you have to "kubectl delete"(recreate the pod) to reflect it
