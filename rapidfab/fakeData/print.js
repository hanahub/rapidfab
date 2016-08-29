import _        from 'lodash'
import Faker    from 'faker'
import Uuid     from 'node-uuid'
import Order    from './order'

const count = _.random(10, 100)
const ids = _.range(count)
const PrintStatus = [
  'created',
  'scheduled',
  'printing',
  'complete',
  'error'
]

const records = _.map(ids, id => {
  let uuid = Uuid.v4()
  return {
    uri: `https://rapidfab.authentise.com/print/${uuid}/`,
    id: uuid.substr(uuid.length - 6),
    uuid,
    order: _.sample(Order),
    status: _.sample(PrintStatus),
  };
});

export default _.keyBy(records, 'uuid')
