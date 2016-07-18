import Home                       from 'rapidfab/components/home';
import About                      from 'rapidfab/components/about';

import InventoryLocation          from 'rapidfab/components/location'
import InventoryManufacturer      from 'rapidfab/components/inventory/manufacturer';
import InventoryMaterial          from 'rapidfab/components/inventory/material';
import InventoryMaterialResource  from 'rapidfab/components/inventory/material_resource';
import InventoryUser              from 'rapidfab/components/inventory/user'

const Routes = {
  "/"                             : Home,
  "/about"                        : About,

  "/inventory/material"           : InventoryMaterial,
  "/inventory/material-resource"  : InventoryMaterialResource,
  "/inventory/location"           : InventoryLocation,
  "/inventory/manufacturer"       : InventoryManufacturer,
  "/inventory/user"               : InventoryUser
}

export default Routes
