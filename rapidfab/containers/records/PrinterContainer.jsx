import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import * as Selectors from 'rapidfab/selectors';

import Printer from 'rapidfab/components/records/Printer';


function redirect() {
  window.location.hash = '#/inventory/printers';
}

class PrinterContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      printerType: '',
      location: '',
      modeler: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch, uuid } = this.props;
    dispatch(Actions.Api.wyatt.location.list());
    dispatch(Actions.Api.wyatt['printer-type'].list());
    if (uuid) {
      dispatch(Actions.Api.wyatt.printer.get(uuid));
    }
  }

  handleDelete() {
    console.log('delete');
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    console.log('submit');
  }

  render() {
    const { handleDelete, handleInputChange, handleSubmit } = this;
    return (
      <Printer
        {...this.state}
        {...this.props}
        handleDelete={handleDelete}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    );
  }
}

PrinterContainer.defaultProps = {
  uuid: null,
};

PrinterContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  uuid: PropTypes.string,
};


function mapDispatchToProps(dispatch) {
  return {
    onSubmit: payload => {
      const validatedPayload = Object.assign({}, payload, {
        modeler: payload.modeler ? payload.modeler : '',
      });
      if (payload.uuid) {
        dispatch(
          Actions.Api.wyatt.printer.put(payload.uuid, validatedPayload)
        ).then(redirect);
      } else {
        dispatch(Actions.Api.wyatt.printer.post(validatedPayload)).then(
          redirect
        );
      }
    },
    onDelete: uuid => {
      if (uuid) {
        dispatch(Actions.Api.wyatt.printer.delete(uuid)).then(redirect);
      }
    },
  };
}

function mapStateToProps(state, props) {
  return {
    uuid: Selectors.getRoute(state, props).uuid,
    initialValues: Selectors.getRouteResource(state, props),
    submitting: Selectors.getResourceFetching(state, 'wyatt.printer'),
    locations: Selectors.getLocations(state),
    printerTypes: Selectors.getPrinterTypes(state),
  };
}

export default connect(mapStateToProps)(PrinterContainer);
