import { reduxForm } from 'redux-form';

import Actions from 'rapidfab/actions';
import { getShippings, getUsers } from 'rapidfab/selectors';

import EditOrderForm from 'rapidfab/components/records/order/edit/EditOrderForm';

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
  'status',
  'uuid',
];

const mapDispatchToProps = dispatch => ({
  onSubmit: formValues => {
    const payload = formValues;
    Object.keys(payload).forEach(key => {
      if (payload[key] === 'none') {
        payload[key] = null;
      }
    });

    if (payload.sales_status === null) {
      delete payload.sales_status;
    }

    if (payload.due_date) {
      const date = new Date(payload.due_date);
      payload.due_date = date.toISOString();
    }

    dispatch(Actions.Api.wyatt.order.put(payload.uuid, payload));
  },
});

const mapStateToProps = state => {
  const initialValues = state.resources[state.routeUUID];

  // convert ISO date to yyyy-mm-dd for html input
  if (initialValues.due_date) {
    const date = new Date(initialValues.due_date);
    initialValues.due_date = date.toISOString().slice(0, 10);
  }

  const { created } = initialValues;
  const shippings = getShippings(state);
  const users = getUsers(state);

  return { initialValues, created, shippings, users };
};

export default reduxForm(
  {
    form: 'record.editForm',
    fields,
  },
  mapStateToProps,
  mapDispatchToProps
)(EditOrderForm);
