
import Ajax from 'common/utils/ajax';
import {modules} from 'modules';

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
      requireLocal().then(data => {
        // console.log('requireLocal===', data.list);
        resolve(data.list);
      });
    }
  }).catch(e => {
    console.warn('Ajax error! getGoodsList: ', e);
    requireLocal().then(data => {
      // console.log('requireLocal===', data.list);
      resolve(data.list);
    });
  });


});

function requireLocal() {
  let url = 'goodsList.json';

  switch (modules.mainType) {
    case 'sellers': {
      url = 'goodsListWithSellers.json';
      break;
    }
    case 'category': {
      url = 'goodsListWithCategory.json';
      break;
    }
  }

  return new Promise((resolve) => {
    import(`./local/${url}`).then(res => {
      resolve(res.default);
    });
  });
}