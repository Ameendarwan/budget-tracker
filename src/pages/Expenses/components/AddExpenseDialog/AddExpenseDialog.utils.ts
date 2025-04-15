import * as yup from 'yup';

export const expenseSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .max(30, 'Title must be at most 30 characters')
    .matches(/^[A-Za-z\s-]+$/, 'Title can only contain letters, spaces, and hyphens'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .required('Price is required')
    .max(999999999999999999999999999999, 'Price must be 30 digits or fewer'),
  date: yup.string().required('Date is required').typeError('Please select a valid date'),
});
