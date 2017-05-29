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

class Template extends Component {
  constructor(props) {
    super(props)

    this.state = {
      template: {},
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
    this.onSave = this.onSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  closeOverwriteWarning() {
    this.setState({ showOverwriteWarning: false });
  }

  shouldOpenOverwriteWarning() {
    const { name, uuid } = this.props.fields;
    const { steps } = this.state;

    const hasNewName = name.initialValue !== name.value;
    const hasNewSteps = !_.isEqual(steps, this.props.steps);
    const isExistingTemplate = uuid.value;

    return (hasNewName || hasNewSteps) && isExistingTemplate;
  }

  openOverwriteWarning() {
    this.setState({ showOverwriteWarning: true });
  }

  closeStepForm() {
    this.setState({
      showStepForm: false,
      alteredStepIndex: null,
    })
  }

  openStepForm(index) {
    this.setState({
      showStepForm: true,
      alteredStepIndex: index,
    });
  }

  onDelete() {
    this.props.onDelete(this.props.route.uuid)
  }

  onDuplicate() {
    if (this.state.showOverwriteWarning)
      this.closeOverwriteWarning();

    const { value: name, initialValue: initialName } = this.props.fields.name;
    const duplicateName = name === initialName ? name + " copy" : name;

    const templateCopy = {
      bureau: this.props.bureau.uri,
      name: duplicateName,
      steps: this.state.steps,
    }
    this.props.onDuplicate(templateCopy);
  }

  onSave(event) {
    event.preventDefault()

    if (this.shouldOpenOverwriteWarning())
      this.openOverwriteWarning();
    else
      this.onSubmit();
  }

  onSubmit() {
    if (this.state.showOverwriteWarning)
      this.closeOverwriteWarning();

    let steps = _.clone(this.state.steps)

    //find deleted steps, save them for later
    const existingSteps = _.filter(steps, step => (_.has(step, "uri")))
    const deletedSteps = _.compact(_.map(this.props.steps, step => {
      if(!_.find(existingSteps, existingStep => (step.uri == existingStep.uri))) {
        return step.uuid
      }
    }))

    let uris = []
    _.map(steps, step => {
      if(!step.uri) {
        uris.push(this.props.submitStep(step).then(resp => {
          return resp.headers.location
        }))
      } else {
        const oldStep = _.find(this.props.steps, oldStep => (oldStep.uri == step.uri))

        if(oldStep) {
          if(_.difference(_.values(step), _.values(oldStep)).length) {
            uris.push(this.props.submitStep(step).then(resp => {
              return resp.json.uri
            }))
          } else {
            uris.push(step.uri)
          }
        }
      }
    })
    Promise.all(uris).then(uris => {
      let payload = _.cloneDeep(this.state.template)
      const bureau = this.props.bureau
      payload.bureau = payload.bureau ? payload.bureau : this.props.bureau.uri
      payload.description = payload.description ? payload.description : ""
      payload.process_steps = uris

      this.props.onSave(payload, deletedSteps);
    })


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

  addStep(payload) {

    const index = this.state.alteredStepIndex
    let steps = _.cloneDeep(this.state.steps)
    this.closeStepForm();

    if(index == null) {
      steps.push(payload)
    } else {
      const step = steps[index]
      if(step.uri)
        payload.uri = step.uri
      if(step.uuid)
        payload.uuid = step.uuid

      steps[index] = payload
    }

    this.setState({steps: steps})
  }

  componentDidUpdate(prevProps, prevState) {
    if(!this.state.haveReceivedProps && !this.props.fetching) {
      const template = this.props.template || {}
      this.setState({
        template: template,
        steps: this.props.steps,
        haveReceivedProps: true,
      })
    }
  }

  handleChange(event) {
    let template = this.state.template

    template[event.target.name] = event.target.value
    this.setState({ template: template })
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
          <td>{_.find(this.props.processTypes, {uri: step.process_type_uri}).name}</td>
          <td style={styles.centerIcons}>
            <div onClick={()=>{this.openStepForm(index)}}>
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

    const OverwriteWarningModal = ({ show, close, duplicate, submit }) => (
      <BS.Modal show={show} onHide={close}>
        <BS.Modal.Header closeButton>
          <BS.Modal.Title>
            Saving over an existing template could affect other orders.
          </BS.Modal.Title>
        </BS.Modal.Header>
        <BS.Modal.Body>
          Do you want to replace the existing template or duplicate a new one?
        </BS.Modal.Body>
        <BS.Modal.Footer>
          <BS.Button onClick={close}>Cancel</BS.Button>
          <BS.Button onClick={duplicate} bsStyle="primary">Duplicate</BS.Button>
          <BS.Button onClick={submit} bsStyle="success">Replace</BS.Button>
        </BS.Modal.Footer>
      </BS.Modal>
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
                <Fa name='list-ol'/> <FormattedMessage id="inventory.templates" defaultMessage='Templates'/>
              </BS.Breadcrumb.Item>
              <BS.Breadcrumb.Item>
                <Fa name='list-ol'/> {this.props.fields.id.value || <FormattedMessage id="record.template.new" defaultMessage='New Template'/>}
              </BS.Breadcrumb.Item>
            </BS.Breadcrumb>
          </BS.Col>
        </BS.Row>

        <form onSubmit={this.onSave}>
          <BS.Row>
            <BS.Col xs={6}>
              <BS.Button href="#/inventory/templates" bsSize="small">
                <Fa name='arrow-left'/> <FormattedMessage id="inventory.templates" defaultMessage='Templates'/>
              </BS.Button>
            </BS.Col>
            <BS.Col xs={6}>
              <BS.ButtonToolbar className="pull-right">
                <BS.SplitButton type="submit" id="uxSaveDropdown" bsStyle="success" bsSize="small" title={<SaveButtonTitle />} pullRight>
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
                    <BS.FormControl type="text" name="name" required onChange={this.handleChange} value={this.state.template.name}/>
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
                  <BS.Button bsStyle="success" className="pull-right" onClick={() => {this.openStepForm(null)}}>Add Step</BS.Button>
                </BS.Col>
              </BS.Row>

            </BS.Col>
          </BS.Row>
        </form>

        <StepFormModal
          show={this.state.showStepForm}
          close={this.closeStepForm}
          submit={this.addStep}
          data={this.state.steps[this.state.alteredStepIndex]}
          processTypes={this.props.processTypes}
        />
        <OverwriteWarningModal
          show={this.state.showOverwriteWarning}
          close={this.closeOverwriteWarning}
          duplicate={this.onDuplicate}
          submit={this.onSubmit} />

      </BS.Grid>
    )
  }
}

class StepFormModal extends Component {
  constructor(props) {
    super(props)

    // The modal gets mounted and unmounted on open and close, thus we populate every time we open
    const data = props.data || {}
    this.state = {
      step: {
        notes:             "optional",
        upload:            "optional",
        success:           "optional",
        tracking_id:       "hidden",
        process_type_uri:  "",
      },
      stepReset: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.show && !nextState.stepReset) {
      const data = nextProps.data || {}
      const stepInfo = {
          notes:             data.notes || "optional",
          upload:            data.upload || "optional",
          success:           data.success || "optional",
          tracking_id:       data.tracking_id || "hidden",
          process_type_uri:  data.process_type_uri || "",
      }
      this.setState({step: stepInfo, stepReset: true})
    } else if(!nextProps.show && nextState.stepReset) {
      this.setState({stepReset: false})
    }
  }

  handleChange(event) {
    // we need to pull out the step so we can modify and overwrite, since setstate cant merge objects
    let step = this.state.step
    step[event.target.name] = event.target.value

    this.setState({ step: step })
  }

  onSubmit(event) {
    event.preventDefault()

    this.props.submit(this.state.step)
  }

  render() {
    return(
      <BS.Modal show={this.props.show} onHide={this.props.close}>
        <form onSubmit={this.onSubmit}>
          <BS.Modal.Header closeButton>
            <BS.Modal.Title>Step Form</BS.Modal.Title>
          </BS.Modal.Header>
          <BS.Modal.Body>
              <BS.FormGroup controlId="formControlsSelect">
                <BS.ControlLabel>Process Type</BS.ControlLabel>
                <BS.FormControl componentClass="select" name="process_type_uri" onChange={this.handleChange} value={this.state.step.process_type_uri} required>
                  <option value="" selected disabled>Select a Process Step</option>
                  {_.map(this.props.processTypes, processType => (
                    <option value={processType.uri} key={processType.uri}>{processType.name}</option>
                  ))}
                </BS.FormControl>
              </BS.FormGroup>
              <BS.FormGroup className="clearfix" name="notes">
                <BS.ControlLabel className="pull-left">Notes</BS.ControlLabel>
                <div className="pull-right">
                  <BS.Radio name="notes" onChange={this.handleChange} checked={this.state.step.notes == "optional"} value="optional" inline>Optional</BS.Radio>
                  <BS.Radio name="notes" onChange={this.handleChange} checked={this.state.step.notes == "required"} value="required" inline>Required</BS.Radio>
                  <BS.Radio name="notes" onChange={this.handleChange} checked={this.state.step.notes == "hidden"}   value="hidden"   inline>hidden</BS.Radio>
                </div>
              </BS.FormGroup>
              <BS.FormGroup className="clearfix" name="upload">
                <BS.ControlLabel className="pull-left">Upload</BS.ControlLabel>
                <div className="pull-right">
                  <BS.Radio name="upload" onChange={this.handleChange} checked={this.state.step.upload == "optional"} value="optional" inline>Optional</BS.Radio>
                  <BS.Radio name="upload" onChange={this.handleChange} checked={this.state.step.upload == "required"} value="required" inline>Required</BS.Radio>
                  <BS.Radio name="upload" onChange={this.handleChange} checked={this.state.step.upload == "hidden"}   value="hidden"   inline>hidden</BS.Radio>
                </div>
              </BS.FormGroup>
              <BS.FormGroup className="clearfix" name="success">
                <BS.ControlLabel className="pull-left">Success</BS.ControlLabel>
                <div className="pull-right">
                  <BS.Radio name="success" onChange={this.handleChange} checked={this.state.step.success == "optional"} value="optional" inline>Optional</BS.Radio>
                  <BS.Radio name="success" onChange={this.handleChange} checked={this.state.step.success == "required"} value="required" inline>Required</BS.Radio>
                  <BS.Radio name="success" onChange={this.handleChange} checked={this.state.step.success == "hidden"}   value="hidden"   inline>hidden</BS.Radio>
                </div>
              </BS.FormGroup>
          </BS.Modal.Body>
          <BS.Modal.Footer>
            <BS.Button onClick={this.props.close}>Cancel</BS.Button>
            <BS.Button type="submit" bsStyle="success">Add</BS.Button>
          </BS.Modal.Footer>
        </form>
      </BS.Modal>
    )
  }
}

export default Template
