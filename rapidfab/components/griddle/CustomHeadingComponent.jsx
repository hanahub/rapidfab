import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'rapidfab/i18n';

const CustomHeadingComponent = ({
  columnId,
  defaultMessage,
  id,
  sortAscendingIcon,
  sortDescendingIcon,
  sortProperty,
}) => {
  const isSorted = sortProperty !== null && sortProperty.id === columnId;
  return (
    <span>
      <FormattedMessage id={id} defaultMessage={defaultMessage} />{' '}
      {isSorted &&
        (sortProperty.sortAscending ? sortAscendingIcon : sortDescendingIcon)}
    </span>
  );
};

CustomHeadingComponent.defaultProps = {
  sortProperty: null,
};

CustomHeadingComponent.propTypes = {
  columnId: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  sortAscendingIcon: PropTypes.string.isRequired,
  sortDescendingIcon: PropTypes.string.isRequired,
  sortProperty: PropTypes.shape({
    id: PropTypes.string,
    sortAscending: PropTypes.bool,
  }),
};

export default CustomHeadingComponent;
