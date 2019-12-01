import React from 'react';
import { Field, Formik, ErrorMessage } from 'formik';
import { formValidation, validationSchema } from './form-validation';
import { getDisabledCountryIBANCollection } from './api';
import { countryBlackList } from './custom-validators';

export const Playground = () => {
  React.useEffect(() => {
    getDisabledCountryIBANCollection().then(countries => {
      const newValidationSchema = {
        ...validationSchema,
        field: {
          ...validationSchema.field,
          account: [
            ...validationSchema.field.account,
            {
              validator: countryBlackList,
              customArgs: {
                countries,
              },
            },
          ],
        },
      };

      formValidation.updateValidationSchema(newValidationSchema);
    });
  }, []);

  return (
    <div>
      <h1>Formik and Fonk</h1>
      <h2>Wire transfer form</h2>
      <Formik
        onSubmit={values => {
          console.log({ values });
        }}
        validate={values => formValidation.validateForm(values)}
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
              <ErrorMessage component="span" name="account" />
              <Field name="name">
                {({ field }) => (
                  <div>
                    <label>Beneficiary fullname:</label>
                    <input {...field} />
                  </div>
                )}
              </Field>
              <ErrorMessage component="span" name="name" />
              <div>
                <label>Amount of wire:</label>
                <Field name="integerAmount" type="number">
                  {({ field }) => (
                    <div className="amount-field">
                      <input {...field} className="amount-field" />
                      <ErrorMessage component="span" name="integerAmount" />
                    </div>
                  )}
                </Field>
                <ErrorMessage component="span" name="intergerAmount" />
                <strong>.</strong>
                <Field name="decimalAmount" type="number">
                  {({ field }) => (
                    <>
                      <div className="amount-field">
                        <input {...field} className="amount-field" />
                        <ErrorMessage component="span" name="decimalAmount" />
                      </div>
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
              <ErrorMessage component="span" name="reference" />
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
              <ErrorMessage component="span" name="email" />
              {errors.recordErrors &&
                errors.recordErrors.switzerlandTransfer && (
                  <span>{errors.recordErrors.switzerlandTransfer}</span>
                )}
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
