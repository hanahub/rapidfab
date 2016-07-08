import 'rapidfab/styles/main.less';

import * as URL                         from 'rapidfab/actions/url';

import React, { Component }             from "react";
import ReactDOM                         from 'react-dom';

import Routes                           from 'rapidfab/routes';

import { IntlProvider }                 from 'react-intl';
import i18n                             from 'rapidfab/i18n';
import Navbar                           from 'rapidfab/components/navbar';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: {
        location: {
          hash: this.props.hash
        }
      },
      i18n: {
        locale: this.props.locale,
        messages: i18n[this.props.locale].messages
      }
    };
  }

  componentWillMount() {
    window.onhashchange = event => {
      if(!event) return;
      URL.change(event.oldURL, event.newURL || window.location.hash);
    }
  }

  render() {
    return (
      <IntlProvider
        locale={this.state.i18n.locale}
        messages={this.state.i18n.messages}
      >
        <div>
          <Navbar />
          <Routes {...this.state}/>
        </div>
      </IntlProvider>
    );
  }
}

ReactDOM.render(
  <App locale={navigator.language} hash={window.location.hash}/>,
    document.getElementById("app")
);
