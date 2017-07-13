module.exports = {
  has : function(namespace, right, state) {
    const foundPermission = [];
    state.permissions.forEach((permission) => {
      if(permission.namespace == namespace && permission.right == right) {
        foundPermission.push(permission);
      }
    });
    if(foundPermission.length > 0){
      return true
    }
  }
}
