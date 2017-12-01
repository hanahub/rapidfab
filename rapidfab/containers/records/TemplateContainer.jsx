import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Actions from 'rapidfab/actions';
import Template from 'rapidfab/components/records/template/template';
import { reduxForm } from 'redux-form';
import * as Selectors from 'rapidfab/selectors';

const fields = [
  'id',
  'uuid',
  'name',
  'description',
  'region',
  'cost',
  'bureau',
];

class TemplateContainer extends Component {
  componentWillMount() {
    const { bureau, uuid } = this.props;
    this.props.onInitialize(bureau, uuid);
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    return <Template {...this.props} />;
  }
}

TemplateContainer.defaultProps = {
  uuid: null,
};

TemplateContainer.propTypes = {
  bureau: PropTypes.string.isRequired,
  uuid: PropTypes.string,
  onInitialize: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
};

function redirect() {
  window.location.hash = '#/inventory/templates';
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: (bureau, uuid) => {
      dispatch(Actions.Api.wyatt['printer-type'].list());
      dispatch(Actions.Api.wyatt['post-processor-type'].list());
      dispatch(Actions.Api.wyatt.shipping.list({ bureau }));
      if (uuid) {
        dispatch(Actions.Api.wyatt.template.get(uuid));
        dispatch(Actions.Api.wyatt['process-step'].list());
      }
    },
    onSave: (payload, deletedSteps) => {
      let templatePromise = null;
      if (payload.uuid) {
        templatePromise = dispatch(
          Actions.Api.wyatt.template.put(payload.uuid, payload)
        );
      } else {
        templatePromise = dispatch(Actions.Api.wyatt.template.post(payload));
      }
      Promise.all([templatePromise]).then(() => {
        const deletePromises = _.map(deletedSteps, uuid =>
          dispatch(Actions.Api.wyatt['process-step'].delete(uuid))
        );
        Promise.all(deletePromises).then(redirect);
      });
    },
    onDelete: uuid => {
      if (uuid) {
        dispatch(Actions.Api.wyatt.template.delete(uuid)).then(redirect);
      }
    },
    onDuplicate: templateCopy => {
      const { bureau, name, steps } = templateCopy;
      const stepCopies = steps.map(step => {
        const stepData = _.omit(step, ['step_position', 'template']);
        return new Promise(resolve => {
          dispatch(
            Actions.Api.wyatt['process-step'].post(stepData)
          ).then(response => resolve(response.payload.uri));
        });
      });

      Promise.all(stepCopies).then(processSteps => {
        const payload = {
          bureau,
          name,
          process_steps: processSteps,
        };

        dispatch(Actions.Api.wyatt.template.post(payload)).then(redirect);
      });
    },
    submitStep: payload => {
      if (payload.uuid) {
        return dispatch(
          Actions.Api.wyatt['process-step'].put(payload.uuid, payload)
        );
      }
      return dispatch(Actions.Api.wyatt['process-step'].post(payload));
    },
    onUnmount: () => {
      // get rid of pesky lingering errors
      dispatch(Actions.UI.clearUIState(['wyatt.location']));
    },
  };
}

function mapStateToProps(state, props) {
  const template = Selectors.getRouteResource(state, props);

  const processTypes = _.concat(
    Selectors.getPrinterTypes(state),
    Selectors.getPostProcessorTypes(state),
    Selectors.getShippings(state)
  );

  const fetching =
    state.ui.wyatt['process-step'].list.fetching ||
    state.ui.wyatt.template.list.fetching;

  return {
    uuid: Selectors.getRoute(state, props).uuid,
    template,
    bureau: Selectors.getBureauUri(state),
    initialValues: Selectors.getInitialValuesBureau(state, props),
    submitting: Selectors.getResourceFetching(state, 'wyatt.template'),
    apiErrors: Selectors.getResourceErrors(state, 'wyatt.template'),
    steps: Selectors.getStepsForTemplate(state, template),
    processTypes,
    fetching,
  };
}

export default reduxForm(
  {
    form: 'record.template',
    fields,
  },
  mapStateToProps,
  mapDispatchToProps
)(TemplateContainer);
