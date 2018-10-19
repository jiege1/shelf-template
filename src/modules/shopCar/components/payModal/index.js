import React from 'react';
import PropTypes from 'prop-types';
import css from './index.less';
import QRCode from 'qrcode.react';
import {Spin} from 'antd';

export default class PayModal extends React.Component {

  static propTypes = {
    shopCart: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  close() {
    this.props.shopCart.closePay();
  }

  renderQR() {
    const {payUrl} = this.props.shopCart;

    if (payUrl) {
      return <QRCode size={295} value={payUrl} />;
    }

    return <Spin size="large"/>;
  }

  render() {
    const {paying} = this.props.shopCart;

    if (!paying) return null;

    return (
      <div className={css.cover}>
        <div className={css.content}>
          <div className={css.qrBox}>
            {this.renderQR()}
          </div>
          <p className={css.notice}>
            请扫码转到淘宝<br/>
            购物车进行结算
          </p>
          <div className={css.btn} onClick={this.close.bind(this)}>再看看</div>
        </div>
      </div>
    );
  }
}