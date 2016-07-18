function make_constants(constants) {
  let result = {};
  for(let i = 0; i < constants.length; i++) {
    let constant = constants[i];
    result[constant] = constant;
  }
  return result;
}

const Constants = [
  'HASH_CHANGE',
  'LOCALE_CHANGE'
]

export default make_constants(Constants)
