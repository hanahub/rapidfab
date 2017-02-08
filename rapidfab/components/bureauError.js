import React                  from 'react'
import * as BS                from 'react-bootstrap'
import _                      from "lodash"

const BureauError = ({ bureaus }) => {
  let message = ''
  if(bureaus.length > 1) {
    message = 'You belong to multiple Bureaus. Only one Bureau is allowed when using MES. Please remove one of the Bureaus listed below.'
  } else {
    message = 'You are not assigned to any Bureaus. A Bureau is required to use MES.'
  }
  return (
    <BS.Grid fluid>
      <BS.Jumbotron>
        <BS.Row>
          <BS.Col xs={12}>
            <h1>Bureau Error!</h1>
            <p>{message}</p>
            {_.map(bureaus, bureau => (
              <p><strong>{bureau.name}</strong></p>
            ))}
            <p>You can find the docs for this process
              <a href="http://docs.authentise.com/mes/index.html"> Here!</a>
            </p>
          </BS.Col>
        </BS.Row>
      </BS.Jumbotron>
    </BS.Grid>
  )
}

export default BureauError
