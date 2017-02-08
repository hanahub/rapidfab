import React                    from 'react'
import * as BS                  from 'react-bootstrap'
import Grid, {
} from 'rapidfab/components/grid'

const Home = ({}) => (
  <BS.Grid fluid>
    <BS.Row>
      <BS.Alert bsStyle="danger" className="error-alert">
        <p>This is a test error. It is only a test</p>
      </BS.Alert>
    </BS.Row>
  </BS.Grid>
)

export default Home
