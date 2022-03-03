// plugins are objects with a method called install
// exporting an object under the default namespace
/* configure function can be used ot configure the default behaviour of the validation library */

import {
  Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure,
} from 'vee-validate';
import {
  required, min, max, alpha_spaces as alphaSpaces, email,
  min_value as minVal, max_value as maxVal, confirmed,
  not_one_of as excluded,
} from '@vee-validate/rules';

// using alias for aplhaSpaces as only camelCase is allowed in esLint
// underscores for import values are not allowed

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required); // generic scenarion
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alphaSpaces', alphaSpaces);
    defineRule('email', email);
    defineRule('minVal', minVal);
    defineRule('maxVal', maxVal);
    defineRule('passwordsMismatch', confirmed); // will check if the value in the current i/p == a value in another i/p
    defineRule('excluded', excluded);
    defineRule('countryExcluded', excluded);
    defineRule('tos', required); // for the tos

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required`,
          min: `The field ${ctx.field} is too short`,
          max: `The field ${ctx.field} is too long`,
          alphaSpaces: `This field ${ctx.field} may only contain alphabetic characters and spaces`,
          email: `This field ${ctx.field} must be a valid email`,
          minVal: `This field ${ctx.field} is too low`,
          maxVal: `This field ${ctx.field} is too high`,
          excluded: `You are not allowed to use this value for the field ${ctx.field}`,
          countryExcluded: 'Due to restrictions, we do not accept users from this location',
          passwordsMismatch: 'The passwords do not match',
          tos: 'You must accept the Terms Of Service',
        };

        // rule.name property refers to the name of rule that was broken
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid`;

        return message;
      },
      validateOnBlur: true, //  tell if to validate on the blur event
      validateOnChange: true, // tells if veevalidate if to validate a field on the change event
      validateOnInput: false, // most aggressive validation trigger
      validateOnModelUpdate: true,
      /* tells veevalidate to validate the input
         whenever the value changes internally through v-model directive */
    });
  },
};
