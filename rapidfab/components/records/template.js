import React, { Component, PropTypes }     from "react"
import * as BS                  from 'react-bootstrap';
import Fa                       from 'react-fontawesome';
import { FormattedMessage }     from 'react-intl';
import Error                  from 'rapidfab/components/error'



const styles = {
  positionHeader: {
    width: "5%",
  },
  stepHeader: {
    width: "90%",
  },
  deleteHeader: {
    width: "5%",
  },
  centerIcons: {
    textAlign: "center"
  },
  splitDivs: {
    display: "inline-block",
    width: "50%",
  }
};

const SaveButtonTitle = () => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
)

const Loader = () => (
  <BS.Row>
    <BS.Col xs={12}>
      <Fa name="spinner" spin/>
    </BS.Col>
  </BS.Row>
)

class Template extends Component {
  constructor(props) {
    super(props)

    this.state = {
      steps: [],
      haveReceivedProps: false,
      name: "",
      showModal: false,
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onDelete(event) {
    this.props.onDelete(this.props.route.uuid)
  }

  onSubmit(event) {
    event.preventDefault();

    let steps = this.state.steps
    const existingSteps = _.filter(steps, step => (_.has(step, "uri")))

    //find deleted steps, save them for later
    const deletedSteps = _.compact(_.map(this.props.steps, step => {
      if(!_.find(existingSteps, existingStep => (step.uri == existingStep.uri))) {
        return step.uri
      }
    }))

    _.map(steps, step => {
      if(!step.uri) {
        //TODO create this resource
        //TODO add uri to step
      } else {
        const oldStep = _.find(this.props.steps, oldStep => (oldStep.uri == step.uri))

        if(_.difference(_.values(step), _.values(oldStep))) {
          //TODO update this resource
        }
      }
    })

    const payload = {
      bureau       : this.props.bureau.uri,
      name         : this.state.name,
      process_steps: steps,
    }

    // this.props.onSubmit(payload);
    //TODO after submit to template, we should delete any possible deleted steps the user got rid of to keep orphans from being created
  }

  moveRow(index, direction) {
    // first ignore anything thats already at the top going up
    // or at the bottom going down
    if(index == 0 && direction == "up") {
      return
    }
    else if(this.state.steps.length-1 == index && direction == "down") {
      return
    }

    let steps = _.cloneDeep(this.state.steps)
    const newPosition = direction == "up" ? index - 1 : index + 1

    const temp = steps[newPosition]
    steps[newPosition] = steps[index]
    steps[index] = temp

    this.setState({steps: steps})
  }

  deleteRow(index) {
    let steps = _.cloneDeep(this.state.steps)
    _.pullAt(steps, index) //js sucks at poping items at a given index

    this.setState({steps: steps})
  }

  addRow() {
    let steps = _.cloneDeep(this.state.steps)

    // modal coming soon

    this.setState({steps: steps})
  }

  componentDidUpdate(prevProps, prevState) {
    if(!this.state.haveReceivedProps && this.props.steps.length) {
      this.setState({
        steps: this.props.steps,
        haveReceivedProps: true,
      })
    }
  }

  render() {
    const Arrows = ({ index }) => {
      return(
        <div>
          <div onClick={()=>{this.moveRow(index, "down")}} style={_.assign({}, styles.centerIcons, styles.splitDivs)}>
            <Fa name='angle-down' size="2x"/>
          </div>
          <div onClick={()=>{this.moveRow(index, "up")}} style={_.assign({}, styles.centerIcons, styles.splitDivs)}>
            <Fa name='angle-up' size="2x"/>
          </div>
        </div>
      );
    };

    const Rows = () => {
      const rows = _.map(this.state.steps, (step, index) => (
        <tr key={index}>
          <td><Arrows index={index} /></td>
          <td style={{width: "90%"}}>{step.name}</td>
          <td style={styles.centerIcons}>
            <div onClick={()=>{this.deleteRow(index)}}>
              <Fa name='times'/>
            </div>
          </td>
        </tr>
      ))

      return(<tbody>{rows}</tbody>)
    }

    return(
      <BS.Grid fluid>
        <BS.Row>
          <BS.Col xs={12}>
            <BS.Breadcrumb>
            <BS.Breadcrumb.Item active={true}>
                <Fa name='list'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
              </BS.Breadcrumb.Item>
              <BS.Breadcrumb.Item href="#/inventory/templates">
                <Fa name='object-group'/> <FormattedMessage id="inventory.templates" defaultMessage='Templates'/>
              </BS.Breadcrumb.Item>
              <BS.Breadcrumb.Item>
                <Fa name='object-group'/> {this.props.fields.id.value || <FormattedMessage id="record.template.new" defaultMessage='New Template'/>}
              </BS.Breadcrumb.Item>
            </BS.Breadcrumb>
          </BS.Col>
        </BS.Row>

        <BS.Row>
          <BS.Col xs={6}>
            <BS.Button href="#/inventory/templates" bsSize="small">
              <Fa name='arrow-left'/> <FormattedMessage id="inventory.templates" defaultMessage='Templates'/>
            </BS.Button>
          </BS.Col>
          <BS.Col xs={6}>
            <BS.ButtonToolbar className="pull-right">
              <BS.SplitButton onClick={this.onSubmit} id="uxSaveDropdown" type="submit" bsStyle="success" bsSize="small" title={<SaveButtonTitle />} pullRight>
                <BS.MenuItem eventKey={1} onClick={() => this.onDelete(this.props.fields.uuid.value)} disabled={!this.props.fields.id.value}>
                  <Fa name='ban'/> <FormattedMessage id="button.delete" defaultMessage='Delete'/>
                </BS.MenuItem>
              </BS.SplitButton>
            </BS.ButtonToolbar>
          </BS.Col>
        </BS.Row>

        <hr/>

        <BS.Row>
          <BS.Col xs={12}>
            <Error errors={this.props.apiErrors}/>
          </BS.Col>
        </BS.Row>

        <BS.Row>
          <BS.Col xs={12}>

            <BS.Row>
              <BS.Col xsOffset={3} xs={6}>
                <BS.Button bsStyle="success" className="pull-right" onClick={() => {this.addRow()}}>Add Step</BS.Button>
              </BS.Col>
            </BS.Row>

            <BS.Row>
              <BS.Col xsOffset={3} xs={6}>
                <BS.Table responsive hover>
                  <thead>
                    <tr>
                      <th style={styles.positionHeader}>Position</th>
                      <th style={styles.stepHeader}>Step</th>
                      <th style={styles.deleteHeader}>Delete</th>
                    </tr>
                  </thead>
                  <Rows />
                </BS.Table>
              </BS.Col>
            </BS.Row>

          </BS.Col>
        </BS.Row>
      </BS.Grid>
    )
  }
}

export default Template
