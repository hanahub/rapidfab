import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import PrinterTypeComponent from 'rapidfab/components/records/printerType';
import { reduxForm } from 'redux-form';
import * as Selectors from 'rapidfab/selectors';

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'description',
  'manufacturer',
  'build_volume.x',
  'build_volume.y',
  'build_volume.z',
  'materials',
  'bureau',
];

class PrinterTypeContainer extends Component {
  componentWillMount() {
    const { bureau, uuid } = this.props;
    this.props.onInitialize(bureau, uuid);
  }

  render() {
    return <PrinterTypeComponent {...this.props} />;
  }
}

function redirect() {
  window.location.hash = '#/inventory/printer-types';
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: (bureau, uuid) => {
      dispatch(Actions.Api.wyatt.material.list({ bureau }));
      dispatch(Actions.Api.wyatt.manufacturer.list());
      if (uuid) {
        dispatch(Actions.Api.wyatt['printer-type'].get(uuid));
      }
    },
    onSubmit: payload => {
      if (payload.uuid) {
        dispatch(
          Actions.Api.wyatt['printer-type'].put(payload.uuid, payload)
        ).then(redirect);
      } else {
        dispatch(Actions.Api.wyatt['printer-type'].post(payload)).then(
          redirect
        );
      }
    },
    onDelete: uuid => {
      if (uuid) {
        dispatch(Actions.Api.wyatt['printer-type'].delete(uuid)).then(redirect);
      }
    },
  };
}

function mapStateToProps(state, props) {
  return {
    bureau: Selectors.getBureauUri(state),
    manufacturers: Selectors.getManufacturers(state),
    materials: Selectors.getMaterials(state),
    initialValues: Selectors.getInitialValuesBureau(state, props),
    uuid: Selectors.getRoute(state, props).uuid,
  };
}

PrinterTypeContainer.propTypes = {
  bureau: PropTypes.string.isRequired,
  onInitialize: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default reduxForm(
  {
    form: 'record.printerType',
    fields,
  },
  mapStateToProps,
  mapDispatchToProps
)(PrinterTypeContainer);
