import axios from 'axios';
import Utils from 'common/utils';

/**
 * Ajax.query({url, params, method = 'get'})
 *
 */
export default class Ajax {

  static query({url, params = {}, method = 'get', successLabel = null}) {

    const api = eval('CFG.api.' + url);

    params = {
      ...params,
    };

    if (method === 'get') {
      params = {params};
    }

    return new Promise((resolve, reject) => {
      axios[method](api, params).then(res => {
        const {data, code, msg} = res.data;
        if (!code && data) {
          resolve(data);
        }
        reject({code, msg, data: null});
      }).catch(err => {
        reject(err);
      });
    });

  }
}