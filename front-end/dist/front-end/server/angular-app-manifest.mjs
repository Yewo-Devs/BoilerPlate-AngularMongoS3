
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  assets: {
    'index.csr.html': {size: 5350, hash: '59fe0ed6ce1b366aa6486b8de3d168a613e50522a9e40ac620699e26d60cd1e5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2375, hash: '6915fd3a469f17f021775ac7fce5155dcb1140bf69114c1fc3a3d65c39154c13', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-WZ2IOCQ3.css': {size: 60322, hash: 'MgWNqBOL5Tc', text: () => import('./assets-chunks/styles-WZ2IOCQ3_css.mjs').then(m => m.default)}
  },
};
