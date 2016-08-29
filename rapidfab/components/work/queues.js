import React, { PropTypes }                   from "react";
import * as BS                                from 'react-bootstrap';
import Fa                                     from 'react-fontawesome';
import { FormattedMessage }                   from 'react-intl';

const Queues = ({ orders, materials }) => (
  <BS.Grid fluid>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item href="#/work">
            <Fa name='wrench'/> <FormattedMessage id="work" defaultMessage='Work'/>
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/work/queues">
            <Fa name='list'/> <FormattedMessage id="work.queues" defaultMessage='Queues'/>
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
      </BS.Col>
    </BS.Row>

    <hr/>

    <BS.Row>
      <BS.Col xs={12}>
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

export default Queues
