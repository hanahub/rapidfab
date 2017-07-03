import React, { Component } from 'react';
import Actions                           from 'rapidfab/actions'
import { connect }                       from 'react-redux'
import * as Selectors                    from 'rapidfab/selectors'

class Feature extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount() {
    const { props, props: { dispatch }} = this;
    dispatch(Actions.Api.wyatt.feature.list())
  }

  render() {
    const { features } = this.props;
    const DisplayFeature = () => {
      const feature = features.map((feature, index) => {
        <div>{feature.name}</div>
      })
      feature.name == this.props.featureName
      debugger
      if(feature.enabled && feature.name == this.props.featureName){
        return (<tbody>{ this.props.children }</tbody>)
      }else{
        return (<tbody></tbody>)
      }
    }
    return (
      <div>
        <DisplayFeature />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const feature = state.ui.wyatt.feature;
  return {
    features      : Selectors.getFeature(state),
    fetching      : feature.list.fetching,
    apiErrors     : feature.list.errors
  }
}

export default connect(mapStateToProps)(Feature)
