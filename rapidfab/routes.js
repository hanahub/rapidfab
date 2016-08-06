import Home                         from 'rapidfab/components/home'
import About                        from 'rapidfab/components/about'

import InventoryLocation            from 'rapidfab/components/inventory/location'
import InventoryManufacturers       from 'rapidfab/containers/inventory/manufacturers'
import InventoryMaterials           from 'rapidfab/containers/inventory/materials'
import InventoryMaterialResource    from 'rapidfab/components/inventory/materialResource'
import InventoryPostProcessing      from 'rapidfab/components/inventory/postProcessing'
import InventoryThirdPartyProvider  from 'rapidfab/components/inventory/thirdPartyProvider'
import InventoryUser                from 'rapidfab/components/inventory/user'

import PlanOrders                   from 'rapidfab/containers/plan/orders'
import PrintQueue                   from 'rapidfab/containers/plan/printQueue'

import Order                        from 'rapidfab/containers/records/order'
import Manufacturer                 from 'rapidfab/containers/records/manufacturer'
import Material                     from 'rapidfab/containers/records/material'

const Routes = {
  "/"                               : Home,
  "/about"                          : About,

  "/inventory/materials"            : InventoryMaterials,
  "/inventory/resource"             : InventoryMaterialResource,
  "/inventory/location"             : InventoryLocation,
  "/inventory/manufacturers"        : InventoryManufacturers,
  "/inventory/post-processing"      : InventoryPostProcessing,
  "/inventory/third-party-provider" : InventoryThirdPartyProvider,
  "/inventory/user"                 : InventoryUser,

  "/plan/orders"                    : PlanOrders,
  "/plan/print-queue"               : PrintQueue,

  "/records/order"                  : Order,
  "/records/order/:uuid"            : Order,
  "/records/manufacturer"           : Manufacturer,
  "/records/manufacturer/:uuid"     : Manufacturer,
  "/records/material"               : Material,
  "/records/material/:uuid"         : Material
}

export default Routes
