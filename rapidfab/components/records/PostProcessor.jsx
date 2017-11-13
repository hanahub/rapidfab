import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Nav, NavItem, PageHeader } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';

import BlockMachineContainer from 'rapidfab/containers/blockMachine/BlockMachineContainer';
import PostProcessorFormContainer from 'rapidfab/containers/records/PostProcessorFormContainer';

const PostProcessor = ({ handleSelectTab, name, route, tab, uri }) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['postProcessors', route.uuid || 'New']} />

    <PageHeader>{name || 'New Post Processor'}</PageHeader>

    {route.uuid && (
      <Nav bsStyle="tabs" activeKey={tab} onSelect={handleSelectTab}>
        <NavItem eventKey={1}>Summary</NavItem>
        <NavItem disabled={!uri} eventKey={2}>
          Downtime
        </NavItem>
      </Nav>
    )}

    <FlashMessages />

    {tab === 1 && <PostProcessorFormContainer route={route} />}
    {tab === 2 && (
      <BlockMachineContainer machineType="post_processor" machineUri={uri} />
    )}
  </Grid>
);

PostProcessor.defaultProps = {
  name: null,
  uri: null,
};

PostProcessor.propTypes = {
  handleSelectTab: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  route: PropTypes.shape({ uuid: PropTypes.string }).isRequired,
  tab: PropTypes.number.isRequired,
  uri: PropTypes.string,
};

export default PostProcessor;
