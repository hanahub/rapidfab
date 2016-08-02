import Location           from './location';
import ManufacturesData   from './manufacturers';
import MaterialsData      from './materials';
import MaterialResources  from './material_resources';
import PostProcessing     from './post_processing';
import PrintQueue         from './print_queue';
import ThirdPartyProvider from './third_party_provider';
import UsersData          from './users';
import OrdersData         from './orders';

export default {
  locations            : Location,
  manufacturers        : ManufacturesData,
  materials            : MaterialsData,
  material_resources   : MaterialResources,
  post_processing      : PostProcessing,
  print_queue          : PrintQueue,
  third_party_provider : ThirdPartyProvider,
  users                : UsersData,
  orders               : OrdersData
}
