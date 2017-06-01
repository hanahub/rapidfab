import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import Fa from 'react-fontawesome';

const BreadcrumbNav = ({ breadcrumbs }) => (
  <Breadcrumb>
    <Breadcrumb.Item
      href="/#/"
    >
      <Fa name="home"/>
      {` `}
      <FormattedMessage id='home' defaultMessage='Home'/>
    </Breadcrumb.Item>
    {
      breadcrumbs.map( crumb => {
        const { href, iconName, i18nID, defaultMessage } = crumb;
        return (
          <Breadcrumb.Item
            href={href}
            active={href ? false : true }
            key={defaultMessage}
          >
            <Fa name={iconName}/>
            {` `}
            { i18nID ?
              <FormattedMessage id={i18nID} defaultMessage={defaultMessage}/>
              : <span>{defaultMessage}</span>
            }
          </Breadcrumb.Item>
        )
      })
    }
  </Breadcrumb>
);

BreadcrumbNav.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
}

export default BreadcrumbNav;
