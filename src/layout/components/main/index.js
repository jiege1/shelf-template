import React from 'react';
import PropTypes from 'prop-types';
import css from './index.less';
import MAIN from 'common/const/main';
import Scroller from 'components/scroller';
import GoodsCard from './components/goodsCard';
// import DetailModal from './components/detailModal';
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
    this.state = {
      // goodsList: [],
      detail: null,
    };
  }

  // async componentDidMount() {
  //   const goodsList = await getGoodsList();
  //   this.setState({
  //     goodsList: goodsList,
  //   });
  // }

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
          goodsList.map(goods => {
            const goodsProps = {
              key: goods.goodsTaobaoId,
              goods,
              onClickItem: () => {
                onGoodsClick(goods);
                // this.setState({
                //   detail: goods,
                // });
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
    // const {detail} = this.state;
    const {paddingTop} = MAIN.goodsList;
    const scrollHeight = document.documentElement.clientHeight - paddingTop;

    const props = {
      className: css.mainContainer,
      style: {
        height: scrollHeight,
        paddingTop,
      },
    };
    // const modalProps = {
    //   goods: detail,
    //   onClose: () => {
    //     this.setState({
    //       detail: null,
    //     });
    //   },
    // };
    return (
      <div {...props}>
        <Scroller height={scrollHeight}>
          {this.renderGoodsList()}
        </Scroller>
        {/*{detail && <DetailModal {...modalProps}/>}*/}
      </div>
    );
  }
}