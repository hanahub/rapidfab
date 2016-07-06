import { addLocaleData }    from 'react-intl';

import enLocaleData         from 'react-intl/locale-data/en';
import jaLocaleData         from 'react-intl/locale-data/ja';
import enUSMessages         from 'rapidfab/i18n/en-US.js';
import jaMessages           from 'rapidfab/i18n/ja.js';

addLocaleData(enLocaleData);

module.exports = {
  "en-US": {
    localeData: enLocaleData,
    messages: enUSMessages
  },
  "ja": {
    localeData: jaLocaleData,
    messages: jaMessages
  }
};
