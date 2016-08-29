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


class PrintQueues extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPrinter: _.head(_.values(props.printers)),
      selectedPrint: null
    }

    this.handleSelectPrinter = this.handleSelectPrinter.bind(this);
    this.handleSelectPrint = this.handleSelectPrint.bind(this);
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
    this.setState({
      selectedPrint: print
    })
  }

  render() {
    const {
      printers,
      prints,
      orders
    } = this.props

    const activePrints = _.sampleSize(prints, 5)

    const {
      selectedPrinter,
      selectedPrint
    } = this.state

    return (
      <BS.Grid fluid>
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
          <BS.Col xs={3}>
            <PrintsList
              prints={prints}
              selected={selectedPrint}
              onSelect={this.handleSelectPrint}
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
                <BedLayout prints={activePrints}/>
              </BS.Col>
              <BS.Col xs={4}>
                <ActivePrints
                  printer={selectedPrinter}
                  prints={activePrints}
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

export default PrintQueues
