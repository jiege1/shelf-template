// __webpack_public_path__ = CFG.__publicPath__;
import React from 'react';
import ReactDom from 'react-dom';
import Layout from './layout';
import './index.less';
import 'common/utils/backDesktop';
// import vConsole from 'vconsole';


// const Vconsole = new vConsole();

ReactDom.render(
  <Layout />,
  document.getElementById('root')
);