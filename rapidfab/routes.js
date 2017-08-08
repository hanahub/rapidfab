import Home from 'rapidfab/containers/home';
import AdminDashboard from 'rapidfab/containers/admin/AdminDashboard';
import About from 'rapidfab/components/about';
import BureauError from 'rapidfab/components/bureauError';

import InventoryLocations from 'rapidfab/containers/inventory/locations';
import InventoryManufacturers from 'rapidfab/containers/inventory/manufacturers';
import InventoryConversions from 'rapidfab/containers/inventory/conversions';
import InventoryShipping from 'rapidfab/containers/inventory/shipping';
import InventoryTemplates from 'rapidfab/containers/inventory/templates';
import InventoryMaterials from 'rapidfab/containers/inventory/materials';
import InventoryStocks from 'rapidfab/containers/inventory/stocks';
import InventoryPostProcessors from 'rapidfab/containers/inventory/postProcessors';
import InventoryPostProcessorTypes from 'rapidfab/containers/inventory/postProcessorTypes';
import InventoryThirdPartyProviders from 'rapidfab/containers/inventory/thirdPartyProviders';
import InventoryPrinters from 'rapidfab/containers/inventory/printers';
import InventoryPrinterTypes from 'rapidfab/containers/inventory/printerTypes';

import Orders from 'rapidfab/containers/plan/orders';
import Runs from 'rapidfab/containers/plan/runs';
import Prints from 'rapidfab/containers/plan/prints';

import Queues from 'rapidfab/containers/work/queues';

import OrderEdit from 'rapidfab/containers/records/order/edit';
import OrderNew from 'rapidfab/containers/records/order/new';

import Location from 'rapidfab/containers/records/location';
import ThirdPartyProvider from 'rapidfab/containers/records/thirdPartyProvider';
import Manufacturer from 'rapidfab/containers/records/manufacturer';
import conversion from 'rapidfab/containers/records/conversion';
import Shipping from 'rapidfab/containers/records/shipping';
import Material from 'rapidfab/containers/records/material';
import Print from 'rapidfab/containers/records/print';
import Printer from 'rapidfab/containers/records/printer';
import PrinterType from 'rapidfab/containers/records/printerType';
import PostProcessor from 'rapidfab/containers/records/postProcessor';
import PostProcessorType from 'rapidfab/containers/records/postProcessorType';
import Stock from 'rapidfab/containers/records/stock';
import Template from 'rapidfab/containers/records/template';
import RunEdit from 'rapidfab/containers/records/run/edit';
import RunNew from 'rapidfab/containers/records/run/new';

import Styles from 'rapidfab/containers/styles';

const Routes = {
  '/': Home,
  '/about': About,
  '/admin/dashboard': AdminDashboard,
  '/bureau-error': BureauError,
  '/styles': Styles,

  '/inventory/materials': InventoryMaterials,
  '/inventory/stocks': InventoryStocks,
  '/inventory/locations': InventoryLocations,
  '/inventory/manufacturers': InventoryManufacturers,
  '/inventory/shipping': InventoryShipping,
  '/inventory/templates': InventoryTemplates,
  '/inventory/conversions': InventoryConversions,
  '/inventory/post-processors': InventoryPostProcessors,
  '/inventory/post-processor-types': InventoryPostProcessorTypes,
  '/inventory/third-party-providers': InventoryThirdPartyProviders,
  '/inventory/printers': InventoryPrinters,
  '/inventory/printer-types': InventoryPrinterTypes,

  '/plan/orders': Orders,
  '/plan/runs': Runs,
  '/plan/prints': Prints,

  '/work/queues': Queues,

  '/records/order': OrderNew,
  '/records/order/:uuid': OrderEdit,
  '/records/location': Location,
  '/records/location/:uuid': Location,
  '/records/third-party-provider': ThirdPartyProvider,
  '/records/third-party-provider/:uuid': ThirdPartyProvider,
  '/records/manufacturer': Manufacturer,
  '/records/manufacturer/:uuid': Manufacturer,
  '/records/shipping': Shipping,
  '/records/shipping/:uuid': Shipping,
  '/records/conversion': conversion,
  '/records/conversion/:uuid': conversion,
  '/records/material': Material,
  '/records/material/:uuid': Material,
  '/records/print/:uuid': Print,
  '/records/printer': Printer,
  '/records/printer/:uuid': Printer,
  '/records/printer-type': PrinterType,
  '/records/printer-type/:uuid': PrinterType,
  '/records/post-processor': PostProcessor,
  '/records/post-processor/:uuid': PostProcessor,
  '/records/post-processor-type': PostProcessorType,
  '/records/post-processor-type/:uuid': PostProcessorType,
  '/records/stock': Stock,
  '/records/stock/:uuid': Stock,
  '/records/run': RunNew,
  '/records/run/:uuid': RunEdit,
  '/records/template/': Template,
  '/records/template/:uuid': Template,
};

export default Routes;
