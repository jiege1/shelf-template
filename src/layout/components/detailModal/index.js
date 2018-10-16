import React from 'react';
import PropTypes from 'prop-types';
import css from './index.less';
import ScrollArea from 'components/scrollArea';
import MAIN from 'common/const/main';
import Detail from './components/detail';
import BuyShow from './components/buyShow';

export default class DetailModal extends React.Component {

  static propTypes = {
    goods: PropTypes.object.isRequired,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    onClose: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }


  renderDescription() {
    const {customDescription} = this.props.goods;

    const descriptionImgs = customDescription.replace(/[，]|[;]|[；]/g, ',').split(',');

    return (
      <ScrollArea className={css.scroll}>
        {
          descriptionImgs.map((url, index) => <img key={`desc_${index}`} src={url} alt=""/>)
        }
      </ScrollArea>
    );

  }

  render() {
    const {goods: {buyShow, ...other}, onClose} = this.props;
    const {src, ...styles} = MAIN.detail.closeImg;
    const closeProps = {
      className: css.close,
      style: styles,
      onClick: onClose,
    };
    return (
      <div className={css.wrapper}>
        <div className={css.content}>
          <div className={css.left}>
            <Detail goods={other}/>
            <BuyShow buyShow={buyShow}/>
          </div>
          <div className={css.right}>
            {this.renderDescription()}
          </div>
        </div>
        <div {...closeProps}>
          <img src={src} alt=""/>
        </div>
      </div>
    );
  }
}