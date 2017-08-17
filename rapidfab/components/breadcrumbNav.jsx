import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import Fa from 'react-fontawesome';

const spacing = { marginRight: '1rem' };

const breadcrumbMap = {
  prints: {
    href: '#/plan/prints',
    icon: 'list',
    message: <FormattedMessage id="plan.prints" defaultMessage="Prints" />,
  },
  orders: {
    href: '#/plan/orders',
    icon: 'files-o',
    message: <FormattedMessage id="plan.orders" defaultMessage="Orders" />,
  },
};

const HomeLink = () =>
  <Breadcrumb.Item href="/#/">
    <Fa name="home" style={spacing} />
    <FormattedMessage id="home" defaultMessage="Home" />
  </Breadcrumb.Item>;

const BreadcrumbLink = ({ crumb, active }) => {
  if (crumb in breadcrumbMap) {
    const { href, icon, message } = breadcrumbMap[crumb];
    return (
      <Breadcrumb.Item href={href} key={href} active={active}>
        <Fa name={icon} style={spacing} /> {message}
      </Breadcrumb.Item>
    );
  }
  return (
    <Breadcrumb.Item active={active}>
      {crumb}
    </Breadcrumb.Item>
  );
};
BreadcrumbLink.propTypes = { crumb: PropTypes.string };

const BreadcrumbNav = ({ breadcrumbs }) =>
  <Breadcrumb>
    <HomeLink />
    {breadcrumbs.map((crumb, index) =>
      <BreadcrumbLink
        crumb={crumb}
        key={crumb}
        active={index === breadcrumbs.length - 1}
      />
    )}
  </Breadcrumb>;
BreadcrumbNav.propTypes = { breadcrumbs: PropTypes.arrayOf(PropTypes.string) };

export default BreadcrumbNav;
