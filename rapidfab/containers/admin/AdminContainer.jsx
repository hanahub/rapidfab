import React from 'react';

import Admin from 'rapidfab/components/admin/Admin';

class AdminContainer extends React.Component {
  constructor() {
    super()
    this.state = { selection: 'none' }

    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  handleSelectionChange(selection) {
    this.setState({ selection });
  }

  render() {
    return (
      <Admin
        selection={this.state.selection}
        handleSelectionChange={this.handleSelectionChange}
      />
    );
  }
}

export default AdminContainer;
