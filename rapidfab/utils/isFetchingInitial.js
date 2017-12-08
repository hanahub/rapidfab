// arguments should be ui resource request objects from redux store
// e.g. state.ui.wyatt.order.get

export default (...args) =>
  args.some(api => api.count === 0 || (api.count === 1 && api.fetching));
