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
    'currency-conversion',
    'line-item',
    'location',
    'manufacturer',
    'material',
    'membership-bureau',
    'order',
    'post-processor-type',
    'post-processor',
    'process-step',
    'print',
    'printer',
    'printer-type',
    'run',
    'shipping',
    'stock',
    'third-party',
    'template',
  ],
  nautilus: [
    'modeler',
  ],
}

export default MakeApi(RESOURCES)
