import Home                         from 'rapidfab/components/home'
import About                        from 'rapidfab/components/about'

import InventoryLocations           from 'rapidfab/containers/inventory/locations'
import InventoryManufacturers       from 'rapidfab/containers/inventory/manufacturers'
import InventoryMaterials           from 'rapidfab/containers/inventory/materials'
import InventoryStocks              from 'rapidfab/containers/inventory/stocks'
import InventoryPostProcessors      from 'rapidfab/containers/inventory/postProcessors'
import InventoryPostProcessorTypes  from 'rapidfab/containers/inventory/postProcessorTypes'
import InventoryThirdPartyProvider  from 'rapidfab/components/inventory/thirdPartyProvider'
import InventoryUsers               from 'rapidfab/containers/inventory/users'

import PlanOrders                   from 'rapidfab/containers/plan/orders'
import PrintQueue                   from 'rapidfab/containers/plan/printQueue'

import Order                        from 'rapidfab/containers/records/order'
import NewOrder                     from 'rapidfab/containers/records/newOrder'
import Location                     from 'rapidfab/containers/records/location'
import Manufacturer                 from 'rapidfab/containers/records/manufacturer'
import Material                     from 'rapidfab/containers/records/material'
import PostProcessor                from 'rapidfab/containers/records/postProcessor'
import PostProcessorType            from 'rapidfab/containers/records/postProcessorType'
import Stock                        from 'rapidfab/containers/records/stock'
import User                         from 'rapidfab/containers/records/user'

const Routes = {
  "/"                                    : Home,
  "/about"                               : About,

  "/inventory/materials"                 : InventoryMaterials,
  "/inventory/stocks"                    : InventoryStocks,
  "/inventory/locations"                 : InventoryLocations,
  "/inventory/manufacturers"             : InventoryManufacturers,
  "/inventory/post-processors"           : InventoryPostProcessors,
  "/inventory/post-processor-types"      : InventoryPostProcessorTypes,
  "/inventory/third-party-provider"      : InventoryThirdPartyProvider,
  "/inventory/users"                     : InventoryUsers,

  "/plan/orders"                         : PlanOrders,
  "/plan/print-queue"                    : PrintQueue,

  "/records/order"                       : Order,
  "/records/order/:uuid"                 : Order,
  "/records/order/new"                   : NewOrder,
  "/records/location"                    : Location,
  "/records/location/:uuid"              : Location,
  "/records/manufacturer"                : Manufacturer,
  "/records/manufacturer/:uuid"          : Manufacturer,
  "/records/material"                    : Material,
  "/records/material/:uuid"              : Material,
  "/records/post-processor"              : PostProcessor,
  "/records/post-processor/:uuid"        : PostProcessor,
  "/records/post-processor-type"         : PostProcessorType,
  "/records/post-processor-type/:uuid"   : PostProcessorType,
  "/records/stock"                       : Stock,
  "/records/stock/:uuid"                 : Stock,
  "/records/user"                        : User,
  "/records/user/:uuid"                  : User,
}

export default Routes
