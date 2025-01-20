
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  assets: {
    'index.csr.html': {size: 5322, hash: '6ba0ce2fff98048e8bb694d65d664359831f71acf16978d3adf09892a5b608c9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2349, hash: 'f76f4d34e3f659b35864a6c0ea0c0a591d5a5042b54de2c310fe7d70842affde', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-WZ2IOCQ3.css': {size: 60322, hash: 'MgWNqBOL5Tc', text: () => import('./assets-chunks/styles-WZ2IOCQ3_css.mjs').then(m => m.default)}
  },
};
