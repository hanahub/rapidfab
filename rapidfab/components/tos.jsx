import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Config from 'rapidfab/config';

import Fa from 'react-fontawesome';
import * as BS from 'react-bootstrap';

import { FormattedMessage } from 'react-intl';
import Logo from 'rapidfab/images/logo.png';

const TosLink = () => (
  <a href={Config.TOS_URL} target="_blank">
    <FormattedMessage id="tos" defaultMessage="Terms of Service" />
  </a>
);

class Tos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
    };

    this.handleAgree = this.handleAgree.bind(this);
  }

  handleAgree(e) {
    e.preventDefault();
    if (this.state.fetching) return;

    this.props.onAcceptTerms(this.props.user);

    this.setState({
      fetching: true,
    });
  }

  render() {
    const { fetching } = this.state;

    return (
      <BS.Grid>
        <BS.Row>
          <BS.Col xs={12}>
            <BS.Jumbotron style={{ textAlign: 'center' }}>
              <BS.Image src={Logo} />
              <h2 style={{ marginTop: '40px' }}>
                <FormattedMessage id="tos" defaultMessage="Terms of Service" />
              </h2>
              <p>
                <FormattedMessage
                  id="tosDescription"
                  defaultMessage="To use this software you must agree to the {tosLink}."
                  values={{ tosLink: <TosLink /> }}
                />
              </p>
              <BS.Button
                bsSize="small"
                bsStyle="primary"
                onClick={this.handleAgree}
                style={{ marginTop: '20px' }}
                disabled={fetching}
              >
                <Fa
                  name={fetching ? 'spinner' : 'thumbs-up'}
                  spin={fetching}
                />{' '}
                <FormattedMessage id="button.agree" defaultMessage="Agree" />
              </BS.Button>
            </BS.Jumbotron>
          </BS.Col>
        </BS.Row>
      </BS.Grid>
    );
  }
}

Tos.propTypes = {
  onAcceptTerms: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Tos;
