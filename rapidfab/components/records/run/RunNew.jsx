import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, ButtonToolbar, Col, Grid, Row } from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import PrintersList from './printersList';
import PrintsList from './printsList';
import ActivePrints from './activePrints';

class RunNew extends Component {
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
    const { printers, fetching, prints, pager, orderNamesMap } = this.props;

    const {
      selectedPrinter,
      selectedPrints,
      activePrints,
      activePrintsSelected,
    } = this.state;

    const inactivePrints = _.differenceBy(prints, activePrints, 'uri');

    return (
      <Grid fluid>
        <BreadcrumbNav breadcrumbs={['runs', 'New']} />

        <div className="clearfix">
          <ButtonToolbar className="pull-right">
            <Button
              bsSize="small"
              onClick={this.handleSave}
              disabled={!activePrints.length}
              bsStyle="primary"
            >
              <Fa name="floppy-o" />{' '}
              <FormattedMessage id="button.save" defaultMessage="Save" />
            </Button>
          </ButtonToolbar>
        </div>

        <hr />

        <FlashMessages />

        {(() => {
          if (fetching) {
            return (
              <Row>
                <Col xs={12}>
                  <div style={{ textAlign: 'center' }}>
                    <Fa name="spinner" spin size="2x" />
                  </div>
                </Col>
              </Row>
            );
          }
          return (
            <Row>
              <Col xs={12} lg={4}>
                <PrintsList
                  prints={inactivePrints}
                  selected={selectedPrints}
                  onSelect={this.handleSelectPrint}
                  onActivate={this.handleActivatePrints}
                  pager={pager}
                  onPageChange={this.props.onPageChange}
                  orderNamesMap={orderNamesMap}
                />
              </Col>
              <Col xs={12} lg={8}>
                <Row>
                  <Col xs={12}>
                    <ActivePrints
                      printer={selectedPrinter}
                      prints={activePrints}
                      selected={activePrintsSelected}
                      onSelect={this.handleSelectActivePrint}
                      onDeactivate={this.handleDeactivatePrints}
                      orderNamesMap={orderNamesMap}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <PrintersList
                      printers={printers}
                      selected={selectedPrinter}
                      onSelect={this.handleSelectPrinter}
                      modelers={this.props.modelers}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          );
        })()}
      </Grid>
    );
  }
}

RunNew.propTypes = {
  printers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSave: PropTypes.func.isRequired,
  modelers: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetching: PropTypes.bool.isRequired,
  pager: PropTypes.shape({}).isRequired,
  prints: PropTypes.arrayOf(PropTypes.object).isRequired,
  orderNamesMap: PropTypes.shape({}).isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default RunNew;
