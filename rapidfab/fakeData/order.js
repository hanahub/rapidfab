import _        from 'lodash'
import Faker    from 'faker'
import Uuid     from 'node-uuid'

import Model    from './model'
import Material from './material'

const count = _.random(10, 100)
const ids = _.range(count)

const records = _.map(ids, id => {
  let uuid = Uuid.v4();
  return {
    uri: `https://rapidfab.authentise.com/order/${uuid}/`,
    id: uuid.substr(uuid.length - 6),
    uuid,
    materials: {
      base: _.sample(Material),
      support: _.sample(Material)
    },
    model: _.sample(Model),
    estimates: {
      print_time: Faker.random.number(),
      cost: {
        currency: "USD",
        amount: Faker.commerce.price()
      },
      materials: {
        base: Faker.random.number(),
        support: Faker.random.number()
      },
    },
    shipping: {
      address: Faker.address.streetAddress()
    },
    quantity: _.random(10),
    created: Faker.date.past(),
  }
})

export default _.keyBy(records, 'uuid');
