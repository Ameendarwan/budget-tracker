import * as yup from 'yup';

export const changePasswordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Must be at least 8 characters')
    .matches(/[A-Za-z]/, 'Must include alphabets')
    .matches(/\d/, 'Must include numbers')
    .matches(/[^A-Za-z0-9]/, 'Must include special characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});
