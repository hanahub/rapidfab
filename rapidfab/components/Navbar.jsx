import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import Actions from 'rapidfab/actions';
import Feature from 'rapidfab/components/Feature';
import Flag from 'rapidfab/components/flag';
import Permissions from 'rapidfab/permissions';

const styles = {
  spacingRight: { marginRight: '1rem' },
};

const LanguageFlagMap = {
  da: 'dk',
  de: 'de',
  'en-US': 'us',
  ja: 'jp',
};

const hasUnrestrictedRole = session =>
  session.roles.some(role => role.role !== 'restricted');

const isRestricted = session => !hasUnrestrictedRole(session);

const getTitles = currentUser => {
  const plan = (
    <span>
      <Fa name="road" /> <FormattedMessage id="plan" defaultMessage="Plan" />
    </span>
  );
  const work = (
    <span>
      <Fa name="wrench" /> <FormattedMessage id="work" defaultMessage="Work" />
    </span>
  );
  const inventory = (
    <span>
      <Fa name="list" />{' '}
      <FormattedMessage id="inventory" defaultMessage="Inventory" />
    </span>
  );
  const myProfile = (
    <span>
      <Fa name="user" /> {currentUser ? currentUser.name : '...'}
    </span>
  );
  return {
    plan,
    work,
    inventory,
    myProfile,
  };
};

const UnitsMenu = connect(({ volumeUnits }) => ({ volumeUnits }))(
  ({ dispatch, volumeUnits }) => (
    <BS.NavDropdown title="Units">
      <BS.MenuItem onClick={() => dispatch(Actions.VolumeUnits.setCm)}>
        <Fa
          name="check"
          style={{ visibility: volumeUnits === 'cm' ? null : 'hidden' }}
        />{' '}
        <FormattedMessage id="metric" defaultMessage="Metric" />
      </BS.MenuItem>
      <BS.MenuItem onClick={() => dispatch(Actions.VolumeUnits.setIn)}>
        <Fa
          name="check"
          style={{ visibility: volumeUnits === 'in' ? null : 'hidden' }}
        />{' '}
        <FormattedMessage id="imperial" defaultMessage="Imperial" />
      </BS.MenuItem>
    </BS.NavDropdown>
  )
);

const NavProfile = ({
  currentUser,
  onChangeLocale,
  onLogout,
  locale,
  session,
}) => {
  const titles = getTitles(currentUser);
  const flag = LanguageFlagMap[locale];
  const shouldShowImpersonate = Permissions.has(
    'nautilus',
    'impersonation',
    session
  );
  const shouldShowAdmin = Permissions.has(
    'nautilus',
    'administrate.group',
    session
  );

  return (
    <BS.Nav pullRight>
      <BS.NavDropdown eventKey={1} title={titles.myProfile} id="uxNavProfile">
        <BS.MenuItem eventKey={1.1} href="#/profile" disabled>
          <Fa name="user" />{' '}
          <FormattedMessage id="myProfile" defaultMessage="My Profile" />
        </BS.MenuItem>
        <BS.MenuItem eventKey={1.2}>
          {shouldShowImpersonate && (
            <div>
              <Fa name="user-secret" />{' '}
              <FormattedMessage id="impersonate" defaultMessage="Impersonate" />
            </div>
          )}
        </BS.MenuItem>
        <BS.MenuItem eventKey={1.3} href="#/admin">
          {shouldShowAdmin && (
            <div>
              <Fa name="users" />{' '}
              <FormattedMessage id="admin" defaultMessage="Admin" />
            </div>
          )}
        </BS.MenuItem>
        <BS.MenuItem divider style={{ display: 'none' }} />
        <BS.MenuItem eventKey={1.4} onClick={() => onLogout()}>
          <Fa name="sign-out" />{' '}
          <FormattedMessage id="logout" defaultMessage="Logout" />
        </BS.MenuItem>
      </BS.NavDropdown>
      <BS.NavDropdown
        eventKey={2}
        title={<Flag type={flag} />}
        id="uxNavLocale"
      >
        <BS.MenuItem
          eventKey={2.1}
          onClick={() => onChangeLocale(locale, 'en-US')}
        >
          <Fa
            name="check"
            style={{ visibility: flag === 'us' ? null : 'hidden' }}
          />{' '}
          <Flag type="us" /> English
        </BS.MenuItem>
        <BS.MenuItem
          eventKey={2.2}
          onClick={() => onChangeLocale(locale, 'de')}
        >
          <Fa
            name="check"
            style={{ visibility: flag === 'de' ? null : 'hidden' }}
          />{' '}
          <Flag type="de" /> German
        </BS.MenuItem>
        <BS.MenuItem
          eventKey={2.3}
          onClick={() => onChangeLocale(locale, 'da')}
        >
          <Fa
            name="check"
            style={{ visibility: flag === 'dk' ? null : 'hidden' }}
          />{' '}
          <Flag type="dk" /> Danish
        </BS.MenuItem>
        <BS.MenuItem
          eventKey={2.4}
          onClick={() => onChangeLocale(locale, 'ja')}
        >
          <Fa
            name="check"
            style={{ visibility: flag === 'jp' ? null : 'hidden' }}
          />{' '}
          <Flag type="jp" /> 日本語
        </BS.MenuItem>
      </BS.NavDropdown>
      <UnitsMenu />
      <BS.NavItem
        style={styles.spacingRight}
        href="https://authentise.zendesk.com/hc/en-us"
        target="_blank"
      >
        <Fa name="question-circle-o" />
      </BS.NavItem>
    </BS.Nav>
  );
};

NavProfile.propTypes = {
  currentUser: PropTypes.shape({}).isRequired,
  locale: PropTypes.string.isRequired,
  onChangeLocale: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  session: PropTypes.shape({}).isRequired,
};

const NavLinksRestricted = ({
  currentUser,
  onChangeLocale,
  onLogout,
  locale,
  session,
}) => (
  <BS.Navbar.Collapse>
    <BS.Nav>
      <BS.MenuItem eventKey={1.1} href="#/plan/orders">
        <Fa name="files-o" />{' '}
        <FormattedMessage id="plan.orders" defaultMessage="Orders" />
      </BS.MenuItem>
    </BS.Nav>
    <NavProfile
      currentUser={currentUser}
      locale={locale}
      onChangeLocale={onChangeLocale}
      onLogout={onLogout}
      session={session}
    />
  </BS.Navbar.Collapse>
);

NavLinksRestricted.propTypes = {
  currentUser: PropTypes.shape({}).isRequired,
  locale: PropTypes.string.isRequired,
  onChangeLocale: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  session: PropTypes.shape({}).isRequired,
};

const NavLinksRegular = ({
  currentUser,
  onChangeLocale,
  locale,
  onLogout,
  session,
}) => {
  const titles = getTitles(currentUser);
  return (
    <BS.Navbar.Collapse>
      <BS.Nav>
        <BS.NavDropdown eventKey={1} title={titles.plan} id="uxNavPlan">
          <BS.MenuItem eventKey={1.1} href="#/plan/orders">
            <Fa name="files-o" />{' '}
            <FormattedMessage id="plan.orders" defaultMessage="Orders" />
          </BS.MenuItem>
          <BS.MenuItem eventKey={1.2} href="#/plan/runs">
            <Fa name="list" />{' '}
            <FormattedMessage id="plan.runs" defaultMessage="Runs" />
          </BS.MenuItem>
          <BS.MenuItem eventKey={1.3} href="#/plan/prints">
            <Fa name="th" />{' '}
            <FormattedMessage id="plan.prints" defaultMessage="Prints" />
          </BS.MenuItem>
          <BS.MenuItem
            eventKey={1.4}
            href="#/plan/post-processing"
            style={{ display: 'none' }}
          >
            <Fa name="flask" />{' '}
            <FormattedMessage
              id="plan.postProcessing"
              defaultMessage="Post Processing"
            />
          </BS.MenuItem>
        </BS.NavDropdown>
        <BS.NavDropdown eventKey={2} title={titles.work} id="uxNavWork">
          <BS.MenuItem eventKey={2.1} href="#/work/queues">
            <Fa name="list" />{' '}
            <FormattedMessage id="work.queues" defaultMessage="Queues" />
          </BS.MenuItem>
          <BS.MenuItem divider style={{ display: 'none' }} />
          <BS.MenuItem
            eventKey={2.2}
            href="#/work/shipping"
            style={{ display: 'none' }}
          >
            <Fa name="truck" />{' '}
            <FormattedMessage id="work.shipping" defaultMessage="Shipping" />
          </BS.MenuItem>
          <BS.MenuItem
            eventKey={2.3}
            href="#/work/third-party"
            style={{ display: 'none' }}
          >
            <Fa name="sign-language" />{' '}
            <FormattedMessage
              id="work.thirdParty"
              defaultMessage="Third Party"
            />
          </BS.MenuItem>
        </BS.NavDropdown>
        <BS.NavDropdown
          eventKey={3}
          title={titles.inventory}
          id="uxNavInventory"
        >
          <BS.MenuItem eventKey={3.1} href="#/inventory/stocks">
            <Fa name="tags" />{' '}
            <FormattedMessage
              id="inventory.materialStocks"
              defaultMessage="Material Stocks"
            />
          </BS.MenuItem>
          <BS.MenuItem eventKey={3.2} href="#/inventory/printers">
            <Fa name="print" />{' '}
            <FormattedMessage
              id="inventory.printers"
              defaultMessage="Printers"
            />
          </BS.MenuItem>
          <BS.MenuItem eventKey={3.3} href="#/inventory/post-processors">
            <Fa name="object-ungroup" />{' '}
            <FormattedMessage
              id="inventory.postProcessors"
              defaultMessage="Post processors"
            />
          </BS.MenuItem>
          <BS.MenuItem divider />
          <BS.MenuItem eventKey={3.4} href="#/inventory/materials">
            <Fa name="object-group" />{' '}
            <FormattedMessage
              id="inventory.materials"
              defaultMessage="Materials"
            />
          </BS.MenuItem>
          <BS.MenuItem eventKey={3.5} href="#/inventory/printer-types">
            <Fa name="print" />{' '}
            <FormattedMessage
              id="inventory.printerTypes"
              defaultMessage="Printer Types"
            />
          </BS.MenuItem>
          <BS.MenuItem eventKey={3.6} href="#/inventory/post-processor-types">
            <Fa name="object-group" />{' '}
            <FormattedMessage
              id="inventory.postProcessorTypes"
              defaultMessage="Post processor Types"
            />
          </BS.MenuItem>
          <BS.MenuItem eventKey={3.7} href="#/inventory/templates">
            <Fa name="list-ol" />{' '}
            <FormattedMessage
              id="inventory.templates"
              defaultMessage="Templates"
            />
          </BS.MenuItem>
          <BS.MenuItem
            eventKey={3.8}
            href="#/inventory/third-party-provider"
            style={{ display: 'none' }}
          >
            <Fa name="building" />{' '}
            <FormattedMessage
              id="inventory.thirdPartyProviders"
              defaultMessage="Third Party Providers"
            />
          </BS.MenuItem>
          <BS.MenuItem divider />
          <BS.MenuItem eventKey={3.9} href="#/inventory/manufacturers">
            <Fa name="industry" />{' '}
            <FormattedMessage
              id="inventory.manufacturers"
              defaultMessage="Manufacturers"
            />
          </BS.MenuItem>
          <BS.MenuItem eventKey={3.1} href="#/inventory/locations">
            <Fa name="map-marker" />{' '}
            <FormattedMessage
              id="inventory.locations"
              defaultMessage="Locations"
            />
          </BS.MenuItem>
          <BS.MenuItem eventKey={3.11} href="#/inventory/third-party-providers">
            <Fa name="map-marker" />{' '}
            <FormattedMessage
              id="inventory.thirdPartyProviders"
              defaultMessage="Third Party Providers"
            />
          </BS.MenuItem>
          <BS.MenuItem eventKey={3.13} href="#/inventory/shipping">
            <Fa name="truck" />{' '}
            <FormattedMessage id="work.shipping" defaultMessage="Shipping" />
          </BS.MenuItem>
          <BS.MenuItem eventKey={3.14} href="#/inventory/conversions">
            <Fa name="exchange" />{' '}
            <FormattedMessage
              id="inventory.currencies"
              defaultMessage="Currencies"
            />
          </BS.MenuItem>
        </BS.NavDropdown>
        <Feature featureName="quoting">
          <BS.NavDropdown
            eventKey={4}
            title={<FormattedMessage id="quoting" defaultMessage="Quoting" />}
          >
            <BS.MenuItem eventKey={4.1} href="#/quoting/quote">
              <Fa name="usd" />{' '}
              <FormattedMessage id="quotes" defaultMessage="Quotes" />
            </BS.MenuItem>
            <BS.MenuItem eventKey={4.2} href="#/quoting/cost-report">
              <Fa name="line-chart" />{' '}
              <FormattedMessage id="costReport" defaultMessage="Cost Reports" />
            </BS.MenuItem>
          </BS.NavDropdown>
        </Feature>
      </BS.Nav>
      <NavProfile
        currentUser={currentUser}
        locale={locale}
        onChangeLocale={onChangeLocale}
        onLogout={onLogout}
        session={session}
      />
    </BS.Navbar.Collapse>
  );
};

NavLinksRegular.propTypes = {
  currentUser: PropTypes.shape({}).isRequired,
  locale: PropTypes.string.isRequired,
  onChangeLocale: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  session: PropTypes.shape({}).isRequired,
};

const Navbar = ({
  bureaus,
  currentUser,
  locale,
  onChangeLocale,
  onLogout,
  session,
}) => {
  const bureauList = Array.from(bureaus);
  const bureauName =
    (bureauList && bureauList.length && bureauList[0] && bureauList[0].name) ||
    '...';
  return (
    <BS.Navbar fixedTop inverse fluid>
      <BS.Navbar.Header>
        <BS.Navbar.Brand>
          <a href="#/">{bureauName}</a>
        </BS.Navbar.Brand>
        <BS.Navbar.Toggle />
      </BS.Navbar.Header>
      {isRestricted(session) ? (
        <NavLinksRestricted
          currentUser={currentUser}
          locale={locale}
          onChangeLocale={onChangeLocale}
          onLogout={onLogout}
          session={session}
        />
      ) : (
        <NavLinksRegular
          currentUser={currentUser}
          locale={locale}
          onChangeLocale={onChangeLocale}
          onLogout={onLogout}
          session={session}
        />
      )}
    </BS.Navbar>
  );
};

Navbar.defaultProps = {
  currentUser: null,
};

Navbar.propTypes = {
  bureaus: PropTypes.shape({}).isRequired,
  currentUser: PropTypes.shape({}),
  locale: PropTypes.string.isRequired,
  onChangeLocale: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  session: PropTypes.shape({}).isRequired,
};

export default Navbar;
