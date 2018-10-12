import React, {Fragment} from 'react';
import * as PIXI from 'pixi.js';
import classnames from 'classnames';
import css from './index.less';
import {addRes} from 'common/const/redRain/assetResources';
import PixiPacket from './components/pixiPacket';
import {redRainConst} from 'common/const/redRain';

export default class RedRain extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      countDown: 4,
      gameState: 'none' // none getReady play prize
    };
    this.newRedRain = this.newRedRain.bind(this);
    this.pixiRef = React.createRef();
    this.closeRedRain = this.closeRedRain.bind(this);
    this.playRedRain = this.playRedRain.bind(this);
  }

  componentDidMount() {
    this.loaderImg();
  }

  async loaderImg() { // pixi加载序列帧的图片
    const resource = await addRes('redRainImages');
    PIXI.loader.add(resource).load((loader, resources) => {
    });
  }

  newRedRain() {
    this.setState({
      gameState: 'getReady'
    });
    this.getReady = setInterval(() => { // 游戏开始前倒计时
      const {countDown} = this.state;
      this.setState({
        countDown: countDown - 1,
      }, () => {
        if (this.state.countDown === 0) {
          clearInterval(this.getReady);
          this.playRedRain();
        }
      });
    }, 1000);
  }

  playRedRain() {
    this.setState({
      countDown: redRainConst.gameTime,
      gameState: 'play'
    }, () => {
      this.App = new PixiPacket({
        countDown: this.state.countDown
      });
      this.pixiRef.current.appendChild(this.App.app.view);
    });

    // 红包雨的倒计时
    this.play = setInterval(() => {
      const {countDown} = this.state;
      this.setState({
        countDown: countDown - 1
      }, () => {
        if (!this.state.countDown) {
          this.pixiRef.current.removeChild(this.App.app.view);
          clearInterval(this.play);
          this.setState({
            gameState: 'prize',
            countDown: 4 // 还原
          });
        }
      });
    }, 1000);
  }

  closeRedRain() {
    this.setState({
      gameState: 'none',
    });
  }

  renderPrize() {
    const {prize, close} = redRainConst;

    return (
      <Fragment>
        <img src={prize} className={css.Prize} alt=""/>
        <img src={close} onClick={this.closeRedRain} className={css.close} alt=""/>
      </Fragment>
    );
  }

  render() {
    const {countDown, gameState } = this.state;
    const {type, startContent, redRainBut} = redRainConst;
    const isLevel = type === 'level';
    return (
      <Fragment>
        <img onClick={this.newRedRain} className={css.redRainBut} src={redRainBut} alt=""/>
        {
          gameState !== 'none' &&
          <div className={classnames(css.piXiBg, {[css.piXiBgIsLevel]: isLevel})} ref={this.pixiRef}>
            {
              (gameState === 'getReady' || gameState === 'play')
              &&
              <div className={classnames(css.time, {[css.play]: gameState === 'play'})}>
                {gameState === 'play' && <div>剩余时间</div>}
                <div>
                  0 : {countDown}
                </div>
              </div>
            }
            {gameState === 'getReady' && <img className={css.startContent} src={startContent} alt=""/>}
            {gameState === 'prize' && this.renderPrize()}
          </div>
        }
      </Fragment>
    );
  }
}