import React, { PropTypes, Component }        from "react"
import _                                      from "lodash"
import * as BS                                from 'react-bootstrap'
import Fa                                     from 'react-fontawesome'
import { FormattedMessage, FormattedDate }    from 'react-intl'
import Grid, {
  IdColumn,
  CapitalizeColumn,
} from 'rapidfab/components/grid';
import PrintersList                           from './printersList'
import PrintsList                             from './printsList'
import ActivePrints                           from './activePrints'
import BedLayout                              from './bedLayout'


class Runs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPrinter: _.head(_.values(props.printers)),
      selectedPrints: [],
      activePrintsSelected: [],
      activePrints: [],
    }

    this.handleSelectPrinter = this.handleSelectPrinter.bind(this);
    this.handleSelectPrint = this.handleSelectPrint.bind(this);
    this.handleActivatePrints = this.handleActivatePrints.bind(this);
    this.handleSelectActivePrint = this.handleSelectActivePrint.bind(this);
    this.handleDeactivatePrints = this.handleDeactivatePrints.bind(this);
  }

  componentWillReceiveProps(props) {
    let selectedPrinter = this.state.selectedPrinter
    if(selectedPrinter && !this.props.printers[selectedPrinter.uuid]) {
      selectedPrinter = _.head(_.values(this.props.printers))
      this.setState({ selectedPrinter })
    }
  }

  handleSelectPrinter(printer) {
    this.setState({
      selectedPrinter: printer
    })
  }

  handleSelectPrint(print) {
    if(_.find(this.state.selectedPrints, ['uri', print.uri])) {
      this.setState({
        selectedPrints: _.filter(this.state.selectedPrints, selectedPrint => selectedPrint.uri !== print.uri)
      })
    } else {
      this.setState({
        selectedPrints: _.unionBy(this.state.selectedPrints, [print], 'uri')
      })
    }
  }

  handleSelectActivePrint(print) {
    if(_.find(this.state.activePrintsSelected, ['uri', print.uri])) {
      this.setState({
        activePrintsSelected: _.filter(this.state.activePrintsSelected, activePrintSelected => activePrintSelected.uri !== print.uri)
      })
    } else {
      this.setState({
        activePrintsSelected: _.unionBy(this.state.activePrintsSelected, [print], 'uri')
      })
    }
  }

  handleActivatePrints() {
    this.setState({
      activePrints: _.unionBy(this.state.activePrints, this.state.selectedPrints, 'uri'),
      selectedPrints: []
    })
  }

  handleDeactivatePrints() {
    this.setState({
      activePrints: _.differenceBy(this.state.activePrints, this.state.activePrintsSelected, 'uri'),
      activePrintsSelected: []
    })
  }

  render() {
    const {
      printers,
      prints,
      orders
    } = this.props

    const {
      selectedPrinter,
      selectedPrints,
      activePrints,
      activePrintsSelected
    } = this.state

    const inactivePrints = _.differenceBy(
      _.values(prints),
      activePrints,
      'uri'
    )

    return (
      <BS.Grid fluid>
        <BS.Row>
          <BS.Col xs={12}>
            <BS.Breadcrumb>
              <BS.Breadcrumb.Item>
                <Fa name='road'/> <FormattedMessage id="plan" defaultMessage='Plan'/>
              </BS.Breadcrumb.Item>
              <BS.Breadcrumb.Item href="#/plan/runs">
                <Fa name='code-fork'/> <FormattedMessage id="plan.Runs" defaultMessage='Runs'/>
              </BS.Breadcrumb.Item>
            </BS.Breadcrumb>
          </BS.Col>
        </BS.Row>

        <BS.Row>
          <BS.Col xs={3}>
            <PrintsList
              prints={inactivePrints}
              selected={selectedPrints}
              onSelect={this.handleSelectPrint}
              onActivate={this.handleActivatePrints}
            />
          </BS.Col>
          <BS.Col xs={9}>
            <BS.Row>
              <BS.Col xs={12}>
                <PrintersList
                  printers={printers}
                  selected={selectedPrinter}
                  onSelect={this.handleSelectPrinter}
                />
              </BS.Col>
            </BS.Row>
            <BS.Row>
              <BS.Col xs={8}>
                <BedLayout prints={[]} />
              </BS.Col>
              <BS.Col xs={4}>
                <ActivePrints
                  printer={selectedPrinter}
                  prints={activePrints}
                  selected={activePrintsSelected}
                  onSelect={this.handleSelectActivePrint}
                  onDeactivate={this.handleDeactivatePrints}
                />
              </BS.Col>
            </BS.Row>
          </BS.Col>
        </BS.Row>

        <BS.Row>
          <BS.Col xs={12}>
          </BS.Col>
        </BS.Row>
      </BS.Grid>
    )
  }
}

export default Runs
