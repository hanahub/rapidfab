import React, { PropTypes }   from "react";
import * as BS                from 'react-bootstrap';
import Fa                     from 'react-fontawesome';
import { extractUuid }        from 'rapidfab/reducers/makeApiReducers'
import { FormattedMessage }   from 'react-intl';
import Grid, { IdColumn }     from 'rapidfab/components/grid';
import Error                  from 'rapidfab/components/error'

export const ContactColumn = ({ data, rowData, metadata }) => {
  if(rowData.contact === null) return <span><FormattedMessage id="notAvailable" defaultMessage='N/A'/></span>
  const recordsByUri = _.keyBy(metadata.records, 'uri')
  let record = recordsByUri[rowData.contact]
  if(!record) return <Fa name="spinner" spin/>
  return (
    <span>{record.username}</span>
  )
}

export const PhoneColumn = ({ data, rowData, metadata }) => {
  if(rowData.phone === null) {
    return <span><FormattedMessage id="notAvailable" defaultMessage='N/A'/></span>
  } else {
    return <span>{rowData.phone}</span>
  }
}

const LocationsGrid = ({ locations, users }) => (
  <Grid
    data={locations}
    columns={[
      "id",
      "name",
      "address",
      "contact",
      "phone",
    ]}
    columnMeta={[{
      displayName: <FormattedMessage id="field.id" defaultMessage='Id'/>,
      columnName: "id",
      customComponent: IdColumn("location"),
      locked: true
    }, {
      columnName: "name",
      displayName: <FormattedMessage id="field.name" defaultMessage='Name'/>
    }, {
      columnName: "address",
      displayName: <FormattedMessage id="field.address" defaultMessage='Address'/>
    }, {
      columnName: "phone",
      displayName: <FormattedMessage id="field.phone" defaultMessage='Phone'/>,
      customComponent: PhoneColumn,
    }, {
      columnName: "contact",
      displayName: <FormattedMessage id='field.contact' defaultMessage="contact"/>,
      customComponent: ContactColumn,
      records: users,
    }]}
  />
)

const Loading = () => (
  <div style={{ textAlign: "center" }}>
    <Fa name="spinner" spin size='2x' />
  </div>
)

const Locations = ({ locations, users, fetching, apiErrors }) => (
  <BS.Grid fluid>
    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item active={true}>
            <Fa name='list'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/inventory/locations">
            <Fa name='map-marker'/> <FormattedMessage id="inventory.locations" defaultMessage='Locations'/>
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button bsStyle="primary" bsSize="small" href="#/records/location" className="pull-right">
          <Fa name='plus'/> <FormattedMessage id="record.location.add" defaultMessage='Add Location'/>
        </BS.Button>
      </BS.Col>
    </BS.Row>

    <hr/>

    <BS.Row>
      <BS.Col xs={12}>
        <Error errors={apiErrors}/>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        {fetching ? <Loading/> : <LocationsGrid locations={locations} users={users}/>}
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

export default Locations
