import MakeApi  from './makeApi'

export const RESOURCES = {
  hoth: [
    'model'
  ],
  pao: [
    'memberships',
    'groups',
    'sessions',
    'users'
  ],
  wyatt: [
    'bureau',
    'location',
    'post-processor-type',
    'post-processor',
    'manufacturer',
    'material',
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
