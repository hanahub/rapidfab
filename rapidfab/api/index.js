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
    'stock',
    'order',
    'print',
    'printer',
    'printer-type',
    'run',
    'third-party',
  ]
}

export default MakeApi(RESOURCES)
