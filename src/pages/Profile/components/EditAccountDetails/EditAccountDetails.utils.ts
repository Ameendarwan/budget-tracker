import * as yup from 'yup';

export const formSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  jobTitle: yup.string(),
  aboutMe: yup.string(),
  streetAddress: yup.string(),
  city: yup.string(),
  state: yup.string(),
  zipCode: yup.string(),

  completeAddress: yup.string(),

  phoneNumber: yup.string(),
  email: yup.string().email('Invalid email').required('Email is required'),

  dob: yup
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Format should be DD/MM/YYYY')
    .test('valid-month', 'Month cannot be greater than 12', value => {
      if (!value) return false; // Required field check
      const parts = value.split('/');
      if (parts.length !== 3) return false;
      const month = parseInt(parts[1], 10);
      return month >= 1 && month <= 12;
    }),
  education: yup.string(),
  gender: yup.string(),
  budgetLimit: yup
    .number()
    .typeError('Budget must be a number')
    .required('Budget is required')
    .min(1, 'Budget must be between 1 and 99999999')
    .max(99999999, 'Budget must be between 1 and 99999999'),
});
