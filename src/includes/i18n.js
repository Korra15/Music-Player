import { createI18n } from 'vue-i18n';
// function being imported
// fun helps us with configuring the i18n, returns a plugin obj
// that can be used to install it with our application

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`,
    which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages() {
  // goal = load the translations from an ext file
  // this fun scans the locales directory for the translations & combines them into a obj

  const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  // require.context fun = scan a dir for files
  // (relative path of dir, ask if to search through sub-dirs(opt), regEx for filtering the files)

  const messages = {};

  locales.keys().forEach((key) => {
    // during each itr locale = checked for validity
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key).default;
    }
  });

  return messages;
}

export default createI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages(),
  // messages property = where we can define the transitions - expects an obj
  numberFormats: {
    en: {
      currency: {
        // holds the settings for how the lib should hold translate the str
        style: 'currency', // tells how numbers will be formatted
        currency: 'USD', // supported currency code
      },
    },
    ja: {
      currency: { style: 'currency', currency: 'JPY' },
    },
    hi: {
      currency: { style: 'currency', currency: 'INR' },
    },
  },
});
