import React from 'react';
import _ from 'lodash';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';

const layoutStyle = {
  height: 255,
  overflow: 'hidden',
  position: 'relative',
  padding: 0,
};

const itemDefaultStyle = {
  position: 'absolute',
};

const staticProps = [
  {
    height: 100,
    width: 200,
    top: 160,
    left: 0,
  },
  {
    height: 30,
    width: 75,
    top: 110,
    left: 160,
  },
  {
    height: 150,
    width: 150,
    top: 0,
    left: 0,
  },
  {
    height: 100,
    width: 100,
    top: 0,
    left: 160,
  },
  {
    height: 200,
    width: 100,
    top: 0,
    left: 270,
  },
];

const Header = () =>
  <BS.Row>
    <BS.Col xs={6}>Bed Layout</BS.Col>
    <BS.Col xs={6}>
      <BS.ButtonToolbar className="pull-right">
        <BS.Button bsSize="small" bsStyle="info">
          <Fa name="refresh" />
        </BS.Button>
      </BS.ButtonToolbar>
    </BS.Col>
  </BS.Row>;

const Item = ({ index }) => {
  const style = _.assign({}, itemDefaultStyle, staticProps[index]);
  const src = `//placehold.it/${style.width}/${style.height}`;
  return <BS.Image src={src} style={style} />;
};

const BedLayout = ({ prints }) =>
  <BS.Panel header={<Header />}>
    <div style={layoutStyle}>
      {_.map(_.values(prints), (print, index) =>
        <Item print={print} index={index} />
      )}
    </div>
  </BS.Panel>;

export default BedLayout;
