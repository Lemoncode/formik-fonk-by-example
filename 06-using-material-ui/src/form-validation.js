import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { Validators } from '@lemoncode/fonk';
import { iban } from '@lemoncode/fonk-iban-validator';
import { rangeNumber } from '@lemoncode/fonk-range-number-validator';
import { ibanBlackList, switzerlandTransfer } from './custom-validators';

export const validationSchema = {
  field: {
    account: [Validators.required, iban, ibanBlackList],
    name: [Validators.required],
    integerAmount: [
      Validators.required,
      {
        validator: rangeNumber,
        customArgs: {
          min: {
            value: 0,
            inclusive: true,
          },
          max: {
            value: 10000,
            inclusive: true,
          },
        },
      },
    ],
    decimalAmount: [
      Validators.required,
      {
        validator: rangeNumber.validator,
        customArgs: {
          min: {
            value: 0,
            inclusive: true,
          },
          max: {
            value: 99,
            inclusive: true,
          },
        },
      },
    ],
    reference: [Validators.required],
    email: [Validators.required, Validators.email],
  },
  record: {
    switzerlandTransfer: [switzerlandTransfer],
  },
};

export const formValidation = createFinalFormValidation(validationSchema);
