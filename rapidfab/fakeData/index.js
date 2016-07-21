import Location           from './location';
import ManufacturesData   from './manufacturers';
import MaterialsData      from './materials';
import MaterialResources  from './material_resources';
import PostProcessing     from './post_processing';
import ThirdPartyProvider from './third_party_provider';
import UsersData          from './users';

export default {
  locations            : Location,
  manufacturers        : ManufacturesData,
  materials            : MaterialsData,
  material_resources   : MaterialResources,
  post_processing      : PostProcessing,
  third_party_provider : ThirdPartyProvider,
  users                : UsersData,
}
