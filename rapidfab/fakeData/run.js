import _      from 'lodash'
import Faker  from 'faker'
import Uuid   from 'node-uuid'

import Print   from './print'
import Order   from './order'

const count = _.random(10, 50)
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
    id            : uuid.substr(uuid.length - 6),
    status        : _.sample(runStatus),
    prints        : _.sample(Print, _.random(4)),
    layout        : `https://rapidfab.authentise.com/layout/${Uuid.v4()}/`,
    estimates     : {
      time        : {
        print             : _.random(3600, 4 * 3600),
        post_processing   : _.random(3600, 2 * 3600),
      },
      materials   : {
        base      : Faker.random.number(),
        support   : Faker.random.number()
      },
    },
    actuals       : {
      time        : {
        print             : _.random(3600, 4 * 3600),
        post_processing   : _.random(3600, 2 * 3600),
      },
      materials   : {
        base      : Faker.random.number(),
        support   : Faker.random.number()
      }
    }
  };
});

export default _.keyBy(records, 'uuid');
