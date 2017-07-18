import React from 'react'
import { FormattedMessage } from 'rapidfab/i18n'

export const ORDER_STATUS_MAP = {
  "calculating_estimates": <FormattedMessage id="status.calculatingEstimates" defaultMessage="Calculating Estimates"/>,
  "cancelled": <FormattedMessage id="status.cancelled" defaultMessage="Cancelled"/>,
  "confirmed": <FormattedMessage id="status.confirmed" defaultMessage="Confirmed"/>,
  "complete": <FormattedMessage id="status.complete" defaultMessage="Complete"/>,
  "error": <FormattedMessage id="status.error" defaultMessage="Error"/>,
  "new": <FormattedMessage id="status.new" defaultMessage="New"/>,
  "pending": <FormattedMessage id="status.pending" defaultMessage="Pending"/>,
  "post-processing": <FormattedMessage id="status.postProcessing" defaultMessage="Post Processing"/>,
  "printed": <FormattedMessage id="status.printed" defaultMessage="Printed"/>,
  "printing": <FormattedMessage id="status.printing" defaultMessage="Printing"/>,
  "processing": <FormattedMessage id="status.processing" defaultMessage="Processing"/>,
  "shipping": <FormattedMessage id="status.shipping" defaultMessage="Shipping"/>,
}

export const RUN_STATUS_MAP = {
  "calculating": <FormattedMessage id="status.calculating" defaultMessage="Calculating"/>,
  "calculated": <FormattedMessage id="status.calculated" defaultMessage="Calculated"/>,
  "complete": <FormattedMessage id="status.complete" defaultMessage="Complete"/>,
  "created": <FormattedMessage id="status.created" defaultMessage="Created"/>,
  "error": <FormattedMessage id="status.error" defaultMessage="Error"/>,
  "in-progress": <FormattedMessage id="status.inProgress" defaultMessage="In Progress"/>,
  "queued": <FormattedMessage id="status.queued" defaultMessage="Queued"/>,
  "error": <FormattedMessage id="status.error" defaultMessage="Error"/>,
}

export const ORDER_REGION_MAPPING = {
  "north": <FormattedMessage id="order.north" defaultMessage="North"/>,
  "east": <FormattedMessage id="order.east" defaultMessage="East"/>,
  "south": <FormattedMessage id="order.south" defaultMessage="South"/>,
  "west": <FormattedMessage id="order.west" defaultMessage="West"/>,
};

export const ORDER_SALES_MAPPING = {
  "won": <FormattedMessage id="order.won" defaultMessage="Won"/>,
  "lost": <FormattedMessage id="order.lost" defaultMessage="Lost"/>,
  "outsourced": <FormattedMessage id="order.outsourced" defaultMessage="Outsourced"/>,
  "dead": <FormattedMessage id="order.dead" defaultMessage="Dead"/>,
  "pending": <FormattedMessage id="order.pending" defaultMessage="Pending"/>,
};

export const ORDER_TYPE_MAPPING = {
  "standard": <FormattedMessage id="order.standard" defaultMessage="Standard"/>,
  "benchmark": <FormattedMessage id="order.benchmark" defaultMessage="Benchmark"/>,
  "timestudy": <FormattedMessage id="order.timestudy" defaultMessage="Timestudy"/>,
};

export const EVENT_KEY_MAPPING = {
  'base_material': <FormattedMessage id="field.baseMaterial" defaultMessage="Base Material"/>,
  bureau: <FormattedMessage id="field.bureau" defaultMessage="Bureau"/>,
  'channel_representative_name': <FormattedMessage id="channelRepresentativeName" defaultMessage="Channel Representative Name"/>,
  currency: <FormattedMessage id="field.currency" defaultMessage="Currency"/>,
  'customer_email': <FormattedMessage id="field.customerEmail" defaultMessage="Customer Email"/>,
  'due_date': <FormattedMessage id="field.dueDate" defaultMessage="Due Date"/>,
  itar: <FormattedMessage id="field.itar" defaultMessage="Itar"/>,
  model: <FormattedMessage id="model" defaultMessage="Model"/>,
  'model_permission': <FormattedMessage id="event.modelPermission" defaultMessage="Model Permission"/>,
  name: <FormattedMessage id="field.name" defaultMessage="Name"/>,
  notes: <FormattedMessage id="field.notes" defaultMessage="Notes"/>,
  'order_owner': <FormattedMessage id="field.order_owner" defaultMessage="Owner"/>,
  'order_type': <FormattedMessage id="field.type" defaultMessage="Type"/>,
  'print_time': <FormattedMessage id="estimates.printTime" defaultMessage="Print Time"/>,
  quantity: <FormattedMessage id="field.quantity" defaultMessage="Quantity"/>,
  region: <FormattedMessage id="field.region" defaultMessage="Region"/>,
  'sales_representative_name': <FormattedMessage id="field.salesRepresentativeName" defaultMessage="Sales Representative Name"/>,
  'sales_status': <FormattedMessage id="field.salesStatus" defaultMessage="Sales Status"/>,
  'shipping_address': <FormattedMessage id="field.shippingAddress" defaultMessage="Shipping Address"/>,
  'shipping_name': <FormattedMessage id="field.shippingName" defaultMessage="Shipping Name"/>,
  'shipping_tracking': <FormattedMessage id="field.trackingNumber" defaultMessage="Tracking Number"/>,
  'shipping_uuid': <FormattedMessage id="record.shipping" defaultMessage="Shipping"/>,
  'status': <FormattedMessage id="field.status" defaultMessage="Status"/>,
  'support_material': <FormattedMessage id="field.supportMaterial" defaultMessage="Support Material"/>,
  'template': <FormattedMessage id="field.template" defaultMessage="Template"/>,
  'third_party_provider': <FormattedMessage id="field.thirdPartyProvider" defaultMessage="Third Party Provider"/>,
  'user': <FormattedMessage id="field.user" defaultMessage="User"/>,
};
