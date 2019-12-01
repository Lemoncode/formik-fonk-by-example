import React from 'react';
import { Field, Formik } from 'formik';

export const Playground = () => {
  return (
    <div>
      <h1>Formik and Fonk</h1>
      <h2>Wire transfer form</h2>
      <Formik
        onSubmit={values => {
          console.log({ values });
        }}
        initialValues={{
          account: '',
          name: '',
          integerAmount: 0,
          decimalAmount: 0,
          reference: '',
          email: '',
        }}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
            handleChange,
            handleSubmit,
          } = props;

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
              <Field name="name">
                {({ field }) => (
                  <div>
                    <label>Beneficiary fullname:</label>
                    <input {...field} />
                  </div>
                )}
              </Field>
              <div>
                <label>Amount of wire:</label>
                <Field name="integerAmount" type="number">
                  {({ field }) => <input {...field} className="amount-field" />}
                </Field>
                <strong>.</strong>
                <Field name="decimalAmount" type="number">
                  {({ field }) => (
                    <>
                      <input {...field} className="amount-field" />
                      <label>EUR</label>
                    </>
                  )}
                </Field>
              </div>
              <Field name="reference">
                {({ field }) => (
                  <div>
                    <label>Reference:</label>
                    <input {...field} />
                  </div>
                )}
              </Field>
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
              <div className="buttons">
                <button type="submit">Submit</button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
