import Home                         from 'rapidfab/components/home'
import About                        from 'rapidfab/components/about'

import InventoryLocations           from 'rapidfab/containers/inventory/locations'
import InventoryManufacturers       from 'rapidfab/containers/inventory/manufacturers'
import InventoryMaterials           from 'rapidfab/containers/inventory/materials'
import InventoryStocks              from 'rapidfab/containers/inventory/stocks'
import InventoryPostProcessing      from 'rapidfab/components/inventory/postProcessing'
import InventoryThirdPartyProvider  from 'rapidfab/components/inventory/thirdPartyProvider'
import InventoryUser                from 'rapidfab/components/inventory/user'

import PlanOrders                   from 'rapidfab/containers/plan/orders'
import PrintQueue                   from 'rapidfab/containers/plan/printQueue'

import Order                        from 'rapidfab/containers/records/order'
import Location                     from 'rapidfab/containers/records/location'
import Manufacturer                 from 'rapidfab/containers/records/manufacturer'
import Material                     from 'rapidfab/containers/records/material'
import Stock                        from 'rapidfab/containers/records/stock'

const Routes = {
  "/"                               : Home,
  "/about"                          : About,

  "/inventory/materials"            : InventoryMaterials,
  "/inventory/stocks"               : InventoryStocks,
  "/inventory/resource"             : InventoryMaterialResource,
  "/inventory/locations"            : InventoryLocations,
  "/inventory/manufacturers"        : InventoryManufacturers,
  "/inventory/post-processing"      : InventoryPostProcessing,
  "/inventory/third-party-provider" : InventoryThirdPartyProvider,
  "/inventory/user"                 : InventoryUser,

  "/plan/orders"                    : PlanOrders,
  "/plan/print-queue"               : PrintQueue,

  "/records/order"                  : Order,
  "/records/order/:uuid"            : Order,
  "/records/location"               : Location,
  "/records/location/:uuid"         : Location,
  "/records/manufacturer"           : Manufacturer,
  "/records/manufacturer/:uuid"     : Manufacturer,
  "/records/material"               : Material,
  "/records/material/:uuid"         : Material,
  "/records/stock"                  : Stock,
  "/records/stock/:uuid"            : Stock,
}

export default Routes
