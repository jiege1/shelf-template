
import Ajax from 'common/utils/ajax';

import defaultGoodsList from './local/goodsList';

/**
 * 获取商品列表
 * @returns {Promise<any>}
 */
export const getGoodsList = () => new Promise((resolve) => {

  // todo 数据过滤和处理

  Ajax.query({
    url: 'goodsList',
  }).then(res => {
    if (res && res.list && res.list.length) {
      resolve(res.list);
    } else {
      resolve(defaultGoodsList.list);
    }
  }).catch(e => {
    console.warn('Ajax error! getGoodsList: ', e);
    resolve(defaultGoodsList.list);
  });
});