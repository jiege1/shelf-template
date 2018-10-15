import React from 'react';
import css from './index.less';
// import errorLog from 'components/errorLog';
import Header from './components/header';
import Main from './components/main';
import APP from 'common/const/app';
import {loadModules, modules} from 'modules';
import Slider from 'react-slick';
import 'react-slick/lib/index.min.css';
import {getGoodsList} from 'api';

// @errorLog
export default class Layout extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      goodsList: [],
      selectType: modules.mainType === 'category' ? -1 : 0,
      isTouching: false,
    };

    this.sliderRef = React.createRef();
  }

  async componentDidMount() {

    // 请求数据
    const goodsList = await getGoodsList();
    this.setState({
      goodsList: goodsList,
    });

    // 加载模块
    loadModules().then(() => {
      this.setState({
        loading: false,
      });
    });
  }

  onMoreTypeClick(index) {
    // 轮播切换
    switch (modules.mainType) {
      case 'sellers': {
        this.sliderRef.current.slickGoTo(index);
        break;
      }
      case 'category': {
        // todo category
        break;
      }
    }

    this.setState({
      selectType: index,
    });

  }

  renderModules() {
    const {loading, goodsList, selectType} = this.state;
    if (loading) return null;

    const ModuleKeys = Object.keys(window.shelfModules) || [];

    return ModuleKeys.map(key => {
      const Module = window.shelfModules[key];

      let props = {
        key: `module_${key}`,
      };

      // 不同模块，补充props
      switch (key) {
        case 'mainType': {
          props = {
            ...props,
            classify: goodsList.map(item => item.classify),
            mainType: modules.mainType,
            classifyIndex: selectType,
            getClassifyIndex: this.onMoreTypeClick.bind(this),
          };
          break;
        }
      }

      return <Module {...props}/>;
    });
  }


  /**
   * 多商家，采用轮播来展示
   */
  renderSwipeSellers() {
    const {goodsList} = this.state;

    const props = {
      className: css.swiper,
      ref: this.sliderRef,
      autoplay: true,
      dots: false,
      arrows: false,
      autoplaySpeed: 10000,
      beforeChange: (oldIndex, newIndex) => {
        this.setState({
          selectType: newIndex,
        });
      },
    };

    return (
      <div className={css.layoutWithSwiper}>
        <Slider {...props}>
          {
            goodsList.map(item => {

              const pageProps = {
                key: item.classify,
                className: css.page,
                onTouchMove: () => {
                  this.sliderRef.current.slickPlay();
                },
                onTouchEnd: () => {
                  this.sliderRef.current.slickPause();
                }
              };

              return (
                <div {...pageProps}>
                  <img src={APP.pages[0].bg} alt="" className={css.bg}/>
                  <Header />
                  <Main goodsList={item.item}/>
                </div>
              );
            })
          }
        </Slider>
        {this.renderModules()}
      </div>

    );
  }

  /**
   * 单个商家
   *
   * @returns {*}
   */
  renderOneSeller() {
    let {goodsList, selectType} = this.state;

    // 单个商家， 存在分类的话, 过滤数据
    if (goodsList && goodsList.length && modules.mainType === 'category') {
      if (selectType === -1) {
        let allGoods = [];
        goodsList.forEach(item => {
          allGoods = allGoods.concat(item.item);
        });
        goodsList = allGoods;
      } else {
        goodsList = goodsList[selectType].item;
      }
    }

    return (
      <div className={css.layout}>
        <img src={APP.pages[0].bg} alt="" className={css.bg}/>
        <Header />
        <Main goodsList={goodsList}/>
        {this.renderModules()}
      </div>
    );
  }

  render() {

    // 多商家时， 渲染轮播
    if (modules.mainType === 'sellers') {
      return this.renderSwipeSellers();
    }

    return this.renderOneSeller();
  }
}