import React from 'react';
import PropTypes from 'prop-types';
import css from './index.less';
import MAIN from 'common/const/main';

export default class GoodsCard extends React.Component {

  static propTypes = {
    goods: PropTypes.object.isRequired,
    onClickItem: PropTypes.func,
  };

  static defaultProps = {
    onClickItem: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const {card} = MAIN.goodsList;
    const {goods: {picUrl, customTitle, title}, onClickItem} = this.props;

    const width = card.width - 2 * card.padding;

    const props = {
      className: css.card,
      style: {
        ...card,
        width,
      },
      onClick: onClickItem,
    };


    return (
      <div {...props}>
        <div className={css.picBox}>
          <img src={picUrl} alt=""/>
        </div>
        <div className={css.titleBox}>
          {customTitle ? customTitle : title}
        </div>
      </div>
    );
  }
}