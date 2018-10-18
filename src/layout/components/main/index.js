import React from 'react';
import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';
import css from './index.less';
import MAIN from 'common/const/main';
import Scroller from 'components/scroller';
import GoodsCard from './components/goodsCard';

@inject('store')
@observer
export default class Main extends React.Component {

  static propTypes = {
    goodsList: PropTypes.array,
  };

  static defaultProps = {
    goodsList: [],
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderGoodsList() {

    const {padding, scrollPaddingTop} = MAIN.goodsList;
    const {goodsList, store} = this.props;

    const props = {
      className: css.listBox,
      style: {
        padding,
        paddingTop: scrollPaddingTop + padding,
      }
    };
    return (
      <div {...props}>
        {
          goodsList.map((goods, index) => {
            const goodsProps = {
              goods,
              key: `${goods.goodsTaobaoId}_${index}`,
              onClickItem: () => {
                store.showGoodsDetail(goods);
              },
              onAddCart: (goodsId) => {
                store.shopCart.add(goodsId);
              },
            };
            return <GoodsCard {...goodsProps}/>;
          })
        }
      </div>
    );
  }

  render() {
    const {paddingTop} = MAIN.goodsList;
    const scrollHeight = document.documentElement.clientHeight - paddingTop;

    const props = {
      className: css.mainContainer,
      style: {
        height: scrollHeight,
        paddingTop,
      },
    };
    return (
      <div {...props}>
        <Scroller height={scrollHeight}>
          {this.renderGoodsList()}
        </Scroller>
      </div>
    );
  }
}