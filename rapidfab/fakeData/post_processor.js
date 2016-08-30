import _            from 'lodash'
import Faker        from 'faker'
import Uuid         from 'node-uuid'

import Location     from './location'
import PrinterType  from './printer_type'
import Run          from './run'
import PostProcessorType from './post_processor_type'

const count = _.random(5, 50)
const ids = _.range(count)

const records = _.map(ids, id => {
  let uuid = Uuid.v4()

  return {
    uuid,
    uri                 : `https://rapidfab.authentise.com/post-processor/${uuid}/`,
    id                  : uuid.substr(uuid.length - 6),
    name                : Faker.name.lastName(),
    location            : _.sample(Location),
    post_processor_type : _.sample(PostProcessorType),
    queue               : _.sampleSize(Run, _.random(1, 5)),
  };
});

export default _.keyBy(records, 'uuid')
