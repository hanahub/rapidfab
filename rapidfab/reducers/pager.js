import Constants from 'rapidfab/constants';

const initialState = {
  items: 0,
  activePage: 1,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Constants.SET_PAGE:
      return Object.assign({}, state, {
        items: state.items,
        activePage: action.page,
      });
    default:
      return state;
  }
}
