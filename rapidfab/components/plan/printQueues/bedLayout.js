import React, { PropTypes }                   from "react"
import _                                      from "lodash"
import * as BS                                from 'react-bootstrap'
import { FormattedMessage, FormattedDate }    from 'react-intl';

const layoutStyle = {
  height: 255,
  overflow: "hidden",
  position: "relative",
  padding: 0
}

const itemDefaultStyle = {
  position: "absolute"
}

const staticProps = [{
  height: 100,
  width: 200,
  top: 160,
  left: 0,
}, {
  height: 30,
  width: 75,
  top: 110,
  left: 160,
}, {
  height: 150,
  width: 150,
  top: 0,
  left: 0,
}, {
  height: 100,
  width: 100,
  top: 0,
  left: 160,
}, {
  height: 200,
  width: 100,
  top: 0,
  left: 270,
}]

const Item = ({ print, index }) => {
  const {
    order
  } = print
  const {
    model
  } = order
  const style = _.assign({}, itemDefaultStyle, staticProps[index])
  const src = `//placekitten.com/${style.width}/${style.height}`
  return (
    <BS.Image src={src} style={style} />
  )
}

const BedLayout = ({ prints, selected, onSelect }) => (
  <BS.Panel header="Bed Layout">
    <div style={layoutStyle}>
      {_.map(_.values(prints), (print, index) => <Item print={print} index={index} />)}
    </div>
  </BS.Panel>
)

export default BedLayout
