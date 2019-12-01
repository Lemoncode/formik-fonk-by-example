# 01 Setup formik

In this example we setup the basic plumbing to get up and running our project with Formik.

## Play with demo:

[![Formik and Fonk 01-setup-final-form example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/lemoncode/formik-fonk-by-example/tree/master/01-setup-formik)

## Steps to build it

- Install project dependencies

```bash
npm install
```

- Let's start by installing Formik

```bash
npm install formik --save
```

- Let's define a Formik Form:

_./src/playground.jsx_

```diff
import React from 'react';
+ import { Formik } from 'formik';

export const Playground = () => {
  return (
    <div>
      <h1>Formik and Fonk</h1>
-     <h2>Playground</h2>
+     <h2>Wire transfer form</h2>
+     <Formik
+       onSubmit={(values) => {}}
+     >
+       {props => {
+          const {
+            values,
+            touched,
+            errors,
+            dirty,
+            handleChange,
+            handleSubmit,
+          } = props;
+
+       return (
+         <form onSubmit={handleSubmit}>
+         </form>
+       )}}
+     </Formik>
    </div>
  );
};

```

- Time to define the initial data:

_./src/playground.jsx_

```diff
...
     <Formik
       onSubmit={(values) => {}}
+       initialValues={{
+         account: '',
+         name: '',
+         integerAmount: 0,
+         decimalAmount: 0,
+         reference: '',
+         email: '',
+       }}
     >
```

- Now that we got the form let's place some fields, inside the _render_ prop:

_./src/playground.jsx_

```diff
- import { Formik } from 'formik';
+ import { Field, Formik } from 'formik';

...
       return (
         <form onSubmit={handleSubmit}>
+              <Field name="account">
+                {({ field }) => (
+                  <div>
+                    <label>Beneficiary IBAN:</label>
+                    <input {...field} />
+                  </div>
+                )}
+              </Field>
+              <Field name="name">
+                {({ field }) => (
+                  <div>
+                    <label>Beneficiary fullname:</label>
+                    <input {...field} />
+                  </div>
+                )}
+              </Field>
+              <div>
+                 <label>Amount of wire:</label>
+                 <Field name="integerAmount" type="number">
+                   {({ field }) => <input {...field} className="amount-field" />}
+                 </Field>
+                 <strong>.</strong>
+              <Field name="decimalAmount" type="number">
+                {({ field }) => (
+                  <>
+                    <input {...field} className="amount-field" />
+                    <label>EUR</label>
+                  </>
+                )}
+              </Field>
+           </div>
+           <Field name="reference">
+             {({ field }) => (
+                <div>
+                  <label>Reference:</label>
+                  <input {...field} />
+                </div>
+             )}
+           </Field>
+           <p>
+             If you want to send a notice to the beneficiary, inform the e-mail
+           </p>
+           <Field
+             name="email">
+             {({ field }) => (
+                <div>
+                  <label>Beneficiary Email:</label>
+                  <input {...field} />
+                </div>
+             )}
+           </Field>
         </form>
       )}
```

\***\*Til here, test first layout then keep on moving
\*\***Likely to impement label field entry

- Let's add some code to handle the submit button (we will make a console.log showing the field values):

_./src/playground.jsx_

```diff
...
      <Form
-       onSubmit={() => {}}
+       onSubmit={values => {
+         console.log({ values });
+       }}
        initialValues={{
          account: '',
          name: '',
          integerAmount: 0,
          decimalAmount: 0,
          reference: '',
          email: '',
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            ...
            <Field name="email">
              {({ input }) => (
                <div>
                  <label>Beneficiary Email:</label>
                  <input {...input} />
                </div>
              )}
            </Field>
+           <div className="buttons">
+             <button type="submit">Submit</button>
+           </div>
          </form>
        )}
      />
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
