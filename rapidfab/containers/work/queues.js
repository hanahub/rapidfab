import _                                from "lodash";
import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import { connect }                      from 'react-redux'
import QueuesComponent                  from 'rapidfab/components/work/queues'
import FakeData                         from 'rapidfab/fakeData';


const QueuesContainer = props => (
  <QueuesComponent {...props}/>
)

function mapDispatchToProps(dispatch) {
  return {
  }
}

function mapStateToProps(state) {
  const {
    fakeData
  } = state

  const {
    printer,
    post_processor
  } = fakeData

  let resources = _.assign({}, printer, post_processor)

  return {
    resources: _.orderBy(resources, 'name')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueuesContainer)
