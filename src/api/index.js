
import Ajax from 'common/utils/ajax';
import {modules} from 'modules';
import checkData from 'api/check';

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

/**
 * 获取商品列表
 * @returns {Promise<any>}
 */
export const getGoodsList = () => new Promise((resolve) => {

  let url = modules.mainType;

  if (!url) {
    url = 'goodsList';
  }

  Ajax.query({url}).then(res => {
    if (res && res.list && res.list.length) {
      const checkedData = checkData[url](res).getJson;
      resolve(checkedData.list);
    } else {
      requireLocal().then(data => {
        const checkedData = checkData[url](data).getJson;
        resolve(checkedData.list);
      });
    }
  }).catch(e => {
    console.warn('Ajax error! getGoodsList: ', e);
    requireLocal().then(data => {
      const checkedData = checkData[url](data).getJson;
      resolve(checkedData.list);
    });
  });

});

/**
 * 结算购物车
 *
 * @param item_ids
 * @returns {Promise<any>}
 */
export function pay(item_ids) {

  // todo 成功时返回地址，失败本地拼接一个地址

  return new Promise((resolve) => {
    Ajax.query({
      url: 'pay',
      method: 'post',
      params: {item_ids}
    }).then(res => {

      console.log('pay success:', res);

      resolve('http://www.baidu.com');
    }).catch(err => {

      console.log('pay error:', err);

      resolve('');
    });
  });
}