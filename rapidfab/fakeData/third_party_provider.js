import _      from 'lodash';
import Faker  from 'faker';
import Uuid   from 'node-uuid';

const count = _.random(10);
const ids = _.range(count);

const records = _.map(ids, id => ({
  uri           : `https://rapidfab.authentise.com/user/${Uuid.v4()}`,
  name          : Faker.company.companyName(),
  contact       : Faker.name.findName(),
  location      : Faker.address.stateAbbr(),
}));

export default _.keyBy(records, 'uri');

