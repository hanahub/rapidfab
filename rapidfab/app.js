import 'rapidfab/app.scss';

import React, { Component }     from "react";
import ReactDOM                 from 'react-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        App
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById("container"));
