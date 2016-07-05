import 'rapidfab/app.scss';

import * as URL from 'rapidfab/actions/url';

import React, { Component }     from "react";
import ReactDOM                 from 'react-dom';

import Routes             from 'rapidfab/routes';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: {
        location: {
          hash: window.location.hash
        }
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
      <Routes {...this.state}/>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById("container"));
