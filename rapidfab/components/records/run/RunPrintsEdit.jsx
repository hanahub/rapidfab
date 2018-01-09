import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

import ActivePrints from './activePrints';
import PrintsList from './printsList';

class RunPrintsEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPrints: [],
      activePrintsSelected: [],
      activePrints: this.props.activePrints,
    };

    this.handleSelectPrint = this.handleSelectPrint.bind(this);
    this.handleActivatePrints = this.handleActivatePrints.bind(this);
    this.handleSelectActivePrint = this.handleSelectActivePrint.bind(this);
    this.handleDeactivatePrints = this.handleDeactivatePrints.bind(this);
    this.handleSave = this.handleSave.bind(this);
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
    const { activePrints } = this.state;

    if (activePrints.length) {
      this.props.onSave(extractUuid(this.props.runUri), {
        prints: _.map(activePrints, 'uri'),
      });
    }
  }

  render() {
    const { fetching, prints, pager, orderNamesMap } = this.props;

    const { selectedPrints, activePrints, activePrintsSelected } = this.state;

    const inactivePrints = _.differenceBy(prints, activePrints, 'uri');

    return (
      <BS.Grid fluid>
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

        {fetching ? (
          <BS.Row>
            <BS.Col xs={12}>
              <div style={{ textAlign: 'center' }}>
                <Fa name="spinner" spin size="2x" />
              </div>
            </BS.Col>
          </BS.Row>
        ) : (
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
                    printer={this.props.printers[0]}
                    prints={activePrints}
                    selected={activePrintsSelected}
                    onSelect={this.handleSelectActivePrint}
                    onDeactivate={this.handleDeactivatePrints}
                    orderNamesMap={orderNamesMap}
                  />
                </BS.Col>
              </BS.Row>
            </BS.Col>
          </BS.Row>
        )}
      </BS.Grid>
    );
  }
}

RunPrintsEdit.propTypes = {
  activePrints: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSave: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  pager: PropTypes.shape({}).isRequired,
  printers: PropTypes.arrayOf(PropTypes.object).isRequired,
  prints: PropTypes.arrayOf(PropTypes.object).isRequired,
  orderNamesMap: PropTypes.shape({}).isRequired,
  onPageChange: PropTypes.func.isRequired,
  runUri: PropTypes.string.isRequired,
};

export default RunPrintsEdit;
