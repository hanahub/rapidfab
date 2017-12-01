import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

class TemplateStepFormModal extends Component {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.show && !this.state.stepReset) {
      const data = nextProps.data || {};
      const stepInfo = {
        notes: data.notes || 'optional',
        upload: data.upload || 'optional',
        success: data.success || 'optional',
        tracking_id: data.tracking_id || 'hidden',
        process_type_uri: data.process_type_uri || '',
      };
      this.setState({ step: stepInfo, stepReset: true });
    } else if (!nextProps.show && this.state.stepReset) {
      this.setState({ stepReset: false });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.submit(this.state.step);
  }

  handleChange(event) {
    const { step } = this.state;
    const { name, value } = event.target;
    step[name] = value;
    this.setState({ step });
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

TemplateStepFormModal.propTypes = {
  close: PropTypes.func.isRequired,
  data: PropTypes.shape({}).isRequired,
  processTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  show: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
};

export default TemplateStepFormModal;
