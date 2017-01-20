import MakeApi  from './makeApi'

export const RESOURCES = {
  hoth: [
    'model'
  ],
  pao: [
    'memberships',
    'sessions',
    'users'
  ],
  wyatt: [
    'location',
    'post-processor-type',
    'post-processor',
    'manufacturer',
    'material',
    'membership-bureau',
    'stock',
    'order',
    'print',
    'printer',
    'printer-type',
    'run',
    'third-party',
    'shipping',
    'currency-conversion',
  ],
  nautilus: [
    'modeler',
  ],
}

export default MakeApi(RESOURCES)
