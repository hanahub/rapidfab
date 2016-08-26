import _            from 'lodash'
import Faker        from 'faker'
import Uuid         from 'node-uuid'

import Location     from './location'
import PrinterType  from './printer_type'

const count = _.random(100)
const ids = _.range(count)

const records = _.map(ids, id => {
  let uuid = Uuid.v4()
  return {
    uuid,
    uri         : `https://rapidfab.authentise.com/printer/${uuid}/`,
    id          : uuid.substr(uuid.length - 6),
    name        : Faker.name.lastName(),
    location    : _.sample(Location),
    printer_type: _.sample(PrinterType),
  };
});

export default _.keyBy(records, 'uuid')
