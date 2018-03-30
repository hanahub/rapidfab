import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { differenceBy, find, filter, head, map, unionBy } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { Button, ButtonToolbar, Col, Grid, Row } from 'react-bootstrap';
import Fa from 'react-fontawesome';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import PrintersList from './printersList';
import PrintsList from './printsList';
import ActivePrints from './activePrints';

class RunNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPrinter: head(props.printers),
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
    this.setState({ selectedPrinter: printer });
  }

  handleSelectPrint(print) {
    const { selectedPrints } = this.state;
    if (find(selectedPrints, ['uri', print.uri])) {
      this.setState({
        selectedPrints: filter(
          selectedPrints,
          selectedPrint => selectedPrint.uri !== print.uri
        ),
      });
    } else {
      this.setState({
        selectedPrints: unionBy(selectedPrints, [print], 'uri'),
      });
    }
  }

  handleSelectActivePrint(print) {
    const { activePrintsSelected } = this.state;
    if (find(activePrintsSelected, ['uri', print.uri])) {
      this.setState({
        activePrintsSelected: filter(
          activePrintsSelected,
          activePrintSelected => activePrintSelected.uri !== print.uri
        ),
      });
    } else {
      this.setState({
        activePrintsSelected: unionBy(activePrintsSelected, [print], 'uri'),
      });
    }
  }

  handleActivatePrints() {
    this.setState({
      activePrints: unionBy(
        this.state.activePrints,
        this.state.selectedPrints,
        'uri'
      ),
      selectedPrints: [],
    });
  }

  handleDeactivatePrints() {
    this.setState({
      activePrints: differenceBy(
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
        prints: map(activePrints, 'uri'),
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

    const inactivePrints = differenceBy(prints, activePrints, 'uri');

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
