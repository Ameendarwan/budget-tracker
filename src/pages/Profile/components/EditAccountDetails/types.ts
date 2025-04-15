import * as yup from 'yup';

import { User } from '@app/store/apis/user/types';
import { formSchema } from './EditAccountDetails.utils';

export interface EditAccountDetailsProps {
  defaultValues: Partial<User>;
}

export type FormData = yup.InferType<typeof formSchema>;
