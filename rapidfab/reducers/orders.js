import _                    from 'lodash';
import Constants            from 'rapidfab/constants';
import FakeData             from 'rapidfab/fakeData';

const initialState = FakeData.orders;

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer
