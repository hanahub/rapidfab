import { reduxForm } from 'redux-form';

import { Currencies } from 'rapidfab/constants';
import { ORDER_SALES_MAPPING } from 'rapidfab/mappings';
import {
  getShippingsAlphabetized,
  getUsers,
  isCurrentUserRestricted,
} from 'rapidfab/selectors';

import NewOrderForm from 'rapidfab/components/records/order/new/NewOrderForm';

const fields = [
  'channel_representative',
  'currency',
  'due_date',
  'customer_email',
  'customer_name',
  'customer_po',
  'ip_sensitivity',
  'name',
  'notes',
  'order_owner',
  'order_type',
  'quote_number',
  'region',
  'sales_representative',
  'sales_status',
  'shipping.name',
  'shipping.address',
  'shipping.tracking',
  'shipping.uri',
];

const mapStateToProps = state => {
  const isUserRestricted = isCurrentUserRestricted(state);
  const shippings = getShippingsAlphabetized(state);
  const users = getUsers(state);

  const initialCurrency = Currencies[0];
  const initialSalesStatus = Object.keys(ORDER_SALES_MAPPING)[0];
  const initialShipping = shippings[0] ? shippings[0].uri : null;

  const initialValues = {
    currency: initialCurrency,
    sales_status: initialSalesStatus,
    shipping: {
      uri: initialShipping,
    },
  };

  return { isUserRestricted, initialValues, shippings, users };
};

export default reduxForm(
  {
    form: 'record.order',
    fields,
  },
  mapStateToProps
)(NewOrderForm);
