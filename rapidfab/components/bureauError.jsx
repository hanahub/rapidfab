import React from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

const BureauFetchError = () => (
  <FormattedMessage
    id="bureauError.fetch"
    message="There was an unkown error fetching your bureau. Please try again."
  />
);

const BureauLengthError = () => (
  <FormattedMessage
    id="bureauError.multiple"
    message="You belong to multiple Bureaus. Only one Bureau is allowed when using MES. Please remove one of the Bureaus listed below."
  />
);

const BureauMissingError = () => (
  <FormattedMessage
    id="bureauError.empty"
    message="You are not assigned to any Bureaus. A Bureau is required to use MES."
  />
);

const BureauError = ({ bureaus, errors }) => (
  <BS.Grid fluid>
    <BS.Jumbotron>
      <BS.Row>
        <BS.Col xs={12}>
          <h1>Bureau Error!</h1>
          {errors.length && <BureauFetchError />}
          {bureaus.length > 1 && <BureauLengthError />}
          {bureaus.length === 0 && <BureauMissingError />}
          {bureaus.map(bureau => (
            <p>
              <strong>{bureau.name}</strong>
            </p>
          ))}
          <FormattedMessage
            id="bureauError.docsMessage"
            defaultMessage="You can find the docs for this process"
          />
          <a href="http://docs.authentise.com/mes/index.html"> here.</a>
        </BS.Col>
      </BS.Row>
    </BS.Jumbotron>
  </BS.Grid>
);

BureauError.propTypes = {
  bureaus: PropTypes.arrayOf(PropTypes.object).isRequired,
  errors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BureauError;
