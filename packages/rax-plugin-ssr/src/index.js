const SSRDevServer = require('rax-ssr-dev-server');

const getSSRBase = require('./ssr/getBase');
const setSSRBuild = require('./ssr/setBuild');
const setSSRDev = require('./ssr/setDev');

const setWebDev = require('./web/setDev');

// can‘t clone webpack chain object
module.exports = ({ chainWebpack, registerConfig, setDevServer, context }) => {
  const { command } = context;
  const ssrConfig = getSSRBase(context);
  registerConfig('ssr', ssrConfig);

  chainWebpack((config) => {
    if (command === 'build') {
      setSSRBuild(config.getConfig('ssr'), context);
    }

    if (command === 'dev') {
      setSSRDev(config.getConfig('ssr'), context);
      setWebDev(config.getConfig('web'), context);

      setDevServer(SSRDevServer);
    }
  });
};
