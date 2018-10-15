import Ajax from 'common/utils/ajax';
import LocalStorage from 'common/utils/localStorage';
import moment from 'moment';

/**
 * 数据打点
 *
 * @param action    {String}  数据打点的内容
 * @param itemId      商品ID,   string or null
 * @param couponId    优惠卷ID,   string or null
 *
 * @returns {Promise<void>}
 */
export default async function({action, itemId, couponId}) {

  // 记录到本地日志
  if (itemId) {
    ele.logger.info(`商品 ${action} ${itemId}`);
  } else if (couponId) {
    ele.logger.info(`优惠卷 ${action} ${couponId}`);
  }

  const op_time = moment().format('YYYY-MM-DD HH:mm:ss');

  // 如果前面有请求 终止
  Ajax.cancel();

  if (!LocalStorage.getJSON('feedBack')) {
    LocalStorage.putJSON('feedBack', [{op_time, action, itemId, couponId}]);
  } else {
    LocalStorage.putJSON('feedBack', [...LocalStorage.getJSON('feedBack'), {op_time, action, itemId, couponId}]);
  }

  const data = await Ajax.query({
    url: 'feedBack',
    params: localStorage.getItem('feedBack'),
    header: {cancel: true},
  });

  if (data) {
    LocalStorage.clear();
  }

}