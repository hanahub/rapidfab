import _      from 'lodash';
import Faker  from 'faker';
import Uuid   from 'node-uuid';

const count = _.random(100);
const ids = _.range(count);

const records = _.map(ids, id => {
  let uuid = Uuid.v4();
  return {
    uri: `https://rapidfab.authentise.com/order/${uuid}`,
    id: uuid.substr(uuid.length - 6),
    uuid,
    snapshot: '//placekitten.com/600/600',
    material: Faker.commerce.color(),
    estimatedShippingDate: Faker.date.future(),
    estimatedMaterialUsed: Faker.random.number(),
    estimatedSupportUsed: Faker.random.number(),
    estimatedPrintTime: Faker.random.number(),
    useOriginalModel: Faker.random.boolean()
  };
});

export default _.keyBy(records, 'uuid');
