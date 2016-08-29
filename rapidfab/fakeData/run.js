import _      from 'lodash'
import Faker  from 'faker'
import Uuid   from 'node-uuid'

import Printer from './printer'
import Print   from './print'
import Order   from './order'

const count = _.random(5, 20)
const ids = _.range(count)
const runStatus = [
  "calculating",
  "calculated",
  "queued",
  "printing",
  "post-processing",
  "complete",
  "error"
]

const records = _.map(ids, id => {
  let uuid = Uuid.v4()
  return {
    uuid,
    uri           : `https://rapidfab.authentise.com/run/${uuid}/`,
    status        : _.sample(runStatus),
    prints        : _.sample(Print, _.random(4)),
    layout        : `https://rapidfab.authentise.com/layout/${Uuid.v4()}/`,
    estimates     : {
      time        : {
        print             : Faker.random.number(),
        post_processing   : Faker.random.number()
      },
      materials   : {
        base      : Faker.random.number(),
        support   : Faker.random.number()
      },
    },
    actuals       : {
      time        : {
        print             : Faker.random.number(),
        post_processing   : Faker.random.number()
      },
      materials   : {
        base      : Faker.random.number(),
        support   : Faker.random.number()
      }
    }
  };
});

export default _.keyBy(records, 'uuid');
