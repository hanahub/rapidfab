import React, { PropTypes, Component }        from "react"
import _                                      from "lodash"
import * as BS                                from 'react-bootstrap'
import Fa                                     from 'react-fontawesome'
import { FormattedMessage, FormattedDate }    from 'react-intl'
import Grid, {
  ImageColumn,
  CapitalizeColumn,
  DateColumn,
  BooleanColumn,
  VolumeColumn
} from 'rapidfab/components/grid';


export default class PrintQueues extends Component {
  render() {
    return (
      <BS.Grid>
        <BS.Row>
          <BS.Col xs={12}>
            <BS.Breadcrumb>
              <BS.Breadcrumb.Item href="#/plan">
                <Fa name='road'/> <FormattedMessage id="plan" defaultMessage='Plan'/>
              </BS.Breadcrumb.Item>
              <BS.Breadcrumb.Item href="#/plan/runs">
                <Fa name='code-fork'/> <FormattedMessage id="plan.PrintQueues" defaultMessage='Print Queues'/>
              </BS.Breadcrumb.Item>
            </BS.Breadcrumb>
          </BS.Col>
        </BS.Row>

        <BS.Row>
          <BS.Col xs={12}>
          </BS.Col>
        </BS.Row>

        <hr/>

        <BS.Row>
          <BS.Col xs={12}>
          </BS.Col>
        </BS.Row>
      </BS.Grid>
    );
  }
}

export default PrintQueues
