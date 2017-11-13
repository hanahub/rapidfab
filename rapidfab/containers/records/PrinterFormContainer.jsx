import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import * as Selectors from 'rapidfab/selectors';

import PrinterForm from 'rapidfab/components/records/PrinterForm';

function redirect() {
  window.location.hash = '#/inventory/printers';
}

class PrinterFormContainer extends Component {
  constructor(props) {
    super(props);

    const { locations, printer, printerTypes } = this.props;

    if (printer) {
      this.state = {
        name: printer.name,
        printerType: printer.printerType,
        location: printer.location,
        modeler: printer.modeler,
      };
    } else {
      this.state = {
        name: '',
        printerType: printerTypes.length ? printerTypes[0].uri : '',
        loading: true,
        tocation: locations.length ? locations[0].uri : '',
        modeler: '',
      };
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch, uuid } = this.props;
    Promise.all([
      dispatch(Actions.Api.wyatt.location.list()),
      dispatch(Actions.Api.wyatt['printer-type'].list()),
      uuid ? dispatch(Actions.Api.wyatt.printer.get(uuid)) : null,
    ]).then(() => {
      this.setState({ loading: false });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { locations, printer, printerTypes, uuid } = this.props;
    if (uuid) {
      if (!printer && nextProps.printer) {
        const {
          name,
          printer_type: printerType,
          location,
          modeler,
        } = nextProps.printer;
        this.setState({
          name,
          printerType,
          location,
          modeler,
        });
      }
    } else {
      if (locations.length === 0 && nextProps.locations.length > 0) {
        this.setState({ location: nextProps.locations[0].uri });
      }
      if (printerTypes.length === 0 && nextProps.printerTypes.length > 0) {
        this.setState({ printerType: nextProps.printerTypes[0].uri });
      }
    }
  }

  handleDelete() {
    const { dispatch, uuid } = this.props;
    dispatch(Actions.Api.wyatt.printer.delete(uuid)).then(redirect);
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, uuid } = this.props;
    const { name, printerType, location, modeler } = this.state;
    const payload = {
      name,
      printer_type: printerType,
      location,
      modeler,
    };
    if (uuid) {
      dispatch(Actions.Api.wyatt.printer.put(uuid, payload)).then(redirect);
    } else {
      dispatch(Actions.Api.wyatt.printer.post(payload)).then(redirect);
    }
  }

  render() {
    const { handleDelete, handleInputChange, handleSubmit } = this;
    return (
      <PrinterForm
        {...this.state}
        {...this.props}
        handleDelete={handleDelete}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    );
  }
}

PrinterFormContainer.defaultProps = {
  printer: null,
  uuid: null,
};

PrinterFormContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      uri: PropTypes.string,
    })
  ).isRequired,
  printer: PropTypes.shape({
    location: PropTypes.string,
    name: PropTypes.string,
    modeler: PropTypes.string,
    printerType: PropTypes.string,
  }),
  printerTypes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      uri: PropTypes.string,
    })
  ).isRequired,
  uuid: PropTypes.string,
};

const mapStateToProps = (state, props) => {
  const printer = Selectors.getRouteResource(state, props);
  return Object.assign(
    {},
    {
      uuid: Selectors.getRoute(state, props).uuid,
      locations: Selectors.getLocationOptions(state),
      printerTypes: Selectors.getPrinterTypeOptions(state),
    },
    printer
      ? {
          printer: {
            name: printer.name,
            location: printer.location,
            modeler: printer.modeler,
            printerType: printer.printerType,
          },
        }
      : {}
  );
};

export default connect(mapStateToProps)(PrinterFormContainer);
