import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import Config                           from 'rapidfab/config'

import Fa                               from 'react-fontawesome'
import * as BS                          from 'react-bootstrap'

import { FormattedMessage }             from 'react-intl'
import Logo                             from 'rapidfab/images/logo.png'


const TosLink = ({ }) => (
  <a href="https://authentise.com/tech/etos.html" target="_blank">
    <FormattedMessage id="tos" defaultMessage='Terms of Service'/>
  </a>
)

class Tos extends Component {
  render() {
    const {
      user,
      onAcceptTerms,
    } = this.props

    return (
      <BS.Grid>
        <BS.Row>
          <BS.Col xs={12}>
            <BS.Jumbotron style={{ textAlign: "center" }}>
              <BS.Image src={Logo} />
              <h2 style={{ marginTop: "40px" }}><FormattedMessage id="tos" defaultMessage='Terms of Service'/></h2>
              <p>
                <FormattedMessage
                  id="tosDescription"
                  defaultMessage='To use this software you must agree to the {tosLink}.'
                  values={{ tosLink: <TosLink /> }}
                />
              </p>
              <BS.Button bsSize="small" bsStyle="primary" onClick={() => onAcceptTerms(user)} style={{ marginTop: "20px" }}>
                <Fa name='thumbs-up'/> <FormattedMessage id="button.agree" defaultMessage='Agree'/>
              </BS.Button>
            </BS.Jumbotron>
          </BS.Col>
        </BS.Row>
      </BS.Grid>
    );
  }
}

export default Tos
