import MakeApi  from './makeApi'

export const RESOURCES = {
  hoth: [
    'model'
  ],
  pao: [
    'sessions',
    'users'
  ],
  wyatt: [
    'location',
    'manufacturer',
    'material',
    'stock',
  ]
}

export default MakeApi(RESOURCES)
