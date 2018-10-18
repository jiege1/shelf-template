import React, {Fragment} from 'react';
import {inject, observer} from 'mobx-react';
import css from './index.less';
import PropTypes from 'prop-types';
import APP from 'common/const/app';

@inject('store')
@observer
export default class Header extends React.Component {

  static propTypes = {
    index: PropTypes.number,
  };

  static defaultProps = {
    index: 0,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const {
      logo: {src, width, height, top, left},
      header: {bg},
    } = APP.pages[this.props.index];

    const props = {
      style: {width, height, top, left},
      className: css.logoBox,
    };

    return (
      <Fragment>
        <img src={bg} alt="" className={css.headerBg}/>
        <div {...props}>
          <img src={src} alt=""/>
        </div>
      </Fragment>
    );
  }

}