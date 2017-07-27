import MakeApi  from './makeApi'

export const RESOURCES = {
  hoth: [
    'model'
  ],
  pao: [
    'memberships',
    'permissions',
    'groups',
    'sessions',
    'users'
  ],
  wyatt: [
    'bureau',
    'currency-conversion',
    'feature',
    'event',
    'line-item',
    'location',
    'manufacturer',
    'material',
    'membership-bureau',
    'order',
    'order-document',
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
    'traceability-report',
  ],
  nautilus: [
    'modeler',
  ],
}

export default MakeApi(RESOURCES)
