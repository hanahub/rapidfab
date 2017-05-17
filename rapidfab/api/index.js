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
    'membership-bureau',
    'stock',
    'order',
    'process-step',
    'print',
    'printer',
    'printer-type',
    'run',
    'stock',
    'third-party',
    'template',
    'shipping',
    'currency-conversion',
  ],
  nautilus: [
    'modeler',
  ],
}

export default MakeApi(RESOURCES)
