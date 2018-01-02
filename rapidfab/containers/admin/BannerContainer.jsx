import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Actions from 'rapidfab/actions';
import { getBureau } from 'rapidfab/selectors';

import Banner from 'rapidfab/components/admin/Banner';

class BannerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      link: props.link,
      message: props.message,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { link, message } = this.state;
    const payload = {
      order_banner: {
        link,
        message,
      },
    };

    this.props.dispatch(Actions.Api.wyatt.bureau.put(this.props.uuid, payload));
  }

  render() {
    return (
      <Banner
        {...this.state}
        submittable={
          this.props.message !== this.state.message ||
          this.props.link !== this.state.link
        }
        submitting={this.props.submitting}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

BannerContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
  uuid: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  uuid: getBureau(state).uuid,
  link: getBureau(state).order_banner.link,
  message: getBureau(state).order_banner.message,
  submitting: state.ui.wyatt.bureau.put.fetching,
});

export default connect(mapStateToProps)(BannerContainer);
