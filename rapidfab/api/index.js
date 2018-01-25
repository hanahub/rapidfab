import MakeApi from './makeApi';

export const RESOURCES = {
  aculeta: ['quote'],
  hoth: ['model'],
  pao: ['memberships', 'permissions', 'groups', 'sessions', 'users'],
  wyatt: [
    'bureau',
    'currency-conversion',
    'downtime',
    'feature',
    'event',
    'line-item',
    'location',
    'manufacturer',
    'material',
    'membership-bureau',
    'order',
    'order-document',
    'post-processor-type',
    'post-processor',
    'process-step',
    'print',
    'printer',
    'printer-type',
    'role',
    'run',
    'run-document',
    'run-queue',
    'shipping',
    'stock',
    'third-party',
    'template',
    'traceability-report',
  ],
  nautilus: ['modeler'],
};

export default MakeApi(RESOURCES);
