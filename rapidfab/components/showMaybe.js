import React from 'react';

class ShowMaybe extends React.Component {
  render() {
    const { showIf, children } = this.props;

    return (
      <div>
        { showIf ? children : null }
      </div>
    );
  }
}

export default ShowMaybe;
