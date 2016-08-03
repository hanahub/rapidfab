import _      from 'lodash';
import Faker  from 'faker';
import Uuid   from 'node-uuid';

const count = _.random(20);
const ids = _.range(count);

const records = _.map(ids, id => {
  let uuid = Uuid.v4();
  return {
    uri: `https://rapidfab.authentise.com/order/${uuid}`,
    uuid,
    orderSnapshot : '//placekitten.com/600/600',
    order         : Faker.random.number(),
    material      : Faker.commerce.productMaterial(),
    color         : Faker.commerce.color(),
    et            : Faker.date.future(),
    volume        : Faker.random.number(),
  };
});

export default _.keyBy(records, 'uuid');
