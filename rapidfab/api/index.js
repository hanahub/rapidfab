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
    'order'
  ]
}

export default MakeApi(RESOURCES)
