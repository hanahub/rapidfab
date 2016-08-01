import MakeApi  from './makeApi'

export const RESOURCES = {
  hoth: [
    'model'
  ],
  pao: [
    'sessions'
  ],
  wyatt: [
    'manufacturer',
    'material'
  ]
}

export default MakeApi(RESOURCES)
