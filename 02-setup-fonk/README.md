# 02 Setup Fonk

In this example we setup the basic plumbing to get up and running our project with Fonk.

## Play with demo:

[![React Final Form and Fonk 02-setup-fonk example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/lemoncode/formik-fonk-by-example/tree/master/02-setup-fonk)

## Steps to build it

- Install project dependencies

```bash
npm install
```

- Let's start by installing Final Form

```bash
npm install @lemoncode/fonk @lemoncode/fonk-final-form --save
```

- Now let's define an empty form validationSchema and create an instance of Fonk validation engine passing as parameter the already created:

_./src/form-validation.js_

```javascript
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';

const validationSchema = {};

export const formValidation = createFinalFormValidation(validationSchema);
```

- We got everything we need let's wire up this into Formik:

_./src/playground.jsx_

```diff
import React from 'react';
import { Field, Formik } from 'formik';
+ import { formValidation } from './form-validation';

...
      <Formik
        onSubmit={values => {
          console.log({ values });
        }}
+        validate={(values) => formValidation.validateForm(values)}
        initialValues={{
```

### Standard validations

- In our bank transfer form we want the following fields to be required:

  - Beneficiary IBAN.
  - Beneficiary fullname.
  - Amount of wire.
  - Reference.
  - Beneficiary EMail.

- Let's add this constraints to our form validation schema:

_./src/form-validation.js_

```diff
+ import { Validators } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';

const validationSchema = {
+ field: {
+   account: [Validators.required.validator],
+   name: [Validators.required.validator],
+   integerAmount: [Validators.required.validator],
+   decimalAmount: [Validators.required.validator],
+   reference: [Validators.required.validator],
+   email: [Validators.required.validator],
+ },
};

export const formValidation = createFinalFormValidation(validationSchema);

```

- Let's display the error information inline in the form components:

_./src/playground.jsx_

```diff
import React from 'react';
- import { Field, Formik } from 'formik';
+ import { Field, Formik, ErrorMessage } from 'formik';
import { formValidation } from './form-validation';

...

          return (
            <form onSubmit={handleSubmit}>
              <Field name="account">
                {({ field }) => (
                  <div>
                    <label>Beneficiary IBAN:</label>
                    <input {...field} />
                  </div>
                )}
              </Field>
+              <ErrorMessage component="span" name="account" />
              <Field name="name">
                {({ field }) => (
                  <div>
                    <label>Beneficiary fullname:</label>
                    <input {...field} />
                  </div>
                )}
              </Field>
+              <ErrorMessage component="span" name="name" />
              <div>
                <label>Amount of wire:</label>
                <Field name="integerAmount" type="number">
-                  {({ field }) => <input {...field} className="amount-field" />}
+ {({ field }) =>
+ <div className="amount-field">
+   <input {...field} className="amount-field" />
+   <ErrorMessage component="span" name="integerAmount" />
+ </div>
+}
                </Field>
                <strong>.</strong>
                <Field name="decimalAmount" type="number">
                  {({ field }) => (
                   <>
+                    <div className="amount-field">
                      <input {...field} className="amount-field" />
+                     <ErrorMessage component="span" name="decimalAmount" />
+                     </div>
                      <label>EUR</label>
                    </>

                  )}
                </Field>
+              <ErrorMessage component="span" name="decimalAmount" />
              </div>
              <Field name="reference">
                {({ field }) => (
                  <div>
                    <label>Reference:</label>
                    <input {...field} />
                  </div>
                )}
              </Field>
+              <ErrorMessage component="span" name="reference" />
              <p>
                If you want to send a notice to the beneficiary, inform the
                e-mail
              </p>
              <Field name="email">
                {({ field }) => (
                  <div>
                    <label>Beneficiary Email:</label>
                    <input {...field} />
                  </div>
                )}
              </Field>
+              <ErrorMessage component="span" name="email" />
              <div className="buttons">
                <button type="submit">Submit</button>
              </div>
            </form>
          );
        }}
```

- Fonk has some built-in validators (email, pattern, ...), let's validate that the beneficiary email field is a valid email:

_./src/form-validation.js_

```diff
...
const validationSchema = {
  field: {
    account: [Validators.required],
    name: [Validators.required],
    integerAmount: [Validators.required],
    decimalAmount: [Validators.required],
    reference: [Validators.required],
    email: [
      Validators.required,
+     Validators.email
    ],
  },
};
...

```

- _What about the [IBAN](https://en.wikipedia.org/wiki/International_Bank_Account_Number) number? Do I have to write my own validation?_ Fortunately Fonk has an ecosystem of validators that can save us time coding, in this case we have available and IBAN validator, let's install it:

```bash
npm install @lemoncode/fonk-iban-validator --save
```

- And let's use it in our schema

_./src/form-validation.js_

```diff
import { Validators } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
+ import { iban } from '@lemoncode/fonk-iban-validator';

const validationSchema = {
  field: {
    account: [
      Validators.required.validator,
+     iban.validator,
    ],
    ...
  },
};
...

```

- Let's jump into another interesting validator, the use cases:

  - We want the integer amount field to be greater than 0 and less than
    10.000 €.
  - We want the decimal amount field to be greater than 0 and less than 99.

- There is another third party validator available _fonk-range-number-validator_

```bash
npm install @lemoncode/fonk-range-number-validator --save
```

- Let's add them to our _ValidationSchema_

_./src/form-validation.js_

```diff
import { Validators } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { iban } from '@lemoncode/fonk-iban-validator';
+ import { rangeNumber } from '@lemoncode/fonk-range-number-validator';

const validationSchema = {
  field: {
    ...
    integerAmount: [
      Validators.required.validator,
+     {
+       validator: rangeNumber.validator,
+       customArgs: {
+         min: {
+           value: 0,
+           inclusive: true,
+         },
+         max: {
+           value: 10000,
+           inclusive: true,
+         },
+       },
+     },
    ],
    decimalAmount: [
      Validators.required.validator,
+     {
+       validator: rangeNumber.validator,
+       customArgs: {
+         min: {
+           value: 0,
+           inclusive: true,
+         },
+         max: {
+           value: 99,
+           inclusive: true,
+         },
+       },
+     },
    ],
    ...
  },
};
...

```

- Just to wrap up this section let's end up disabling wire transfers if the IBAN country code belongs to France(imagine that there are some temporary issue and you cannot technically perform that operation server side), you can easily implement this using the built-in pattern (reg ex) validator:

_./src/form-validation.js_

```diff
...

const validationSchema = {
  field: {
    account: [
      Validators.required.validator,
      iban.validator,
+     {
+       validator: Validators.pattern.validator,
+       customArgs: {
+         pattern: /^(?!FR)/i,
+       },
+       message: 'Not available transfers to France',
+     },
    ],
    ...

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
