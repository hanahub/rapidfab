import { reduxForm } from 'redux-form';

import { Currencies } from 'rapidfab/constants';
import { ORDER_SALES_MAPPING } from 'rapidfab/mappings';
import { getShippings, getUsers } from 'rapidfab/selectors';

import NewOrderForm from 'rapidfab/components/records/order/new/NewOrderForm';

const fields = [
  'channel_representative',
  'currency',
  'due_date',
  'customer_email',
  'customer_name',
  'name',
  'notes',
  'order_owner',
  'order_type',
  'region',
  'sales_representative',
  'sales_status',
  'shipping.name',
  'shipping.address',
  'shipping.tracking',
  'shipping.uri',
];

const mapStateToProps = state => {
  const shippings = getShippings(state);
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

  return { initialValues, shippings, users };
};

export default reduxForm(
  {
    form: 'record.order',
    fields,
  },
  mapStateToProps
)(NewOrderForm);