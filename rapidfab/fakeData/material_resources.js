import _      from 'lodash';
import Faker  from 'faker';
import Uuid   from 'node-uuid';

const count = _.random(10);
const ids = _.range(count);

const records = _.map(ids, id => ({
  uri           : `https://rapidfab.authentise.com/user/${Uuid.v4()}`,
  resource      : Faker.random.number(),
  material      : Faker.commerce.productMaterial(),
  color         : Faker.commerce.color(),
  status        : Faker.commerce.productAdjective(),
  balance       : Faker.commerce.price(),
}));

export default _.keyBy(records, 'uri');

