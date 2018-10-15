import React from 'react';
import css from './index.less';
// import errorLog from 'components/errorLog';
import Header from './components/header';
import Main from './components/main';
// import RedRain from './components/redRain';
import Loading from './components/loading';
import {loadModules} from 'modules';

// @errorLog
export default class Layout extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    loadModules().then(res => {
      this.setState({
        loading: false,
      });
    });
  }

  render() {

    if (this.state.loading) {
      return <Loading />;
    }

    const Modules = Object.values(window.shelfModules);

    return (
      <div className={css.layout}>
        <Header />
        <Main />
        {Modules.map((Module, index) => <Module key={`module${index}`}/>)}
      </div>
    );
  }
}