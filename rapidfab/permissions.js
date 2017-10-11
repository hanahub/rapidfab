module.exports = {
  has(namespace, right, state) {
    for(const permission of state.permissions) {
      if (permission.namespace === namespace && permission.right === right) {
        return true;
      }
    }
    return false;
  }
};
