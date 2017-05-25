import React, { Component, PropTypes }     from "react";
import * as BS                             from 'react-bootstrap';
import Fa                                  from 'react-fontawesome';
import { FormattedMessage }                from 'react-intl';
import Error                               from 'rapidfab/components/error';
import { FormControlTextCareful }          from 'rapidfab/components/formTools';

const styles = {
  positionHeader: {
    width: "5%",
  },
  stepHeader: {
    width: "90%",
  },
  optionsHeader: {
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
      showStepForm: false,
      showOverwriteWarning: false,
    }

    this.closeOverwriteWarning = this.closeOverwriteWarning.bind(this);
    this.shouldOpenOverwriteWarning = this.shouldOpenOverwriteWarning.bind(this);
    this.openOverwriteWarning = this.openOverwriteWarning.bind(this);
    this.closeStepForm = this.closeStepForm.bind(this);
    this.openStepForm = this.openStepForm.bind(this);
    this.addStep = this.addStep.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDuplicate = this.onDuplicate.bind(this);
  }

  closeOverwriteWarning() {
    this.setState({ showOverwriteWarning: false });
  }

  shouldOpenOverwriteWarning() {
    // TODO: check if name of template is used already
    // if so, return true
    // else, return false
    return true;
  }

  openOverwriteWarning() {
    if (this.shouldOpenOverwriteWarning())
      this.setState({ showOverwriteWarning: true });
    else
      this.onSubmit();
  }

  closeStepForm() {
    this.setState({ showStepForm: false })
  }

  openStepForm() {
    this.setState({ showStepForm: true });
  }

  onDelete() {
    this.props.onDelete(this.props.route.uuid)
  }

  onDuplicate() {
    const templateCopy = {
      bureau: this.props.bureau.uri,
      name: this.props.fields.name.value + " copy",
      steps: this.state.steps,
    }
    this.props.onDuplicate(templateCopy);
  }

  onSubmit() {
    if (this.state.showOverwriteWarning)
      this.closeOverwriteWarning();

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

  deleteStep(index) {
    let steps = _.cloneDeep(this.state.steps)
    _.pullAt(steps, index) //js sucks at poping items at a given index

    this.setState({steps: steps})
  }

  addStep() {
    this.closeStepForm();
    let steps = _.cloneDeep(this.state.steps)

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
          <td>{step.name}</td>
          <td style={styles.centerIcons}>
            <div onClick={()=>{this.openStepForm()}}>
              <Fa name='edit'/>
            </div>
          </td>
          <td style={styles.centerIcons}>
            <div onClick={()=>{this.deleteStep(index)}}>
              <Fa name='times'/>
            </div>
          </td>
        </tr>
      ))

      return(<tbody>{rows}</tbody>)
    }

    const OverwriteWarningModal = ({ show, close, submit }) => (
      <BS.Modal show={show} onHide={close}>
        <BS.Modal.Header closeButton>
          <BS.Modal.Title>
            A template with the same name already exists.
          </BS.Modal.Title>
        </BS.Modal.Header>
        <BS.Modal.Body>
          Do you want to replace the existing template?
        </BS.Modal.Body>
        <BS.Modal.Footer>
          <BS.Button onClick={close}>Cancel</BS.Button>
          <BS.Button onClick={submit} bsStyle="success">Replace</BS.Button>
        </BS.Modal.Footer>
      </BS.Modal>
    )

    const StepFormModal = ({ show, close, submit }) => (
      <BS.Modal show={show} onHide={close}>
        <BS.Modal.Header closeButton>
          <BS.Modal.Title>Step Form</BS.Modal.Title>
        </BS.Modal.Header>
        <BS.Modal.Body>
          <StepForm />
        </BS.Modal.Body>
        <BS.Modal.Footer>
          <BS.Button onClick={close}>Cancel</BS.Button>
          <BS.Button onClick={submit} bsStyle="success">Add</BS.Button>
        </BS.Modal.Footer>
      </BS.Modal>
    )

    const StepForm = () => (
      <form>
        <BS.FormGroup controlId="formControlsSelect">
          <BS.ControlLabel>Process step</BS.ControlLabel>
          <BS.FormControl componentClass="select" placeholder="select">
            <option value="select">select</option>
            <option value="other">...</option>
          </BS.FormControl>
        </BS.FormGroup>
        <BS.FormGroup className="clearfix">
          <BS.ControlLabel className="pull-left">Notes</BS.ControlLabel>
          <div className="pull-right">
            <BS.Radio name="notes" inline>None</BS.Radio>
            <BS.Radio name="notes" inline>Optional</BS.Radio>
            <BS.Radio name="notes" inline>Required</BS.Radio>
          </div>
        </BS.FormGroup>
        <BS.FormGroup className="clearfix">
          <BS.ControlLabel className="pull-left">Upload</BS.ControlLabel>
          <div className="pull-right">
            <BS.Radio name="notes" inline>None</BS.Radio>
            <BS.Radio name="notes" inline>Optional</BS.Radio>
            <BS.Radio name="notes" inline>Required</BS.Radio>
          </div>
        </BS.FormGroup>
        <BS.FormGroup className="clearfix">
          <BS.ControlLabel className="pull-left">Success</BS.ControlLabel>
          <div className="pull-right">
            <BS.Radio name="notes" inline>None</BS.Radio>
            <BS.Radio name="notes" inline>Optional</BS.Radio>
            <BS.Radio name="notes" inline>Required</BS.Radio>
          </div>
        </BS.FormGroup>
      </form>
    )

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
              <BS.SplitButton onClick={this.openOverwriteWarning} id="uxSaveDropdown" bsStyle="success" bsSize="small" title={<SaveButtonTitle />} pullRight>
                <BS.MenuItem eventKey={1} onClick={() => this.onDelete(this.props.fields.uuid.value)} disabled={!this.props.fields.id.value}>
                  <Fa name='ban'/> <FormattedMessage id="button.delete" defaultMessage='Delete'/>
                </BS.MenuItem>
                <BS.MenuItem eventKey={2} onClick={() => this.onDuplicate()} disabled={!this.props.fields.id.value}>
                  <Fa name='clone'/> <FormattedMessage id="button.duplicate" defaultMessage='Duplicate'/>
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
              <BS.Col xs={12} sm={8} smOffset={2} lg={6} lgOffset={3}>
                <BS.FormGroup>
                  <BS.ControlLabel>Template Name</BS.ControlLabel>
                  <FormControlTextCareful type="text" required {...this.props.fields.name} />
                </BS.FormGroup>
              </BS.Col>
            </BS.Row>

            <BS.Row>
              <BS.Col xs={12} sm={8} smOffset={2} lg={6} lgOffset={3}>
                <BS.Table responsive hover>
                  <thead>
                    <tr>
                      <th style={styles.positionHeader}>Position</th>
                      <th style={styles.stepHeader}>Step</th>
                      <th style={styles.optionsHeader}>Edit</th>
                      <th style={styles.optionsHeader}>Delete</th>
                    </tr>
                  </thead>
                  <Rows />
                </BS.Table>
                <BS.Button bsStyle="success" className="pull-right" onClick={this.openStepForm}>Add Step</BS.Button>
              </BS.Col>
            </BS.Row>

          </BS.Col>
        </BS.Row>

        <StepFormModal
          show={this.state.showStepForm}
          close={this.closeStepForm}
          submit={this.addStep} />
        <OverwriteWarningModal
          show={this.state.showOverwriteWarning}
          close={this.closeOverwriteWarning}
          submit={this.onSubmit} />

      </BS.Grid>
    )
  }
}

export default Template
