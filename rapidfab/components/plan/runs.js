import React, { PropTypes }                   from "react";
import * as BS                                from 'react-bootstrap';
import Fa                                     from 'react-fontawesome';
import { FormattedMessage }                   from 'react-intl';
import Grid, {
  IdColumn,
  CapitalizeColumn,
  DateColumn
} from 'rapidfab/components/grid';


const Runs = ({ runs }) => (
  <BS.Grid fluid>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item>
            <Fa name='road'/> <FormattedMessage id="plan" defaultMessage='Plan'/>
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/plan/runs">
            <Fa name='list'/> <FormattedMessage id="plan.runs" defaultMessage='Runs'/>
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button bsStyle="primary" bsSize="small" href="#/records/run" className="pull-right">
          <Fa name='plus'/> <FormattedMessage id="record.run.add" defaultMessage='Add Run'/>
        </BS.Button>
      </BS.Col>
    </BS.Row>

    <hr/>

    <BS.Row>
      <BS.Col xs={12}>
        <Grid
          data={runs}
          columns={[
            "id",
            "name",
            "status",
            "created"
          ]}
          columnMeta={[{
            displayName: <FormattedMessage id="field.id" defaultMessage='Id'/>,
            columnName: "id",
            customComponent: IdColumn("order"),
            locked: true
          }, {
            columnName: "name",
            displayName: <FormattedMessage id="field.name" defaultMessage='Name'/>
          }, {
            columnName: "status",
            displayName: <FormattedMessage id="field.status" defaultMessage='Status'/>,
            customComponent: CapitalizeColumn
          }, {
            customComponent: DateColumn,
            columnName: "created",
            displayName: <FormattedMessage id="field.created" defaultMessage='Created'/>
          }]}
        />
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

export default Runs
