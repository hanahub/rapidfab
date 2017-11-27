import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fa from 'react-fontawesome';
import { Button, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

import Actions from 'rapidfab/actions';
import { getOrderDocuments } from 'rapidfab/selectors';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

const OrderDocument = ({ download, name, onDelete, uuid }) => (
  <ListGroupItem>
    <a href={download}>{name || uuid}</a>
    <Button
      className="pull-right"
      bsStyle="danger"
      bsSize="xsmall"
      onClick={() => onDelete(uuid)}
    >
      <Fa name="times" />
    </Button>
  </ListGroupItem>
);

OrderDocument.propTypes = {
  download: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
};

class OrderDocuments extends React.Component {
  constructor(props) {
    super(props);

    this.state = { upload: null };

    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.uploadDocument = this.uploadDocument.bind(this);
  }

  componentDidMount() {
    const { dispatch, orderDocumentUUIDs } = this.props;
    orderDocumentUUIDs.forEach(uuid =>
      dispatch(Actions.Api.wyatt['order-document'].get(uuid))
    );
  }

  onChange(event) {
    const upload = event.target.files[0];
    this.setState({ upload });
  }

  async onDelete(uuid) {
    const { dispatch, order } = this.props;
    await dispatch(Actions.Api.wyatt['order-document'].delete(uuid));
    await dispatch(Actions.Api.wyatt.order.get(extractUuid(order)));
  }

  async uploadDocument() {
    const { dispatch, order } = this.props;
    const { upload } = this.state;
    const { name } = upload;
    this.setState({ upload: null });

    const orderPostResponse = await dispatch(
      Actions.Api.wyatt['order-document'].post({ name, order })
    );

    const uuid = extractUuid(orderPostResponse.headers.location);
    const documentResponse = await dispatch(
      Actions.Api.wyatt['order-document'].get(uuid)
    );

    const uploadLocation = documentResponse.json.upload_location;
    const newDocument = documentResponse.json.uri;
    this.setState({ newDocument });

    await dispatch(Actions.UploadModel.upload(uploadLocation, upload));
    await dispatch(Actions.Api.wyatt.order.get(extractUuid(order)));
  }

  render() {
    const { onChange, onDelete, uploadDocument } = this;
    const { upload } = this.state;
    const { orderDocuments } = this.props;

    return (
      <Panel bsStyle="primary">
        <ListGroup fill>
          <ListGroupItem>
            <b>Order Documents</b>
          </ListGroupItem>
        </ListGroup>

        {orderDocuments.map(orderDocument => (
          <OrderDocument
            download={orderDocument.content ? orderDocument.content : null}
            name={orderDocument.name}
            onDelete={onDelete}
            key={orderDocument.uri}
            uuid={extractUuid(orderDocument.uri)}
          />
        ))}

        <br />

        <input type="file" onChange={onChange} />

        <br />

        <Button bsStyle="primary" disabled={!upload} onClick={uploadDocument}>
          Upload
        </Button>
      </Panel>
    );
  }
}

OrderDocuments.propTypes = {
  dispatch: PropTypes.func.isRequired,
  orderDocumentUUIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  orderDocuments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => {
  const orderResource = state.resources[state.routeUUID];
  const order = orderResource.uri;
  const orderResourceDocuments = orderResource.order_documents;
  const orderDocumentUUIDs = orderResourceDocuments
    ? orderResourceDocuments.map(doc => extractUuid(doc))
    : [];
  const orderDocuments = getOrderDocuments(state).filter(
    orderDocument => orderDocument.order === order
  );
  return { orderDocuments, orderDocumentUUIDs, order };
};

export default connect(mapStateToProps)(OrderDocuments);
