import React from 'react';
import * as Sentry from '@sentry/browser';

// 初始化Sentry
Sentry.init({ dsn: CFG.dns });

window.onerror = function(errorMessage, scriptURI, lineNo, columnNo, error) {
  console.log('errorMessage: ' + errorMessage); // 异常信息
  console.log('scriptURI: ' + scriptURI); // 异常文件路径
  console.log('lineNo: ' + lineNo); // 异常行号
  console.log('columnNo: ' + columnNo); // 异常列号
  console.log('error: ' + error); // 异常堆栈信息

  sendSentry({error: errorMessage, info: error});
};

export function sendSentry({error, info}) {
  console.log(error, info);
  if (info) {
    Sentry.configureScope(scope => {
      Object.keys(info).forEach(key => {
        scope.setExtra(key, info[key]);
      });
    });
  }

  Sentry.captureException(error);

  console.log(error, info);
  // todo 上报异常信息
}

export default function(Com) {
  return class extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        error: null,
        info: null,
      };
    }

    componentDidCatch(error, info) {
      this.setState({ error, info });
      sendSentry({error, info});
    }

    render() {
      const {error, info} = this.state;

      if (error) {
        return 'error';
      }

      return <Com {...this.props}/>;
    }
  };
}

