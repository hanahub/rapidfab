import _      from 'lodash';
import Faker  from 'faker';
import Uuid   from 'node-uuid';

const count = _.random(10);
const ids = _.range(count);

const records = _.map(ids, id => ({
  uri: `https://rapidfab.authentise.com/manufacturer/${Uuid.v4()}`,
  name: Faker.company.companyName(),
  commercialContact: Faker.name.findName(),
  commercialPhone: Faker.phone.phoneNumber(),
  supportContact: Faker.name.findName(),
  supportPhone: Faker.phone.phoneNumber(),
  address: Faker.address.streetAddress(),
  notes: Faker.lorem.paragraph()
}));

export default _.keyBy(records, 'uri');
