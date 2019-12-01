import React from 'react';
import { Field, Formik, ErrorMessage } from 'formik';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { formValidation, validationSchema } from './form-validation';
import { getDisabledCountryIBANCollection } from './api';
import { countryBlackList } from './custom-validators';
import { TextField, RecordError } from './components';

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
      <Typography variant="h3" component="h2" gutterBottom>
        Formik and Fonk
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Wire transfer form
      </Typography>
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
                {({ field, meta }) => (
                  <TextField {...field} label="Beneficiary IBAN" meta={meta} />
                )}
              </Field>
              <ErrorMessage component="span" name="account" />
              <Field name="name">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    label="Beneficiary fullname"
                    meta={meta}
                  />
                )}
              </Field>
              <div>
                <Typography>Amount of wire:</Typography>
                <Field name="integerAmount" type="number">
                  {({ field, meta }) => (
                    <div className="amount-field">
                      <TextField {...field} meta={meta} />
                    </div>
                  )}
                </Field>
                <strong>.</strong>
                <Field name="decimalAmount" type="number">
                  {({ field, meta }) => (
                    <>
                      <div className="amount-field">
                        <TextField {...field} meta={meta} />
                      </div>
                      <label>EUR</label>
                    </>
                  )}
                </Field>
              </div>
              <Field name="reference">
                {({ field, meta }) => (
                  <TextField {...field} label="Reference" meta={meta} />
                )}
              </Field>
              <Typography>
                If you want to send a notice to the beneficiary, inform the
                e-mail
              </Typography>
              <Field name="email">
                {({ field, meta }) => (
                  <div>
                    <TextField
                      {...field}
                      label="Beneficiary Email:"
                      meta={meta}
                    />
                  </div>
                )}
              </Field>
              {errors.recordErrors &&
                errors.recordErrors.switzerlandTransfer && (
                  <span>{errors.recordErrors.switzerlandTransfer}</span>
                )}
              <div className="buttons">
                <Button color="primary" variant="contained" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
