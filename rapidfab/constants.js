var make_constants = function(constants) {
  let result = {};
  for(var i = 0; i < constants.length; i++) {
    let constant = constants[i];
    result[constant] = constant;
  }
  return result;
}

export const ActionType = make_constants([
    'URL_CHANGE',
])
