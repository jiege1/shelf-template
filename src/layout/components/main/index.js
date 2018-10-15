import React from 'react';
import PropTypes from 'prop-types';
import css from './index.less';
import HEADER from 'common/const/header';
import MAIN from 'common/const/main';
import Scroller from 'components/scroller';
import GoodsCard from './components/goodsCard';
import DetailModal from './components/detailModal';
import feedBack from 'common/utils/feedBack';
import {getGoodsList} from 'api';


export default class Main extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      detail: null,
    };
  }

  async componentDidMount() {
    const goodsList = await getGoodsList();
    this.setState({
      goodsList: goodsList,
    });
  }

  renderGoodsList() {

    const {padding} = MAIN.goodsList;
    const {goodsList} = this.state;
    const props = {
      className: css.listBox,
      style: {
        padding,
      }
    };
    return (
      <div {...props}>
        {
          goodsList.map(goods => {
            const goodsProps = {
              key: goods.goodsTaobaoId,
              goods,
              onClickItem: () => {
                this.setState({
                  detail: goods,
                });
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
    const {detail} = this.state;
    const scrollHeight = document.documentElement.clientHeight - HEADER.logo.height;

    const props = {
      className: css.mainContainer,
      style: {
        height: scrollHeight,
      },
    };
    const modalProps = {
      goods: detail,
      onClose: () => {
        this.setState({
          detail: null,
        });
      },
    };
    return (
      <div {...props}>
        <img src={MAIN.goodsList.background} alt="" className={css.bg}/>
        <Scroller height={scrollHeight}>
          {this.renderGoodsList()}
        </Scroller>
        {detail && <DetailModal {...modalProps}/>}
      </div>
    );
  }
}