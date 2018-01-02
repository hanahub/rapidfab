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
import Loading from 'rapidfab/components/Loading';

const Banner = ({
  handleInputChange,
  handleSubmit,
  link,
  message,
  submittable,
  submitting,
}) => (
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
          <Button disabled={!submittable} type="submit">
            {submitting ? (
              <Loading />
            ) : (
              <FormattedMessage
                id="updateBureauBanner"
                defaultMessage="Update Bureau Banner"
              />
            )}
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
  submittable: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default Banner;
