import Home                         from 'rapidfab/components/home'
import About                        from 'rapidfab/components/about'

import InventoryLocation            from 'rapidfab/components/inventory/location'
import InventoryManufacturer        from 'rapidfab/components/inventory/manufacturer'
import InventoryMaterial            from 'rapidfab/components/inventory/material'
import InventoryMaterialResource    from 'rapidfab/components/inventory/material_resource'
import InventoryPostProcessing      from 'rapidfab/components/inventory/postProcessing'
import InventoryThirdPartyProvider  from 'rapidfab/components/inventory/third_party_provider'
import InventoryUser                from 'rapidfab/components/inventory/user'

import PlanOrders                   from 'rapidfab/containers/plan/orders'

import Order                        from 'rapidfab/containers/records/order'

const Routes = {
  "/"                               : Home,
  "/about"                          : About,

  "/inventory/material"             : InventoryMaterial,
  "/inventory/resource"             : InventoryMaterialResource,
  "/inventory/location"             : InventoryLocation,
  "/inventory/manufacturer"         : InventoryManufacturer,
  "/inventory/post-processing"      : InventoryPostProcessing,
  "/inventory/third-party-provider" : InventoryThirdPartyProvider,
  "/inventory/user"                 : InventoryUser,

  "/plan/orders"                    : PlanOrders,

  "/records/order"                  : Order,
  "/records/order/:uuid"            : Order
}

export default Routes
