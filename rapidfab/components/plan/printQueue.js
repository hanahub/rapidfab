import React, { PropTypes }                   from "react";
import * as BS                                from 'react-bootstrap';
import Fa                                     from 'react-fontawesome';
import { FormattedMessage, FormattedDate }                   from 'react-intl';
import Grid, {
  ImageColumn,
  CapitalizeColumn,
  DateColumn,
  BooleanColumn,
  VolumeColumn
} from 'rapidfab/components/grid';


const IdColumn = ({ data, rowData }) => (
  <a href={`#/records/order/${encodeURIComponent(rowData.uuid)}`}>
    {data}
  </a>
)

const PrintQueue = ({ records }) => (
  <BS.Grid>

    <BS.Row>
      <BS.Col xs={6}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item href="#/plan">
            <Fa name='road'/> <FormattedMessage id="plan" defaultMessage='Plan'/>
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/plan/print-queue">
            <Fa name='files-o'/> <FormattedMessage id="plan.printQueue" defaultMessage='Print Queue'/>
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={6} xsOffset={6}>
        <BS.ButtonToolbar className="pull-right">
          <BS.Button bsSize="small" bsStyle="danger">
            <FormattedMessage id="button.reset" defaultMessage='Reset'/>
          </BS.Button>
          <BS.Button bsSize="small" bsStyle="primary">
            <FormattedMessage id="button.save" defaultMessage='Save'/>
          </BS.Button>
        </BS.ButtonToolbar>
      </BS.Col>
    </BS.Row>

    <hr/>

    <BS.Row>
      <BS.Col xs={5} xsOffset={1}>
        <form className="form-inline date-range">
          <BS.Input type="date"/>
          -
          <BS.Input type="date"/>
        </form>
      </BS.Col>
      <BS.Col xs={3}>
        <BS.FormGroup controlId="uxPrinter">
          <BS.FormControl componentClass="select" placeholder="select">
            <option value="select">Printer</option>
            <option value="other">...</option>
          </BS.FormControl>
        </BS.FormGroup>
      </BS.Col>
      <BS.Col xs={2} xsOffset={1}>
        <h4> 30% </h4>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={6}>
        <Grid
          data={records}
          columns={[
            "orderSnapshot",
            "order",
            "material",
            "color",
            "et",
            "volume",
          ]}
          columnMeta={[{
            customComponent: ImageColumn,
            columnName: "orderSnapshot",
            displayName: <FormattedMessage id="field.order" defaultMessage='Order'/>
          }, {
            customComponent: CapitalizeColumn,
            columnName: "order",
            displayName: <FormattedMessage id="field.order" defaultMessage='Order'/>
          }, {
            customComponent: CapitalizeColumn,
            columnName: "material",
            displayName: <FormattedMessage id="field.material" defaultMessage='Material'/>
          }, {
            customComponent: CapitalizeColumn,
            columnName: "color",
            displayName: <FormattedMessage id="field.color" defaultMessage='Color'/>
          }, {
            customComponent: DateColumn,
            columnName: "et",
            displayName: <FormattedMessage id="field.et" defaultMessage='ET'/>
          }, {
            customComponent: VolumeColumn,
            columnName: "volume",
            displayName: <FormattedMessage id="field.volume" defaultMessage='Volume'/>
          }]}
        />
      </BS.Col>
      <BS.Col xs={6}>
        <BS.Row>
          <BS.Col xs={5} xsOffset={1}>
            <form className="form-inline date-range">
              <BS.FormControl type="text" defaultValue={`${fromDate.getMonth()}/${fromDate.getDate()}/${fromDate.getFullYear()}`} />
              -
              <BS.FormControl type="text" defaultValue={`${toDate.getMonth()}/${toDate.getDate()}/${toDate.getFullYear()}`} />
            </form>
          </BS.Col>
          <BS.Col xs={3}>
            <BS.FormGroup controlId="uxPrinter">
              <BS.FormControl componentClass="select" placeholder="select">
                <option value="select">Printer</option>
                <option value="other">...</option>
              </BS.FormControl>
            </BS.FormGroup>
          </BS.Col>
          <BS.Col xs={4}>
            <span> Order # 123 </span>
            <img src="https://placekitten.com/125/75"/>
          </BS.Col>
        </BS.Row>
      </BS.Col>
    </BS.Row>
  </BS.Grid>
);

export default PrintQueue
