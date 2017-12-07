export function isRestricted(roles) {
  for (const role of roles) {
    if (role.role != 'restricted') {
      return false;
    }
  }
  return true;
}
