module.exports = {
  has(namespace, right, state) {
    state.permissions.some(
      permission =>
        permission.namespace === namespace && permission.right === right
    );
  },
};
