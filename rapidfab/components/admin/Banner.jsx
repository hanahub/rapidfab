import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  ButtonGroup,
  ControlLabel,
  FormControl,
  FormGroup,
  Grid,
  PageHeader,
} from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import { FormattedMessage } from 'rapidfab/i18n';

const Banner = ({ handleInputChange, handleSubmit, link, message }) => (
  <Grid>
    <BreadcrumbNav breadcrumbs={['admin', 'banner']} />
    <FlashMessages />

    <PageHeader>Bureau Banner</PageHeader>

    <form onSubmit={handleSubmit}>
      <FormGroup>
        <ControlLabel>
          <FormattedMessage id="message" defaultMessage="Message" />
        </ControlLabel>
        <FormControl
          type="text"
          name="message"
          value={message}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>
          <FormattedMessage id="link" defaultMessage="Link" />
        </ControlLabel>
        <FormControl
          type="text"
          name="link"
          value={link}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <ButtonGroup vertical block>
          <Button type="submit">
            <FormattedMessage id="submit" defaultMessage="Submit" />
          </Button>
        </ButtonGroup>
      </FormGroup>
    </form>
  </Grid>
);

Banner.defaultProps = {
  link: '',
  message: '',
};

Banner.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  link: PropTypes.string,
  message: PropTypes.string,
};

export default Banner;
