import _            from 'lodash'
import Faker        from 'faker'
import Uuid         from 'node-uuid'

import Location     from './location'
import PrinterType  from './printer_type'
import Run          from './run'

const count = _.random(5, 50)
const ids = _.range(count)
const printerStatus = [
  "Maintenance",
  "Printing",
  "Cooling",
  "Warming",
  "Available"
]

const records = _.map(ids, id => {
  let uuid = Uuid.v4()
  let status = _.sample(printerStatus)

  return {
    uuid,
    uri         : `https://rapidfab.authentise.com/printer/${uuid}/`,
    id          : uuid.substr(uuid.length - 6),
    name        : Faker.name.lastName(),
    location    : _.sample(Location),
    printer_type: _.sample(PrinterType),
    queue       : _.sampleSize(Run, _.random(1, 5)),
    leadTime    : status === "available" ? Faker.date.past() : Faker.date.future(),
    status
  };
});

export default _.keyBy(records, 'uuid')