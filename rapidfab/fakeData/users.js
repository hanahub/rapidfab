import _      from 'lodash';
import Faker  from 'faker';
import Uuid   from 'node-uuid';

const count = _.random(2, 10);
const ids = _.range(count);

const records = _.map(ids, id => ({
  uri: `https://rapidfab.authentise.com/user/${Uuid.v4()}`,
  name: Faker.name.findName(),
  email: Faker.internet.email(),
  location: Faker.address.city(),
  locationAccess: Faker.random.boolean()
}));

export default _.keyBy(records, 'uri');
