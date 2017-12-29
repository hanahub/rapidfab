import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import Fa from 'react-fontawesome';

const spacing = { marginRight: '0.5rem' };

const breadcrumbMap = {
  admin: {
    href: '#/admin',
    icon: 'building',
    message: <FormattedMessage id="admin" defaultMessage="Administration" />,
  },
  currencies: {
    href: '#/inventory/conversions',
    icon: 'exchange',
    message: (
      <FormattedMessage id="inventory.currencies" defaultMessage="Currencies" />
    ),
  },
  locations: {
    href: '#/inventory/locations',
    icon: 'map-marker',
    message: (
      <FormattedMessage id="inventory.locations" defaultMessage="Locations" />
    ),
  },
  manufacturers: {
    href: '#/inventory/manufacturers',
    icon: 'industry',
    message: (
      <FormattedMessage
        id="inventory.manufacturers"
        defaultMessage="Manufacturers"
      />
    ),
  },
  materials: {
    href: '#/inventory/materials',
    icon: 'object-group',
    message: (
      <FormattedMessage id="inventory.materials" defaultMessage="Materials" />
    ),
  },
  materialStocks: {
    href: '#/inventory/stocks',
    icon: 'tags',
    message: (
      <FormattedMessage
        id="inventory.materialStocks"
        defaultMessage="Material Stocks"
      />
    ),
  },
  orders: {
    href: '#/plan/orders',
    icon: 'files-o',
    message: <FormattedMessage id="plan.orders" defaultMessage="Orders" />,
  },
  postProcessors: {
    href: '#/inventory/post-processors',
    icon: 'object-ungroup',
    message: (
      <FormattedMessage
        id="inventory.postProcessors"
        defaultMessage="Post Processors"
      />
    ),
  },
  postProcessorTypes: {
    href: '#/inventory/post-processor-types',
    icon: 'object-group',
    message: (
      <FormattedMessage
        id="inventory.postProcessorTypes"
        defaultMessage="Post Processor Types"
      />
    ),
  },
  printers: {
    href: '#/inventory/printers',
    icon: 'print',
    message: (
      <FormattedMessage id="inventory.printers" defaultMessage="Printers" />
    ),
  },
  printerTypes: {
    href: '#/inventory/printer-types',
    icon: 'print',
    message: (
      <FormattedMessage
        id="inventory.printerTypes"
        defaultMessage="inventory.printerTypes"
      />
    ),
  },
  prints: {
    href: '#/plan/prints',
    icon: 'list',
    message: <FormattedMessage id="plan.prints" defaultMessage="Prints" />,
  },
  queues: {
    href: '#/work/queues',
    icon: 'list',
    message: <FormattedMessage id="work.queues" defaultMessage="Queues" />,
  },
  runs: {
    href: '#/plan/runs',
    icon: 'list',
    message: <FormattedMessage id="plan.runs" defaultMessage="Runs" />,
  },
  shipping: {
    href: '#/inventory/shipping',
    icon: 'truck',
    message: (
      <FormattedMessage id="inventory.shipping" defaultMessage="Shipping" />
    ),
  },
  templates: {
    href: '#/inventory/templates',
    icon: 'list-ol',
    message: (
      <FormattedMessage id="inventory.templates" defaultMessage="Templates" />
    ),
  },
  thirdPartyProviders: {
    href: '#/inventory/third-party-providers',
    icon: 'map-marker',
    message: (
      <FormattedMessage
        id="inventory.thirdPartyProviders"
        defaultMessage="Third Party Providers"
      />
    ),
  },
  users: {
    href: '#/admin/users',
    icon: 'users',
    message: <FormattedMessage id="users" defaultMessage="Users" />,
  },
};

const HomeLink = () => (
  <Breadcrumb.Item href="/#/">
    <Fa name="home" style={spacing} />
    <FormattedMessage id="home" defaultMessage="Home" />
  </Breadcrumb.Item>
);

const BreadcrumbLink = ({ crumb, active }) => {
  if (crumb in breadcrumbMap) {
    const { href, icon, message } = breadcrumbMap[crumb];
    return (
      <Breadcrumb.Item href={href} key={href} active={active}>
        <Fa name={icon} style={spacing} /> {message}
      </Breadcrumb.Item>
    );
  }
  return <Breadcrumb.Item active={active}>{crumb}</Breadcrumb.Item>;
};

BreadcrumbLink.defaultProps = { active: false };
BreadcrumbLink.propTypes = {
  crumb: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

const BreadcrumbNav = ({ breadcrumbs }) => (
  <Breadcrumb>
    <HomeLink />
    {breadcrumbs.map((crumb, index) => (
      <BreadcrumbLink
        crumb={crumb}
        key={crumb}
        active={index === breadcrumbs.length - 1}
      />
    ))}
  </Breadcrumb>
);

BreadcrumbNav.defaultProps = { breadcrumbs: [] };
BreadcrumbNav.propTypes = { breadcrumbs: PropTypes.arrayOf(PropTypes.string) };

export default BreadcrumbNav;
