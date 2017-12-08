module.exports = {
  has(namespace, right, state) {
    return state.permissions.some(
      permission =>
        permission.namespace === namespace && permission.right === right
    );
  },
};
