import { connect } from 'react-redux';
import { getBureau } from 'rapidfab/selectors';

import Admin from 'rapidfab/components/admin/Admin';

const mapStateToProps = state => ({ bureauName: getBureau(state).name });

export default connect(mapStateToProps)(Admin);
