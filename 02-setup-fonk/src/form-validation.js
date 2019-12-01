import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { Validators } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    account: [Validators.required],
    name: [Validators.required],
    integerAmount: [Validators.required],
    decimalAmount: [Validators.required],
    reference: [Validators.required],
    email: [Validators.required, Validators.email],
  },
};

export const formValidation = createFinalFormValidation(validationSchema);
