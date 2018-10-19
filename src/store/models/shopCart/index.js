
import {message} from 'antd';
import {observable, action, computed, runInAction} from 'mobx';
import Base from 'store/models/base';
import {pay} from 'api';

export default class ShopCart extends Base {

  @observable visible = false;
  // @observable menuIndex = 0; //购物车或收藏
  @observable selected = [];
  @observable goodsContainer = {};
  @observable paying = false;
  @observable payUrl = 'https://www.baidu.com';

  constructor(props) {
    super(props);
  }

  @computed get totalPrice() {
    let total = 0;
    this.selected.forEach(goodsId => {
      total += this.getGoodsPrice(goodsId);
    });
    return total;
  }

  @computed get hasSelectAll() {
    const allCartGoods = Object.keys(this.goodsContainer);
    return !!(allCartGoods.length && allCartGoods.length === this.selected.length);
  }

  getGoodsDetail(goodsId) {
    return this.parent.allGoods.find(item => item.goodsTaobaoId === goodsId);
  }

  getGoodsPrice(goodsId) {
    const goodsNum = this.goodsContainer[goodsId] || 0;
    const goods = this.getGoodsDetail(goodsId) || 0;
    const unitPrice = parseFloat(goods.price);
    return goodsNum * unitPrice;
  }

  /**
   * 添加商品数量
   * @param goodsId
   */
  @action add(goodsId) {

    const goodsHasIn = this.goodsContainer[goodsId] || 0;

    this.goodsContainer = {
      ...this.goodsContainer,
      [goodsId]: goodsHasIn + 1,
    };

  }

  /**
   * 减少商品数量
   * @param goodsId
   */
  @action reduce(goodsId) {

    const goodsHasIn = this.goodsContainer[goodsId];

    if (goodsHasIn > 1) {
      this.goodsContainer = {
        ...this.goodsContainer,
        [goodsId]: goodsHasIn - 1,
      };
    }
  }

  /**
   * 清空购物车
   */
  @action clear() {
    this.selected = [];
    this.goodsContainer = {};
  }

  /**
   * 选中单个商品
   * @param goodsId
   */
  @action triggerSelect(goodsId) {

    const goodsIdIndex = this.selected.indexOf(goodsId);

    if (goodsIdIndex > -1) {
      this.selected.splice(goodsIdIndex, 1);
    } else {
      this.selected.push(goodsId);
    }

  }

  /**
   * 全选
   */
  @action selectAll() {
    if (this.hasSelectAll) {
      this.selected = [];
    } else {
      this.selected = Object.keys(this.goodsContainer);
    }

  }

  @action async pay() {
    if (!this.selected.length) {
      message.warn('您还未选中需要结算的商品哦！');
    } else {
      this.paying = true;

      const payGoods = this.selected.map(goodsId => {
        const detail = this.getGoodsDetail(goodsId);
        const num = this.goodsContainer[goodsId] || 0;
        let skuId = 0;

        if (detail.skusMapKeys.length) {
          skuId = detail.skusMapKeys[0].skuId;
        }

        return `${goodsId}_${skuId}_${num}`;
      });

      const data = await pay(payGoods.join(','));

      runInAction(() => {
        this.payUrl = data;
      });

    }
  }

  @action closePay() {
    this.paying = false;
    this.payUrl = '';
  }

}