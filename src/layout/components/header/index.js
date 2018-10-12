import React from 'react';
import PropTypes from 'prop-types';
import css from './index.less';
import HEADER_DATA from 'common/const/header';

export default class Header extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  renderLogo() {
    const {src} = HEADER_DATA.logo;
    return (
      <div className={css.logoBox}>
        <img src={src} alt=""/>
      </div>
    );
  }

  render() {
    const {width, height} = HEADER_DATA.logo;

    const props = {
      style: {width, height}
    };
    return (
      <div {...props}>
        {this.renderLogo()}
      </div>
    );
  }

}