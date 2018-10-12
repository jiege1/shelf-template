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
    buyShow = JSON.parse(buyShow);
    const props = {
      list: buyShow.map(item => item.content),
    };
    return (
      <div className={css.container}>
        <Danmu {...props}/>
      </div>
    );
  }
}