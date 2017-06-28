import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fa from 'react-fontawesome';
import {
  Col,
  ListGroup,
  ListGroupItem,
  Panel,
  Row,
  Thumbnail,
} from 'react-bootstrap';

import { extractUuid } from 'rapidfab/reducers/makeApiReducers'
import { getPrintsForLineItem, getModels } from 'rapidfab/selectors';
import {
  FormattedCost,
  FormattedDate,
  FormattedDuration,
  FormattedMessage,
  FormattedVolume
} from 'rapidfab/i18n';
import {
  FormControlTextArea,
  FormControlTextCareful
} from 'rapidfab/components/formTools';
import LineItemForm from './LineItemForm';

const Header = (prints) => {
  const complete = prints.reduce( (total, print) => {
    return prints.status === 'complete' ? total + 1 : total;
  }, 0).toString();
  const total = (!!prints ? prints.length : 0).toString();
  return (
    <FormattedMessage
      id="record.printCompleteCount"
      defaultMessage={`Process Steps - {complete} / {total} complete`}
      values={{complete: complete, total: total}}
    />
  );
}

const statusMapping = {
  created           : (<FormattedMessage id="status.created" defaultMessage="Created"/>),
  calculating       : (<FormattedMessage id="status.calculating" defaultMessage="Calculating"/>),
  calculated        : (<FormattedMessage id="status.calculated" defaultMessage="Calculated"/>),
  queued            : (<FormattedMessage id="status.queued" defaultMessage="Queued"/>),
  "in-progress"     : (<FormattedMessage id="status.in_progress" defaultMessage="In Progress"/>),
  complete          : (<FormattedMessage id="status.complete" defaultMessage="Complete"/>),
  error             : (<FormattedMessage id="status.error" defaultMessage="Error"/>),
};

const PrintItem = ({ print }) => (
  <ListGroupItem>
    <Row>
      <Col xs={6}>
        {print.id}
      </Col>
      <Col xs={6}>
        {statusMapping[print.status]}
      </Col>
    </Row>
  </ListGroupItem>
);

const Prints = ({ prints }) => (
  <Panel header={Header(prints)} bsStyle="primary">
    <ListGroup fill>

      <ListGroupItem key="header">
        <Row>
          <Col xs={6}>
            <b><FormattedMessage id="field.id" defaultMessage="ID"/></b>
          </Col>
          <Col xs={6}>
            <b><FormattedMessage id="field.status" defaultMessage="Status"/></b>
          </Col>
        </Row>
      </ListGroupItem>
      { prints.map( print => <PrintItem key={print.id} print={print} />) }
    </ListGroup>
  </Panel>
);

const Estimates = ({ estimates, currency }) => (
  <Panel bsStyle="info">
    <ListGroup fill>

      <ListGroupItem key="header">
        <b><FormattedMessage id="estimates.estimates" defaultMessage="Estimates"/></b>
      </ListGroupItem>

      <ListGroupItem>
        <Row>
          <Col xs={8}>
            <FormattedMessage id="estimates.printTime" defaultMessage='Print Time'/>
          </Col>
          <Col xs={4}>
            {estimates.print_time ?
              <FormattedDuration value={estimates.print_time}/> :
                (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
            }
          </Col>
        </Row>
      </ListGroupItem>

      <ListGroupItem>
        <Row>
          <Col xs={8}>
            <FormattedMessage id="estimates.materialUsed" defaultMessage='Material Used'/>
          </Col>
          <Col xs={4}>
            {estimates.materials.base ?
              <FormattedVolume value={estimates.materials.base}/> :
                (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
            }
          </Col>
        </Row>
      </ListGroupItem>

      <ListGroupItem>
        <Row>
          <Col xs={8}>
            <FormattedMessage id="estimates.supportUsed" defaultMessage='Support Used'/>
          </Col>
          <Col xs={4}>
            {estimates.materials.support ?
              <FormattedVolume value={estimates.materials.support}/> :
                (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
            }
          </Col>
        </Row>
      </ListGroupItem>

      <ListGroupItem>
        <Row>
          <Col xs={8}>
            <FormattedMessage id="estimates.cost" defaultMessage='Cost'/>
          </Col>
          <Col xs={4}>
            {estimates.amount ?
              <FormattedCost currency={currency} value={estimates.cost.amount} /> :
                (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
            }
          </Col>
        </Row>
      </ListGroupItem>

    </ListGroup>
  </Panel>
);

const ModelThumbnail = ({src}) => {
  if(!src) {
    return (
      <div>
        <Fa name="spinner" spin/>
        <span> </span>
        <FormattedMessage id="loading.thumbnail" defaultMessage="Loading Thumbnail..."/>
      </div>
    );
  } else {
    return (<Thumbnail src={src} />);
  }
}

const LineItem = ({ currency, lineItem, prints, snapshot }) => {
  // Check if lineItem is stale data from order
  if (!lineItem)
    return null;
  const { estimates } = lineItem;
  return(
    <Panel header="Line Item">

      <Col xs={12} sm={4}>
        <Row>
          <Col xs={10} xsOffset={1} lg={6} lgOffset={3}>
            <ModelThumbnail src={snapshot}/>
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={10} lgOffset={1}>
            <Estimates estimates={estimates} currency={currency}/>
          </Col>
        </Row>
      </Col>

      <Col xs={12} sm={8}>
        <Row>
          <Col>
            <LineItemForm lineItem={lineItem} formKey={lineItem.uri}/>
          </Col>
        </Row>

        <Row>
          <Col xs={9} xsOffset={3}>
            <Prints prints={prints} style={{padding: "20px"}}/>
          </Col>
        </Row>
      </Col>

    </Panel>
  );
};

function getSnapshotFromLineItem(lineItem, models) {
  if (!lineItem || models.length === 0)
    return ''

  const model = models.filter(model => model.uri === lineItem.model);

  return (model && model.length) ? model[0].snapshot_content : '';
}


const mapStateToProps = (state, ownProps) => {
  const { uri } = ownProps;
  const uuid = extractUuid(uri);
  const order = state.resources[state.routeUUID.uuid];
  const { currency } = order;
  const lineItem = state.resources[uuid];
  const prints = getPrintsForLineItem(state, lineItem);
  const models = getModels(state);
  const snapshot = getSnapshotFromLineItem(lineItem, models);

  return { currency, lineItem, prints, snapshot };
}

export default connect(mapStateToProps)(LineItem)
