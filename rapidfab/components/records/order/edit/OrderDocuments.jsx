import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fa from 'react-fontawesome';
import { Button, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

import Actions from 'rapidfab/actions';
import { getOrderDocuments } from 'rapidfab/selectors';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

class OrderDocuments extends React.Component {
  constructor(props) {
    super(props);

    this.state = { upload: null };

    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onDownload = this.onDownload.bind(this);
    this.uploadDocument = this.uploadDocument.bind(this);
  }

  componentDidMount() {
    const { dispatch, order } = this.props;
    dispatch(Actions.Api.wyatt['order-document'].list({ order }));
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

  async onDownload(uri) {
    await this.props.dispatch(
      Actions.Api.wyatt['order-document'].get(extractUuid(uri))
    );
    this[uri].click();
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
    const { onChange, onDelete, onDownload, uploadDocument } = this;
    const { upload } = this.state;
    const { orderDocuments } = this.props;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    /* eslint-disable jsx-a11y/anchor-has-content */
    return (
      <Panel bsStyle="primary">
        <ListGroup fill>
          <ListGroupItem>
            <b>Order Documents</b>
          </ListGroupItem>
        </ListGroup>

        {orderDocuments.map(orderDocument => (
          <ListGroupItem key={orderDocument.uri}>
            <a download="test" onClick={() => onDownload(orderDocument.uri)}>
              {orderDocument.name || extractUuid(orderDocument.uri)}
            </a>
            <a
              href={orderDocument.content}
              download
              style={{ display: 'none' }}
              ref={node => {
                this[orderDocument.uri] = node;
              }}
            />
            <Button
              className="pull-right"
              bsStyle="danger"
              bsSize="xsmall"
              onClick={() => onDelete(extractUuid(orderDocument.uri))}
            >
              <Fa name="times" />
            </Button>
          </ListGroupItem>
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
  order: PropTypes.string.isRequired,
  orderDocuments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => {
  const orderResource = state.resources[state.routeUUID];
  const order = orderResource.uri;
  const orderDocuments = getOrderDocuments(state).filter(
    orderDocument => orderDocument.order === order
  );
  return { orderDocuments, order };
};

export default connect(mapStateToProps)(OrderDocuments);
