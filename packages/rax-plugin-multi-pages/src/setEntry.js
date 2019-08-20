const path = require('path');
const { hmrClient } = require('rax-compile-config');

const MulitPageLoader = require.resolve('./MulitPageLoader');

function getDepPath(rootDir, com) {
  if (com[0] === '/') {
    return path.join(rootDir, 'src', com);
  } else {
    return path.resolve(rootDir, 'src', com);
  }
};

module.exports = (config, context, entries, type) => {
  const { rootDir, command, userConfig } = context;
  const { plugins } = userConfig;
  const isDev = command === 'dev';

  config.entryPoints.clear();

  entries.forEach(({ entryName, component }) => {
    const entryConfig = config.entry(entryName);
    if (isDev && !~plugins.indexOf('rax-plugin-ssr')) {
      entryConfig.add(hmrClient);
    }

    const pageEntry = getDepPath(rootDir, component);
    entryConfig.add(`${MulitPageLoader}?type=${type}!${pageEntry}`);
  });
};
