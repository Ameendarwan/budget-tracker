import { Card, CardContent } from '@app/components/Card/Card';
import React, { FC } from 'react';

import TitleSection from '@app/components/TitleSection';
import { ViewAccountDetailsProps } from './types';
import { format } from 'date-fns';

const ViewAccountDetails: FC<ViewAccountDetailsProps> = ({ defaultValues }) => {
  return (
    <div className="space-y-6 md:col-span-2">
      <Card className="m-0 rounded-[8px] !border-none p-0 shadow-custom">
        <TitleSection title="About Me" />
        <CardContent className="p-4">
          <p className="text-sm text-grayShades-shade1">{defaultValues?.aboutMe ?? ''}</p>
        </CardContent>
      </Card>

      <Card className="rounded-[8px] shadow-custom">
        <TitleSection title="Personal Details" />
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <p className="text-grayShades-shade1">Full Name</p>
              <p className="font-medium text-text"> {`${defaultValues?.firstName} ${defaultValues?.lastName}`}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-500">Father Name</p>
              <p className="font-medium">{defaultValues?.fatherName ?? ''}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-500">Gender</p>
              <p className="font-medium">{defaultValues?.gender ?? ''}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-500">Phone</p>
              <p className="font-medium">{defaultValues?.phoneNumber ?? ''}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-500">Email</p>
              <p className="font-medium">{defaultValues?.email}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-500">Zip Code</p>
              <p className="font-medium">{defaultValues?.zipCode}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-500">Education</p>
              <p className="font-medium">{defaultValues?.education}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-500">Date of Birth</p>
              <p className="font-medium">{defaultValues?.dob && format(new Date(defaultValues?.dob), 'dd-MM-yyyy')}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-500">Address</p>
              <p className="whitespace-pre-wrap font-medium">{defaultValues?.completeAddress}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-500">Budget Limit</p>
              <p className="font-medium">{defaultValues?.budgetLimit} PKR</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewAccountDetails;
