import Location           from './location'
import Manufacturer       from './manufacturer'
import Material           from './material'
import MaterialResource   from './material_resource'
import PostProcessor      from './post_processor'
import PostProcessorType  from './post_processor_type'
import Run                from './run'
import ThirdPartyProvider from './third_party_provider'
import Users              from './users'
import Order              from './order'
import PrinterType        from './printer_type'
import Printer            from './printer'
import Print              from './print'
import Model              from './model'

export default {
  locations            : Location,
  manufacturer         : Manufacturer,
  material             : Material,
  material_resource    : MaterialResource,
  post_processor       : PostProcessor,
  post_processor_type  : PostProcessorType,
  run                  : Run,
  third_party_provider : ThirdPartyProvider,
  users                : Users,
  order                : Order,
  printer_type         : PrinterType,
  printer              : Printer,
  print                : Print,
  model                : Model
}
