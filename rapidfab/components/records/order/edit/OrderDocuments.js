import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fa from 'react-fontawesome';
import {
  Button,
  ListGroup,
  ListGroupItem,
  Panel
} from 'react-bootstrap';

import Actions from 'rapidfab/actions';
import { getOrderDocuments } from 'rapidfab/selectors';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';
import { postForm } from 'rapidfab/api/makeApi';

import Loading from 'rapidfab/components/Loading';

const OrderDocument = ({download, name, onDelete, uuid}) => (
  <ListGroupItem>
    <a href={download}>{ name ? name : uuid }</a>
    <Button
      className="pull-right"
      bsStyle="danger"
      bsSize="xsmall"
      onClick={() => onDelete(uuid)}
    >
      <Fa name='times'/>
    </Button>
  </ListGroupItem>
);

class OrderDocuments extends React.Component {
  constructor(props) {
    super(props)

    this.state = { upload: null };

    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.uploadDocument = this.uploadDocument.bind(this);
  }

  async componentDidMount() {
    try {
    const { dispatch, orderDocumentUUIDs } = this.props;
    const orderDocumentResponses = orderDocumentUUIDs.map( uuid => {
      return dispatch(Actions.Api.wyatt['order-document'].get(uuid));
    });
    await Promise.all(orderDocumentResponses);
    }
    catch (e) {
    }
  }

  onChange(event) {
    const upload = event.target.files[0];
    this.setState({ upload });
  }

  async onDelete(uuid) {
    const { dispatch, order } = this.props;
    const documentResponse = await dispatch(
      Actions.Api.wyatt['order-document'].delete(uuid));
    const orderResponse = await dispatch(
      Actions.Api.wyatt.order.get(extractUuid(order)));
  }

  async uploadDocument() {
    const { dispatch, order } = this.props;
    const { upload } = this.state;
    const { name } = upload;
    this.setState({ upload: null });

    const orderPostResponse = await dispatch(
      Actions.Api.wyatt['order-document'].post({ name, order }));

    const uuid = extractUuid(orderPostResponse.headers.location);
    const documentResponse = await dispatch(
      Actions.Api.wyatt['order-document'].get(uuid));

    const uploadLocation = documentResponse.json['upload_location'];
    const newDocument = documentResponse.json.uri;
    this.setState({ newDocument });

    const uploadResponse = await dispatch(
      Actions.UploadModel.upload(uploadLocation, upload));
    const orderResponse = await dispatch(
      Actions.Api.wyatt.order.get(extractUuid(order)));

  }

  render() {
    const { onChange, onDelete, uploadDocument } = this;
    const { loading, upload} = this.state;
    const { orderDocuments } = this.props;

    return (
      <Panel bsStyle="info">
        <ListGroup fill>
          <ListGroupItem>
            <b>Order Documents</b>
          </ListGroupItem>
        </ListGroup>

        { orderDocuments.map( orderDocument => (
          <OrderDocument
            download={orderDocument.content ? orderDocument.content : null }
            name={orderDocument.name}
            onDelete={onDelete}
            key={orderDocument.uri}
            uuid={extractUuid(orderDocument.uri)}
          />
        ))}

        <br />

        <input type="file" onChange={onChange}/>

        <br />

        <Button
          bsStyle="primary"
          disabled={!upload}
          onClick={uploadDocument}
        >
          Upload
        </Button>

      </Panel>
    );
  }
}

const mapStateToProps = (state) => {
  const orderResource = state.resources[state.routeUUID];
  const order = orderResource.uri;
  const orderDocumentUUIDs = orderResource['order_documents'].map( doc => {
    return extractUuid(doc);
  });
  const orderDocuments = getOrderDocuments(state).filter( orderDocument => {
    return orderDocument.order === order;
  });
  return { orderDocuments, orderDocumentUUIDs, order };
};

export default connect(mapStateToProps)(OrderDocuments)
