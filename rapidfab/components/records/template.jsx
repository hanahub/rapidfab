import React, { Component } from 'react';
import _ from 'lodash';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import Error from 'rapidfab/components/error';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const styles = {
  positionHeader: {
    width: '5%',
  },
  stepHeader: {
    width: '90%',
  },
  optionsHeader: {
    width: '5%',
  },
  centerIcons: {
    textAlign: 'center',
  },
  splitDivs: {
    display: 'inline-block',
    width: '50%',
  },
};

const OverwriteWarningModal = ({ show, close, duplicate, submit }) => (
  <BS.Modal show={show} onHide={close}>
    <BS.Modal.Header closeButton>
      <BS.Modal.Title>
        <FormattedMessage
          id="message.overwriteWarning"
          defaultMessage="Saving over an existing template could affect other orders."
        />
      </BS.Modal.Title>
    </BS.Modal.Header>
    <BS.Modal.Body>
      <FormattedMessage
        id="message.overwritePrompt"
        defaultMessage="Do you want to replace the existing template or duplicate a new one?"
      />
    </BS.Modal.Body>
    <BS.Modal.Footer>
      <BS.Button onClick={close}>
        <FormattedMessage id="button.cancel" defaultMessage="Cancel" />
      </BS.Button>
      <BS.Button onClick={duplicate} bsStyle="primary">
        <FormattedMessage id="button.duplicate" defaultMessage="Duplicate" />
      </BS.Button>
      <BS.Button onClick={submit} bsStyle="success">
        <FormattedMessage id="button.replace" defaultMessage="Replace" />
      </BS.Button>
    </BS.Modal.Footer>
  </BS.Modal>
);

const DeleteWarningModal = ({ show, close, name, id, submit }) => (
  <BS.Modal show={show} onHide={close}>
    <BS.Modal.Header closeButton>
      <FormattedMessage
        id="message.deletePrompt"
        defaultMessage="Are you sure you want to delete"
      />
      {` ${name}?`}
    </BS.Modal.Header>
    <BS.Modal.Footer>
      <BS.Button onClick={close}>
        <FormattedMessage id="button.cancel" defaultMessage="Cancel" />
      </BS.Button>
      <BS.Button onClick={() => submit(id)} bsStyle="danger">
        <FormattedMessage id="button.delete" defaultMessage="Delete" />
      </BS.Button>
    </BS.Modal.Footer>
  </BS.Modal>
);

class StepFormModal extends Component {
  constructor(props) {
    super(props);

    // The modal gets mounted and unmounted on open and close, thus we populate every time we open
    this.state = {
      step: {
        notes: 'optional',
        upload: 'optional',
        success: 'optional',
        tracking_id: 'hidden',
        process_type_uri: '',
      },
      stepReset: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.show && !nextState.stepReset) {
      const data = nextProps.data || {};
      const stepInfo = {
        notes: data.notes || 'optional',
        upload: data.upload || 'optional',
        success: data.success || 'optional',
        tracking_id: data.tracking_id || 'hidden',
        process_type_uri: data.process_type_uri || '',
      };
      this.setState({ step: stepInfo, stepReset: true });
    } else if (!nextProps.show && nextState.stepReset) {
      this.setState({ stepReset: false });
    }
  }

  handleChange(event) {
    const { step } = this.state;
    const { name, value } = event.target;
    step[name] = value;
    this.setState({ step });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.submit(this.state.step);
  }

  render() {
    const { show, close, processTypes, data } = this.props;
    const { step } = this.state;
    return (
      <BS.Modal show={show} onHide={close}>
        <form onSubmit={this.onSubmit}>
          <BS.Modal.Header closeButton />
          <BS.Modal.Body>
            <BS.FormGroup controlId="formControlsSelect">
              <BS.ControlLabel>
                <FormattedMessage
                  id="field.processType"
                  defaultMessage="Process Type"
                />
              </BS.ControlLabel>
              <BS.FormControl
                componentClass="select"
                name="process_type_uri"
                onChange={this.handleChange}
                value={step.process_type_uri}
                required
              >
                <option value="" selected disabled>
                  Select a Process Step
                </option>
                {processTypes.map(processType => (
                  <option value={processType.uri} key={processType.uri}>
                    {processType.name}
                  </option>
                ))}
              </BS.FormControl>
            </BS.FormGroup>
            <BS.FormGroup className="clearfix" name="notes">
              <BS.ControlLabel className="pull-left">
                <FormattedMessage id="field.notes" defaultMessage="Notes" />
              </BS.ControlLabel>
              <div className="pull-right">
                <BS.Radio
                  name="notes"
                  onChange={this.handleChange}
                  checked={step.notes === 'optional'}
                  value="optional"
                  inline
                >
                  <FormattedMessage
                    id="field.optional"
                    defaultMessage="Optional"
                  />
                </BS.Radio>
                <BS.Radio
                  name="notes"
                  onChange={this.handleChange}
                  checked={step.notes === 'required'}
                  value="required"
                  inline
                >
                  <FormattedMessage
                    id="field.required"
                    defaultMessage="Required"
                  />
                </BS.Radio>
                <BS.Radio
                  name="notes"
                  onChange={this.handleChange}
                  checked={step.notes === 'hidden'}
                  value="hidden"
                  inline
                >
                  <FormattedMessage id="field.hidden" defaultMessage="Hidden" />
                </BS.Radio>
              </div>
            </BS.FormGroup>
            {/* <BS.FormGroup className="clearfix" name="upload">
                <BS.ControlLabel className="pull-left">
                  <FormattedMessage id="field.upload" defaultMessage="Upload"/>
                </BS.ControlLabel>
                <div className="pull-right">
                  <BS.Radio
                    name="upload"
                    onChange={this.handleChange}
                    checked={step.upload == "optional"}
                    value="optional"
                    inline>
                    <FormattedMessage id="field.optional" defaultMessage="Optional"/>
                  </BS.Radio>
                  <BS.Radio
                    name="upload"
                    onChange={this.handleChange}
                    checked={step.upload == "required"}
                    value="required"
                    inline>
                    <FormattedMessage id="field.required" defaultMessage="Required"/>
                  </BS.Radio>
                  <BS.Radio
                    name="upload"
                    onChange={this.handleChange}
                    checked={step.upload == "hidden"}
                    value="hidden"
                    inline>
                    <FormattedMessage id="field.hidden" defaultMessage="Hidden"/>
                  </BS.Radio>
                </div>
              </BS.FormGroup>
              <BS.FormGroup className="clearfix" name="success">
                <BS.ControlLabel className="pull-left">
                  <FormattedMessage id="field.success" defaultMessage="Success"/>
                </BS.ControlLabel>
                <div className="pull-right">
                  <BS.Radio
                    name="success"
                    onChange={this.handleChange}
                    checked={step.success == "optional"}
                    value="optional"
                    inline>
                    <FormattedMessage id="field.optional" defaultMessage="Optional"/>
                  </BS.Radio>
                  <BS.Radio
                    name="success"
                    onChange={this.handleChange}
                    checked={step.success == "required"}
                    value="required"
                    inline>
                    <FormattedMessage id="field.required" defaultMessage="Required"/>
                  </BS.Radio>
                  <BS.Radio
                    name="success"
                    onChange={this.handleChange}
                    checked={step.success == "hidden"}
                    value="hidden"
                    inline>
                    <FormattedMessage id="field.hidden" defaultMessage="Hidden"/>
                  </BS.Radio>
                </div>
              </BS.FormGroup> */}
          </BS.Modal.Body>
          <BS.Modal.Footer>
            <BS.Button onClick={close}>
              <FormattedMessage id="button.cancel" defaultMessage="Cancel" />
            </BS.Button>
            <BS.Button type="submit" bsStyle="success">
              {data ? (
                <FormattedMessage id="button.save" defaultMessage="Save" />
              ) : (
                <FormattedMessage id="button.add" defaultMessage="Add" />
              )}
            </BS.Button>
          </BS.Modal.Footer>
        </form>
      </BS.Modal>
    );
  }
}

class Template extends Component {
  constructor(props) {
    super(props);

    this.state = {
      template: {},
      steps: [],
      haveReceivedProps: false,
      showStepForm: false,
      showOverwriteWarning: false,
      showDeleteWarning: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.shouldOpenOverwriteWarning = this.shouldOpenOverwriteWarning.bind(
      this
    );
    this.onSave = this.onSave.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDuplicate = this.onDuplicate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.addStep = this.addStep.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.haveReceivedProps && !this.props.fetching) {
      const template = this.props.template || {};
      this.setState({
        template,
        steps: this.props.steps,
        haveReceivedProps: true,
      });
    }
  }

  handleChange(event) {
    const { template } = this.state;
    const { name, value } = event.target;
    template[name] = value;
    this.setState({ template });
  }

  openModal(modalState, stepIndex) {
    if (typeof stepIndex === 'number') {
      this.setState({
        [modalState]: true,
        alteredStepIndex: stepIndex,
      });
    } else {
      this.setState({ [modalState]: true });
    }
  }

  closeModal(modalState) {
    if (this.state.alteredStepIndex !== null) {
      this.setState({
        [modalState]: false,
        alteredStepIndex: null,
      });
    } else {
      this.setState({ [modalState]: false });
    }
  }

  shouldOpenOverwriteWarning() {
    const { name: initialName, uuid: isExistingTemplate } = this.props.values;
    const { steps } = this.state;
    const { name: currentName } = this.state.template;
    const hasNewName = initialName !== currentName;
    const hasNewSteps = !_.isEqual(steps, this.props.steps);
    return (hasNewName || hasNewSteps) && isExistingTemplate;
  }

  onSave(event) {
    event.preventDefault();
    if (this.shouldOpenOverwriteWarning()) {
      this.openModal('showOverwriteWarning');
    } else {
      this.onSubmit();
    }
  }

  onSubmit() {
    if (this.state.showOverwriteWarning) {
      this.closeModal('showOverwiteWarning');
    }

    const steps = _.clone(this.state.steps);

    // find deleted steps, save them for later
    const existingSteps = _.filter(steps, step => _.has(step, 'uri'));
    const deletedSteps = _.compact(
      _.map(this.props.steps, step => {
        if (
          !_.find(existingSteps, existingStep => step.uri === existingStep.uri)
        ) {
          return step.uuid;
        }
      })
    );

    const uris = [];
    _.map(steps, step => {
      if (!step.uri) {
        uris.push(
          this.props.submitStep(step).then(resp => resp.headers.location)
        );
      } else {
        const oldStep = _.find(
          this.props.steps,
          oldStep => oldStep.uri === step.uri
        );

        if (oldStep) {
          if (_.difference(_.values(step), _.values(oldStep)).length) {
            uris.push(this.props.submitStep(step).then(resp => resp.json.uri));
          } else {
            uris.push(step.uri);
          }
        }
      }
    });
    Promise.all(uris).then(uris => {
      const payload = _.cloneDeep(this.state.template);
      payload.bureau = payload.bureau ? payload.bureau : this.props.bureau.uri;
      payload.description = payload.description ? payload.description : '';
      payload.process_steps = uris;

      this.props.onSave(payload, deletedSteps);
    });
  }

  onDuplicate() {
    if (this.state.showOverwriteWarning) {
      this.closeModal('showOverwriteWarning');
    }

    const { value: name, initialValue: initialName } = this.props.fields.name;
    const duplicateName = name === initialName ? `${name} copy` : name;

    const templateCopy = {
      bureau: this.props.bureau.uri,
      name: duplicateName,
      steps: this.state.steps,
    };
    this.props.onDuplicate(templateCopy);
  }

  onDelete() {
    this.closeModal('showDeleteWarning');
    this.props.onDelete(this.props.route.uuid);
  }

  addStep(payload) {
    const index = this.state.alteredStepIndex;
    const steps = _.cloneDeep(this.state.steps);
    this.closeModal('showStepForm');

    if (index == null) {
      steps.push(payload);
    } else {
      const step = steps[index];
      if (step.uri) {
        payload.uri = step.uri;
      }
      if (step.uuid) {
        payload.uuid = step.uuid;
      }

      steps[index] = payload;
    }

    this.setState({ steps });
  }

  moveRow(index, direction) {
    // first ignore anything thats already at the top going up
    // or at the bottom going down
    if (index === 0 && direction === 'up') {
      return;
    } else if (this.state.steps.length - 1 === index && direction === 'down') {
      return;
    }

    const steps = _.cloneDeep(this.state.steps);
    const newPosition = direction === 'up' ? index - 1 : index + 1;

    const temp = steps[newPosition];
    steps[newPosition] = steps[index];
    steps[index] = temp;

    this.setState({ steps });
  }

  deleteStep(index) {
    const steps = _.cloneDeep(this.state.steps);
    _.pullAt(steps, index); // js sucks at poping items at a given index

    this.setState({ steps });
  }

  render() {
    const Arrows = ({ index }) => (
      <div>
        <div
          onClick={() => {
            this.moveRow(index, 'down');
          }}
          style={_.assign({}, styles.centerIcons, styles.splitDivs)}
        >
          <Fa name="angle-down" size="2x" />
        </div>
        <div
          onClick={() => {
            this.moveRow(index, 'up');
          }}
          style={_.assign({}, styles.centerIcons, styles.splitDivs)}
        >
          <Fa name="angle-up" size="2x" />
        </div>
      </div>
    );

    const Rows = () => {
      const rows = _.map(this.state.steps, (step, index) => (
        <tr key={index}>
          <td>
            <Arrows index={index} />
          </td>
          <td>
            {
              _.find(this.props.processTypes, { uri: step.process_type_uri })
                .name
            }
          </td>
          <td style={styles.centerIcons}>
            <div onClick={() => this.openModal('showStepForm', index)}>
              <Fa name="edit" />
            </div>
          </td>
          <td style={styles.centerIcons}>
            <div onClick={() => this.deleteStep(index)}>
              <Fa name="times" />
            </div>
          </td>
        </tr>
      ));

      return <tbody>{rows}</tbody>;
    };

    const {
      template,
      steps,
      alteredStepIndex,
      showStepForm,
      showOverwriteWarning,
      showDeleteWarning,
    } = this.state;
    const { values, processTypes, apiErrors } = this.props;

    return (
      <BS.Grid fluid>
        <BreadcrumbNav breadcrumbs={['templates', template.id || 'New']} />

        <form onSubmit={this.onSave}>
          <div className="clearfix">
            <BS.ButtonToolbar className="pull-right">
              <BS.SplitButton
                type="submit"
                id="uxSaveDropdown"
                bsStyle="success"
                bsSize="small"
                title={<SaveButtonTitle />}
                pullRight
              >
                <BS.MenuItem
                  eventKey={1}
                  onClick={() => this.openModal('showDeleteWarning')}
                  disabled={!this.props.fields.id.value}
                >
                  <Fa name="ban" />{' '}
                  <FormattedMessage
                    id="button.delete"
                    defaultMessage="Delete"
                  />
                </BS.MenuItem>
                <BS.MenuItem
                  eventKey={2}
                  onClick={() => this.onDuplicate()}
                  disabled={!this.props.fields.id.value}
                >
                  <Fa name="clone" />{' '}
                  <FormattedMessage
                    id="button.duplicate"
                    defaultMessage="Duplicate"
                  />
                </BS.MenuItem>
              </BS.SplitButton>
            </BS.ButtonToolbar>
          </div>

          <hr />

          <BS.Row>
            <BS.Col xs={12}>
              <Error errors={apiErrors} />
            </BS.Col>
          </BS.Row>

          <BS.Row>
            <BS.Col xs={12}>
              <BS.Row>
                <BS.Col xs={12} sm={8} smOffset={2} lg={6} lgOffset={3}>
                  <BS.FormGroup>
                    <BS.ControlLabel>
                      <FormattedMessage
                        id="field.templateName"
                        defaultMessage="Template Name"
                      />
                    </BS.ControlLabel>
                    <BS.FormControl
                      type="text"
                      name="name"
                      required
                      onChange={this.handleChange}
                      value={template.name}
                    />
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
                  <BS.Button
                    bsStyle="success"
                    className="pull-right"
                    onClick={() => this.openModal('showStepForm')}
                  >
                    <FormattedMessage
                      id="button.addStep"
                      defaultMessage="Add Step"
                    />
                  </BS.Button>
                </BS.Col>
              </BS.Row>
            </BS.Col>
          </BS.Row>
        </form>

        <StepFormModal
          show={showStepForm}
          close={() => this.closeModal('showStepForm')}
          submit={this.addStep}
          data={steps[alteredStepIndex]}
          processTypes={processTypes}
        />
        <OverwriteWarningModal
          show={showOverwriteWarning}
          close={() => this.closeModal('showOverwriteWarning')}
          duplicate={this.onDuplicate}
          submit={this.onSubmit}
        />
        <DeleteWarningModal
          show={showDeleteWarning}
          close={() => this.closeModal('showDeleteWarning')}
          name={values.name}
          submit={this.onDelete}
        />
      </BS.Grid>
    );
  }
}

export default Template;
