import * as yup from 'yup';

export const resetPasswordValidationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
});
