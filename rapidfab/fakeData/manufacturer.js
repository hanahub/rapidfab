import _        from 'lodash'
import Faker    from 'faker'
import Uuid     from 'node-uuid'

const count = _.random(100)
const ids = _.range(count)

const records = _.map(ids, id => {
  let uuid = Uuid.v4();
  return {
    uri: `https://rapidfab.authentise.com/manufacturer/${uuid}/`,
    id: uuid.substr(uuid.length - 6),
    uuid,
    name: Faker.company.companyName(),
    address: Faker.address.streetAddress(),
    notes: Faker.lorem.sentence(),
    contact: {
      name: Faker.name.findName(),
      phone: Faker.phone.phoneNumber()
    },
    support: {
      name: Faker.name.findName(),
      phone: Faker.phone.phoneNumber()
    }
  }
})

export default _.keyBy(records, 'uuid');
