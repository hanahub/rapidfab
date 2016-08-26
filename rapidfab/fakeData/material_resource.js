import _        from 'lodash'
import Faker    from 'faker'
import Uuid     from 'node-uuid'

import Material from './material'

const count = _.random(10)
const ids = _.range(count)

const records = _.map(ids, id => {
  let uuid = Uuid.v4();
  return {
    uuid,
    id            : uuid.substr(uuid.length - 6),
    uri           : `https://rapidfab.authentise.com/material-resource/${uuid}/`,
    resource      : Faker.random.number(),
    material      : _.sample(Material),
    color         : Faker.commerce.color(),
    status        : Faker.commerce.productAdjective(),
    balance       : Faker.commerce.price()
  }
})

export default _.keyBy(records, 'uuid');
