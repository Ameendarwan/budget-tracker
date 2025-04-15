import { Avatar, AvatarFallback, AvatarImage } from '@app/components/Avatar/Avatar';
import React, { useState } from 'react';

import { Card } from '@app/components/Card/Card';
import EditAccountDetails from './components/EditAccountDetails';
import Loader from '@app/components/Loader/Loader';
import SVGIcon from '@app/components/SVGIcon';
import { Separator } from '@app/components/Separator/Separator';
import ViewAccountDetails from './components/ViewAccountDetails';
import auth from '@app/utils/auth';
import { paths } from '@app/routes/Routes.utils';
import { useGetUserQuery } from '@app/store/apis/user';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);

  const userId = auth.getDecodedToken()?.id ?? '';

  const { data, isLoading } = useGetUserQuery({ userId });

  if (isLoading) return <Loader isFullPageLoader />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="border-b-1 rouned-[8px] mb-6 flex items-center border border-x-0 border-t-0">
        <div className="flex flex-row items-center gap-4 pb-2">
          <SVGIcon icon="arrow-left" className="cursor-pointer" onClick={() => navigate(paths.analysis)} />
          <h2 className="text-[32px] font-semibold">Profile</h2>
        </div>
        <div className="ml-auto flex gap-6">
          <span className={`relative cursor-pointer ${tab === 2 && 'text-gray-500'}`} onClick={() => setTab(1)}>
            Profile
            {tab === 1 && (
              <span className="absolute -bottom-1 left-0 top-[26px] h-1 w-full rounded-full bg-primary"></span>
            )}
          </span>
          <span className={`relative cursor-pointer ${tab === 1 && 'text-gray-500'}`} onClick={() => setTab(2)}>
            My account
            {tab === 2 && (
              <span className="absolute -bottom-1 left-0 top-[26px] h-1 w-full rounded-full bg-primary"></span>
            )}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="max-h-max rounded-[8px] px-4 pb-6 pt-8 text-center shadow-custom md:col-span-1">
          <Avatar className="mx-auto mb-4 h-[100px] w-[100px]">
            <AvatarImage src={data?.profilePic ?? ''} />
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">
            {data?.firstName} {data?.lastName}
          </h2>
          <p className="text-sm text-gray-500">{data?.jobTitle}</p>

          <Separator className="my-4 bg-border" />

          <div className="mt-8 flex flex-col place-items-start gap-1 space-y-3 px-2 text-sm text-gray-700">
            <div className="flex items-center justify-center">
              <span className="min-w-7">
                <SVGIcon icon="phone" />
              </span>
              <span className="text-grayShades-shade1">{data?.phoneNumber}</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="min-w-7">
                <SVGIcon icon="email" color="fill-grayShades-shade1" height={18} width={18} />
              </span>
              <span className="text-grayShades-shade1">{data?.email}</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="min-w-7">
                <SVGIcon icon="location" />
              </span>
              <span className="text-grayShades-shade1">{data?.city}</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="min-w-7">
                <SVGIcon icon="link" />
              </span>
              <span className="text-grayShades-shade1">www.websitename.com</span>
            </div>
          </div>
        </Card>
        <div className="md:col-span-2">
          {tab === 1 ? (
            <ViewAccountDetails defaultValues={{ ...(data ?? {}) }} />
          ) : (
            <EditAccountDetails defaultValues={{ ...(data ?? {}) }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
