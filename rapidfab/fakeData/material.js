import _            from 'lodash'
import Faker        from 'faker'
import Uuid         from 'node-uuid'

import Manufacturer from './manufacturer'

const count = _.random(2, 20)
const ids = _.range(count)

const records = _.map(ids, id => {
  let uuid = Uuid.v4();
  return {
    uri: `https://rapidfab.authentise.com/material/${uuid}/`,
    id: uuid.substr(uuid.length - 6),
    uuid,
    name: Faker.commerce.productMaterial(),
    description: Faker.lorem.sentence(),
    color: Faker.internet.color(),
    manufacturer: _.sample(Manufacturer),
    third_party_fulfillment: Faker.random.boolean(),
    post_processing_seconds: Faker.random.number(),
    cost: Faker.commerce.price(),
  }
})

export default _.keyBy(records, 'uuid');
