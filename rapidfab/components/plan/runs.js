import React, { PropTypes, Component }        from "react";
import _                                      from "lodash";
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

class EditColumn extends Component {
    constructor(props) {
      super(props);
      this.handleEdit = this.handleEdit.bind(this);
    }
    handleEdit(e) {
      this.props.metadata.onEdit(e, this.props.data, this.props.rowData);
    }
    render() {
      return (
        <BS.Button bsStyle="success" bsSize="small" onClick={this.handleEdit}>
          <Fa name='arrow-right'/>
        </BS.Button>
      );
    }
}

export default class Runs extends Component {
  constructor(props) {
    super(props);
    this.state = {orderList : []};
    this.handleAdd = this.handleAdd.bind(this);
    this.handleOrderList = this.handleOrderList.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleAdd(e, data, rowData) {
    this.setState({
      orderList: _.concat(this.state.orderList, [data])
    });
  }

  handleOrderList() {
    return _.map(this.state.orderList, orderUuid => (
      <BS.Col key={orderUuid} xs={4}>
        <span> Order: {this.props.records[orderUuid].order}</span>
        <img src="https://placehold.it/125x75"/>
      </BS.Col>
    ));
  }

  handleReset() {
    this.setState({
      orderList: []
    });
  }

  render() {
    let records = _.omit(this.props.records, this.state.orderList)
    let fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 7);
    let toDate = new Date();
    return (
      <BS.Grid>
        <BS.Row>
          <BS.Col xs={6}>
            <BS.Breadcrumb>
              <BS.Breadcrumb.Item>
                <Fa name='road'/> <FormattedMessage id="plan" defaultMessage='Plan'/>
              </BS.Breadcrumb.Item>
              <BS.Breadcrumb.Item href="#/plan/runs">
                <Fa name='list'/> <FormattedMessage id="plan.Runs" defaultMessage='Runs'/>
              </BS.Breadcrumb.Item>
            </BS.Breadcrumb>
          </BS.Col>
        </BS.Row>

        <BS.Row>
          <BS.Col xs={6} xsOffset={6}>
            <BS.ButtonToolbar className="pull-right">
              <BS.Button bsSize="small" bsStyle="danger" onClick={this.handleReset}>
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
          <BS.Col xs={2} xsOffset={1}>
            <h4> {this.state.orderList.length * 10}% </h4>
          </BS.Col>
        </BS.Row>

        <BS.Row>
          <BS.Col xs={6}>
            <Grid
              data={_.values(records)}
              columns={[
                "orderSnapshot",
                "order",
                "material",
                "color",
                "et",
                "volume",
                "uuid",
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
              }, {
                order: 999,
                columnName: "uuid",
                visible: true,
                locked: true,
                sortable: false,
                onEdit: this.handleAdd,
                displayName: "Add",
                customComponent: EditColumn,
              }]}
            />
          </BS.Col>
          <BS.Col xs={6}>
            <BS.Row>
              {this.handleOrderList()}
            </BS.Row>
          </BS.Col>
        </BS.Row>
      </BS.Grid>
    );
  }
}

export default Runs
