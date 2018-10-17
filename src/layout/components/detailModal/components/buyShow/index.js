import React from 'react';
import PropTypes from 'prop-types';
import Danmu from 'components/Danmu';
import css from './index.less';

export default class BuyShow extends React.Component {

  static propTypes = {
    buyShow: PropTypes.string.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    let {buyShow} = this.props;
    let list = [];

    // 可能时分号隔开的字符串
    try {
      buyShow = JSON.parse(buyShow);
      list = buyShow.map(item => item.content);
    } catch (e) {
      list = buyShow.replace(/[;]|[；]/g, ';').split(';');
    }

    return (
      <div className={css.container}>
        <Danmu list={list}/>
      </div>
    );
  }
}