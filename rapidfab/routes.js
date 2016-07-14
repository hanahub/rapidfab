import Index                  from 'rapidfab/components/index';
import About                  from 'rapidfab/components/about';

import InventoryLocation      from 'rapidfab/components/location'
import InventoryManufacturer  from 'rapidfab/components/inventory/manufacturer';
import InventoryMaterial      from 'rapidfab/components/material';
import InventoryUser          from 'rapidfab/components/inventory/user'

const Routes = {
  "/"                        : Index,
  "/about"                   : About,

  "/inventory/material"      : InventoryMaterial,
  "/inventory/location"      : InventoryLocation,
  "/inventory/manufacturer"  : InventoryManufacturer,
  "/inventory/user"          : InventoryUser
}

export default Routes
