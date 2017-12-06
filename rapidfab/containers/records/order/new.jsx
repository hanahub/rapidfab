import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';
import isFetchingInitial from 'rapidfab/utils/isFetchingInitial';
import * as Selectors from 'rapidfab/selectors';

import FlashMessages from 'rapidfab/components/FlashMessages';
import Loading from 'rapidfab/components/Loading';
import NewOrder from 'rapidfab/components/records/order/new/NewOrder';

class NewOrderContainer extends Component {
  componentDidMount() {
    this.props.onInitialize(this.props.bureau);
  }

  componentDidUpdate(prevProps) {
    const { model, uploadModel } = this.props;
    const prevModel = prevProps.model;
    if (
      prevModel &&
      prevModel.status !== 'processed' &&
      model &&
      model.status === 'processed'
    ) {
      this.props.onSaveOrder(uploadModel.orderPayload);
    }
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    const { fetching } = this.props;

    return (
      <div>
        {fetching ? (
          <Loading />
        ) : (
          <div>
            <FlashMessages />
            <NewOrder {...this.props} />
          </div>
        )}
      </div>
    );
  }
}

NewOrderContainer.propTypes = {
  bureau: PropTypes.shape({}).isRequired,
  fetching: PropTypes.bool.isRequired,
  model: PropTypes.shape({}).isRequired,
  onInitialize: PropTypes.func.isRequired,
  onSaveOrder: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  uploadModel: PropTypes.shape({}).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: bureau => {
      const { uri } = bureau;
      dispatch(Actions.Api.wyatt.material.list({ bureau: uri }));
      dispatch(Actions.Api.wyatt['third-party'].list({ bureau: uri }));
      dispatch(Actions.Api.wyatt.shipping.list({ bureau: uri }));
      dispatch(Actions.Api.wyatt.template.list({ bureau: uri }));
      dispatch(Actions.Api.pao.users.list());
    },
    onSaveOrder: payload => {
      if (payload) {
        dispatch(Actions.UploadModel.storePayload(null));
        dispatch(Actions.Api.wyatt.order.post(payload)).then(args => {
          window.location.hash = `#/records/order/${extractUuid(
            args.headers.location
          )}`;
        });
      }
    },
    onUnmount: () => {
      dispatch(Actions.UploadModel.clearState());
    },
    onSubmit: payload => {
      const validatedPayload = Object.assign({}, payload);
      if (!!validatedPayload.materials.support === false)
        delete validatedPayload.materials.support;
      if (!!validatedPayload.shipping.name === false)
        delete validatedPayload.shipping.name;
      if (!!validatedPayload.shipping.address === false)
        delete validatedPayload.shipping.address;
      if (!!validatedPayload.shipping.tracking === false)
        delete validatedPayload.shipping.tracking;
      if (!!validatedPayload.third_party_provider === false)
        delete validatedPayload.third_party_provider;
      if (!!validatedPayload.post_processor_type === false)
        delete validatedPayload.post_processor_type;

      if (!validatedPayload.model) {
        dispatch(Actions.Api.wyatt.order.post(validatedPayload)).then(args => {
          window.location.hash = `#/records/order/${extractUuid(
            args.headers.location
          )}`;
        });
      } else {
        dispatch(
          Actions.Api.hoth.model.post({
            name: validatedPayload.name,
            type: 'stl',
          })
        ).then(args => {
          dispatch(
            Actions.UploadModel.upload(
              args.headers.uploadLocation,
              validatedPayload.model[0]
            )
          );
          validatedPayload.model = args.headers.location;
          dispatch(Actions.UploadModel.storePayload(validatedPayload));
        });
      }
    },
  };
}

const mapStateToProps = state => ({
  bureau: Selectors.getBureau(state),
  fetching: isFetchingInitial(
    state.ui.wyatt.material.list,
    state.ui.wyatt.template.list,
    state.ui.wyatt['third-party'].list
  ),
  materials: Selectors.getMaterials(state),
  model: state.resources[state.uploadModel.modelUuid],
  providers: Selectors.getThirdPartyProviders(state),
  shippings: Selectors.getShippings(state),
  templates: Selectors.getTemplates(state),
  uploadModel: state.uploadModel,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderContainer);
