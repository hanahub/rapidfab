import MakeApi  from './makeApi'

export const RESOURCES = {
  hoth: [
    'model'
  ],
  wyatt: [
    'manufacturer',
    'material'
  ]
}

export default MakeApi(RESOURCES)
