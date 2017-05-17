import React, { Component, PropTypes }     from "react"
import * as BS                  from 'react-bootstrap';
import Fa                       from 'react-fontawesome';
import { FormattedMessage }     from 'react-intl';
import Error                  from 'rapidfab/components/error'


const SaveButtonTitle = ({  }) => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
)

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


class Template extends Component {
  constructor(props) {
    super(props)

    this.state = {
      steps: [],
    }

  }

  onDelete(event) {
    this.props.onDelete(this.props.route.uuid)
  }

  onSubmit(event) {
    event.preventDefault();
    const payoad = {

    };
    this.props.onSubmit(payload);
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
    steps.unshift({name: "im a step"})

    this.setState({steps: steps})
  }

  render() {
    const Arrows = ({ index }) => {
      return(
        <div>
          <div onClick={()=>{this.moveRow(index, "up")}} style={_.assign({}, styles.centerIcons, styles.splitDivs)}>
            <Fa name='caret-up' size="2x"/>
          </div>
          <div onClick={()=>{this.moveRow(index, "down")}} style={_.assign({}, styles.centerIcons, styles.splitDivs)}>
            <Fa name='caret-down' size="2x"/>
          </div>
        </div>
      );
    };

    const Rows = ({ steps }) => {
      const rows = _.map(steps, (step, index) => (
        <tr>
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
              <BS.SplitButton id="uxSaveDropdown" type="submit" bsStyle="success" bsSize="small" title={<SaveButtonTitle />} pullRight>
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
                  <Rows steps={this.state.steps}/>
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
