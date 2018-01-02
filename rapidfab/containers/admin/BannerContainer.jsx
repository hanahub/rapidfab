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
  uuid: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  uuid: getBureau(state).uuid,
  link: getBureau(state).order_banner.link,
  message: getBureau(state).order_banner.message,
});

export default connect(mapStateToProps)(BannerContainer);
