import _         from 'lodash'
import Faker     from 'faker'
import Uuid      from 'node-uuid'
import Material  from './material'

const count = _.random(5, 100)
const ids = _.range(count)

const records = _.map(ids, id => {
  let uuid = Uuid.v4()
  return {
    uri: `https://rapidfab.authentise.com/post-processor-type/${uuid}/`,
    id: uuid.substr(uuid.length - 6),
    uuid,
    name: Faker.name.lastName(),
    description: Faker.lorem.sentence(),
    materials: _.sampleSize(Material, _.random(4))
  };
});

export default _.keyBy(records, 'uuid')
