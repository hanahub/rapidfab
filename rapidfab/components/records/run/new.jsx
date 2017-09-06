import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import Error from 'rapidfab/components/error';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import PrintersList from './printersList';
import PrintsList from './printsList';
import ActivePrints from './activePrints';

class Runs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPrinter: _.head(props.printers),
      selectedPrints: [],
      activePrintsSelected: [],
      activePrints: [],
    };

    this.handleSelectPrinter = this.handleSelectPrinter.bind(this);
    this.handleSelectPrint = this.handleSelectPrint.bind(this);
    this.handleActivatePrints = this.handleActivatePrints.bind(this);
    this.handleSelectActivePrint = this.handleSelectActivePrint.bind(this);
    this.handleDeactivatePrints = this.handleDeactivatePrints.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillReceiveProps() {
    let selectedPrinter = this.state.selectedPrinter;
    if (selectedPrinter && !this.props.printers[selectedPrinter.uuid]) {
      selectedPrinter = _.head(_.values(this.props.printers));
      this.setState({ selectedPrinter });
    }
  }

  handleSelectPrinter(printer) {
    this.setState({
      selectedPrinter: printer,
    });
  }

  handleSelectPrint(print) {
    if (_.find(this.state.selectedPrints, ['uri', print.uri])) {
      this.setState({
        selectedPrints: _.filter(
          this.state.selectedPrints,
          selectedPrint => selectedPrint.uri !== print.uri
        ),
      });
    } else {
      this.setState({
        selectedPrints: _.unionBy(this.state.selectedPrints, [print], 'uri'),
      });
    }
  }

  handleSelectActivePrint(print) {
    if (_.find(this.state.activePrintsSelected, ['uri', print.uri])) {
      this.setState({
        activePrintsSelected: _.filter(
          this.state.activePrintsSelected,
          activePrintSelected => activePrintSelected.uri !== print.uri
        ),
      });
    } else {
      this.setState({
        activePrintsSelected: _.unionBy(
          this.state.activePrintsSelected,
          [print],
          'uri'
        ),
      });
    }
  }

  handleActivatePrints() {
    this.setState({
      activePrints: _.unionBy(
        this.state.activePrints,
        this.state.selectedPrints,
        'uri'
      ),
      selectedPrints: [],
    });
  }

  handleDeactivatePrints() {
    this.setState({
      activePrints: _.differenceBy(
        this.state.activePrints,
        this.state.activePrintsSelected,
        'uri'
      ),
      activePrintsSelected: [],
    });
  }

  handleSave() {
    const { selectedPrinter, activePrints } = this.state;

    if (activePrints.length) {
      this.props.onSave({
        printer: selectedPrinter.uri,
        printer_type: selectedPrinter.printer_type.uri,
        prints: _.map(activePrints, 'uri'),
      });
    }
  }

  render() {
    const {
      printers,
      apiErrors,
      fetching,
      prints,
      pager,
      orderNamesMap,
    } = this.props;

    const {
      selectedPrinter,
      selectedPrints,
      activePrints,
      activePrintsSelected,
    } = this.state;

    const inactivePrints = _.differenceBy(prints, activePrints, 'uri');

    return (
      <BS.Grid fluid>
        <BreadcrumbNav breadcrumbs={['runs', 'New']} />

        <div className="clearfix">
          <BS.ButtonToolbar className="pull-right">
            <BS.Button
              bsSize="small"
              onClick={this.handleSave}
              disabled={!activePrints.length}
              bsStyle="primary"
            >
              <Fa name="floppy-o" />{' '}
              <FormattedMessage id="button.save" defaultMessage="Save" />
            </BS.Button>
          </BS.ButtonToolbar>
        </div>

        <hr />

        <BS.Row>
          <BS.Col xs={12}>
            <Error errors={apiErrors} />
          </BS.Col>
        </BS.Row>

        {(() => {
          if (fetching) {
            return (
              <BS.Row>
                <BS.Col xs={12}>
                  <div style={{ textAlign: 'center' }}>
                    <Fa name="spinner" spin size="2x" />
                  </div>
                </BS.Col>
              </BS.Row>
            );
          }
          return (
            <BS.Row>
              <BS.Col xs={12} lg={4}>
                <PrintsList
                  prints={inactivePrints}
                  selected={selectedPrints}
                  onSelect={this.handleSelectPrint}
                  onActivate={this.handleActivatePrints}
                  pager={pager}
                  onPageChange={this.props.onPageChange}
                  orderNamesMap={orderNamesMap}
                />
              </BS.Col>
              <BS.Col xs={12} lg={8}>
                <BS.Row>
                  <BS.Col xs={12}>
                    <ActivePrints
                      printer={selectedPrinter}
                      prints={activePrints}
                      selected={activePrintsSelected}
                      onSelect={this.handleSelectActivePrint}
                      onDeactivate={this.handleDeactivatePrints}
                      orderNamesMap={orderNamesMap}
                    />
                  </BS.Col>
                </BS.Row>
                <BS.Row>
                  <BS.Col xs={12}>
                    <PrintersList
                      printers={printers}
                      selected={selectedPrinter}
                      onSelect={this.handleSelectPrinter}
                    />
                  </BS.Col>
                </BS.Row>
              </BS.Col>
            </BS.Row>
          );
        })()}
      </BS.Grid>
    );
  }
}

Runs.propTypes = {
  printers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSave: PropTypes.func.isRequired,
  apiErrors: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetching: PropTypes.bool.isRequired,
  pager: PropTypes.object.isRequired,
  prints: PropTypes.arrayOf(PropTypes.object).isRequired,
  orderNamesMap: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Runs;
