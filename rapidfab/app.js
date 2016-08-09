import 'font-awesome-webpack'
import 'rapidfab/styles/main.less'
import 'rapidfab/styles/flags.less'

import React                            from "react"
import ReactDOM                         from 'react-dom'
import { Provider }                     from 'react-redux'
import initializeStore                  from 'rapidfab/reducers/initializeStore'
import AppContainer                     from 'rapidfab/containers/app'


const App = ({ store }) => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

ReactDOM.render(
  <App store={initializeStore()}/>,
  document.getElementById("app")
)

export default App
