import React                  from 'react'
import * as BS                from 'react-bootstrap'
import _                      from "lodash"
import { FormattedMessage }   from 'react-intl'

const BureauError = ({ bureaus }) => {
  let message = ''
  let id = ''
  if(bureaus.length > 1) {
    id = 'bureauError.multiple'
    message = 'You belong to multiple Bureaus. Only one Bureau is allowed when using MES. Please remove one of the Bureaus listed below. '
  } else {
    id = 'bureauError.empty'
    message = 'You are not assigned to any Bureaus. A Bureau is required to use MES. '
  }
  return (
    <BS.Grid fluid>
      <BS.Jumbotron>
        <BS.Row>
          <BS.Col xs={12}>
            <h1>Bureau Error!</h1>
            <FormattedMessage id={id} defaultMessage={message} />
            {_.map(bureaus, bureau => (
              <p><strong>{bureau.name}</strong></p>
            ))}
            <FormattedMessage id='bureauError.docsMessage' defaultMessage='You can find the docs for this process'/>
              <a href="http://docs.authentise.com/mes/index.html"> Here!</a>
          </BS.Col>
        </BS.Row>
      </BS.Jumbotron>
    </BS.Grid>
  )
}

export default BureauError
