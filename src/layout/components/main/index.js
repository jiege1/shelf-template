import React from 'react';
import PropTypes from 'prop-types';
import css from './index.less';
import MAIN from 'common/const/main';
import Scroller from 'components/scroller';
import GoodsCard from './components/goodsCard';
import feedBack from 'common/utils/feedBack';


export default class Main extends React.Component {

  static propTypes = {
    goodsList: PropTypes.array,
    onGoodsClick: PropTypes.func,
  };

  static defaultProps = {
    goodsList: [],
    onGoodsClick: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderGoodsList() {

    const {padding} = MAIN.goodsList;
    const {goodsList, onGoodsClick} = this.props;
    const props = {
      className: css.listBox,
      style: {
        padding,
      }
    };
    return (
      <div {...props}>
        {
          goodsList.map((goods, index) => {
            const goodsProps = {
              key: `${goods.goodsTaobaoId}_${index}`,
              goods,
              onClickItem: () => {
                onGoodsClick(goods);
                feedBack({
                  action: '点击商品，查看详情',
                  itemId: goods.goodsTaobaoId,
                });
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