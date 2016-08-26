import _         from 'lodash'
import Faker     from 'faker'
import Uuid      from 'node-uuid'
import Material  from './material'

const count = _.random(100)
const ids = _.range(count)

const records = _.map(ids, id => {
  let uuid = Uuid.v4()
  return {
    uri: `https://rapidfab.authentise.com/printer-type/${uuid}/`,
    id: uuid.substr(uuid.length - 6),
    uuid,
    name: Faker.hacker.noun(),
    description: Faker.lorem.sentence(),
    type: Faker.hacker.noun(),
    build_volume: {
      x: Faker.random.number(),
      y: Faker.random.number(),
      x: Faker.random.number()
    },
    materials: _.sampleSize(Material, _.random(4))
  };
});

export default _.keyBy(records, 'uuid')
