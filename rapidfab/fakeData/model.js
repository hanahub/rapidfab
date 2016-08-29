import _      from 'lodash';
import Faker  from 'faker';
import Uuid   from 'node-uuid';

const count = _.random(10, 100);
const ids = _.range(count);

const records = _.map(ids, id => {
  let uuid = Uuid.v4();
  let size = {
    x: _.random(50, 200),
    y: _.random(50, 200),
    z: _.random(50, 200)
  }
  return {
    uri: `https://rapidfab.authentise.com/model/${uuid}/`,
    id: uuid.substr(uuid.length - 6),
    uuid,
    name: Faker.hacker.noun(),
    snapshot: `https://rapidfab.authentise.com/snapshot/${Uuid.v4()}/`,
    snapshot_content: `//placehold.it/${size.x}/${size.y}`,
    size
  };
});

export default _.keyBy(records, 'uuid');
