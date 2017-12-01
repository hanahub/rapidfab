import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import Error from 'rapidfab/components/error';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';
import TemplateStepFormModal from './TemplateStepFormModal';

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

OverwriteWarningModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  duplicate: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

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

DeleteWarningModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
};

class Template extends Component {
  constructor(props) {
    super(props);

    this.state = {
      template: {},
      steps: [],
      loading: true,
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

  componentWillReceiveProps(nextProps) {
    if (this.state.loading && !nextProps.fetching) {
      const template = this.props.template || {};
      this.setState({
        template,
        steps: this.props.steps,
        loading: false,
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
        return null;
      })
    );

    const uris = [];
    _.map(steps, step => {
      if (!step.uri) {
        uris.push(
          this.props.submitStep(step).then(resp => resp.headers.location)
        );
      } else {
        const oldStep = _.find(this.props.steps, s => s.uri === step.uri);

        if (oldStep) {
          if (_.difference(_.values(step), _.values(oldStep)).length) {
            uris.push(this.props.submitStep(step).then(resp => resp.json.uri));
          } else {
            uris.push(step.uri);
          }
        }
      }
    });
    Promise.all(uris).then(processSteps => {
      const payload = _.cloneDeep(this.state.template);
      payload.bureau = payload.bureau ? payload.bureau : this.props.bureau;
      payload.description = payload.description ? payload.description : '';
      payload.process_steps = processSteps;

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
      bureau: this.props.bureau,
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
      steps[index] = Object.assign(
        {},
        payload,
        step.uri ? { uri: step.uri } : null,
        step.uuid ? { uuid: step.uuid } : null
      );
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
          role="button"
          style={_.assign({}, styles.centerIcons, styles.splitDivs)}
          tabIndex={0}
        >
          <Fa name="angle-down" size="2x" />
        </div>
        <div
          onClick={() => {
            this.moveRow(index, 'up');
          }}
          role="button"
          style={_.assign({}, styles.centerIcons, styles.splitDivs)}
          tabIndex={0}
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
            <div
              role="button"
              onClick={() => this.openModal('showStepForm', index)}
              tabIndex={0}
            >
              <Fa name="edit" />
            </div>
          </td>
          <td style={styles.centerIcons}>
            <div
              role="button"
              onClick={() => this.deleteStep(index)}
              tabIndex={0}
            >
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

        <TemplateStepFormModal
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

Template.defaultProps = {
  template: null,
};

Template.propTypes = {
  apiErrors: PropTypes.arrayOf(PropTypes.object).isRequired,
  bureau: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  fields: PropTypes.shape({
    name: PropTypes.shape({
      value: PropTypes.string,
      initialValue: PropTypes.string,
    }),
    id: PropTypes.shape({
      value: PropTypes.string,
    }),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onDuplicate: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  processTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  route: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
  submitStep: PropTypes.func.isRequired,
  template: PropTypes.shape({}),
  values: PropTypes.shape({
    name: PropTypes.string,
    uuid: PropTypes.string,
  }).isRequired,
};

export default Template;
