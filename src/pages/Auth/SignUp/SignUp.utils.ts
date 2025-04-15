import * as yup from 'yup';

export const signupValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .max(50)
    .matches(/^[A-Za-z\s-]+$/, 'Only alphabets, spaces and hyphens allowed'),
  lastName: yup
    .string()
    .required('Last name is required')
    .max(50)
    .matches(/^[A-Za-z\s-]+$/, 'Only alphabets, spaces and hyphens allowed'),
  email: yup.string().required('Email is required').email('Invalid email format'),
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
  budgetLimit: yup
    .number()
    .typeError('Budget must be a number')
    .required('Budget is required')
    .min(1, 'Budget must be between 1 and 99999999')
    .max(99999999, 'Budget must be between 1 and 99999999'),
});
