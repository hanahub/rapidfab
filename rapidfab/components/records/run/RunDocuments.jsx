import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fa from 'react-fontawesome';
import { Button, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

import Actions from 'rapidfab/actions';
import { getRunDocuments } from 'rapidfab/selectors';
import extractUuid from 'rapidfab/utils/extractUuid';

const RunDocument = ({ download, name, onDelete, uuid }) => (
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

RunDocument.propTypes = {
  download: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
};

class RunDocuments extends React.Component {
  constructor(props) {
    super(props);

    this.state = { upload: null };

    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.uploadDocument = this.uploadDocument.bind(this);
  }

  componentDidMount() {
    const { dispatch, runDocumentUUIDs } = this.props;
    runDocumentUUIDs.forEach(uuid =>
      dispatch(Actions.Api.wyatt['run-document'].get(uuid))
    );
  }

  onChange(event) {
    const upload = event.target.files[0];
    this.setState({ upload });
  }

  async onDelete(uuid) {
    const { dispatch, runUri } = this.props;
    await dispatch(Actions.Api.wyatt['run-document'].delete(uuid));
    await dispatch(Actions.Api.wyatt.run.get(extractUuid(runUri)));
  }

  async uploadDocument() {
    const { dispatch, runUri } = this.props;
    const { upload } = this.state;
    const { name } = upload;
    this.setState({ upload: null });

    const runDocumentPostResponse = await dispatch(
      Actions.Api.wyatt['run-document'].post({ name, run: runUri })
    );

    const uuid = extractUuid(runDocumentPostResponse.headers.location);
    const documentResponse = await dispatch(
      Actions.Api.wyatt['run-document'].get(uuid)
    );

    const uploadLocation = documentResponse.json.upload_location;
    const newDocument = documentResponse.json.uri;
    this.setState({ newDocument });

    await dispatch(Actions.UploadModel.upload(uploadLocation, upload));
    await dispatch(Actions.Api.wyatt.run.get(extractUuid(runUri)));
  }

  render() {
    const { onChange, onDelete, uploadDocument } = this;
    const { upload } = this.state;
    const { runDocuments } = this.props;

    return (
      <Panel header="Run Documents">
        <ListGroup fill>
          {runDocuments.map(runDocument => (
            <RunDocument
              download={runDocument.content ? runDocument.content : null}
              name={runDocument.name}
              onDelete={onDelete}
              key={runDocument.uri}
              uuid={extractUuid(runDocument.uri)}
            />
          ))}
        </ListGroup>

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

RunDocuments.propTypes = {
  dispatch: PropTypes.func.isRequired,
  runDocumentUUIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  runDocuments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => {
  const runResource = state.resources[state.routeUUID];
  const runUri = runResource.uri;
  const runResourceDocuments = runResource.run_documents;
  const runDocumentUUIDs = runResourceDocuments
    ? runResourceDocuments.map(doc => extractUuid(doc))
    : [];
  const runDocuments = getRunDocuments(state).filter(
    runDocument => runDocument.run === runUri
  );
  return { runDocuments, runDocumentUUIDs, runUri };
};

export default connect(mapStateToProps)(RunDocuments);
