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
      {/* Header section with back navigation and tabs */}
      <div className="border-b-1 rouned-[8px] mb-6 flex items-center border border-x-0 border-t-0">
        <div className="flex flex-row items-center gap-4 pb-2">
          <SVGIcon
            icon="arrow-left"
            className="cursor-pointer"
            aria-label="Go back to Analysis page"
            onClick={() => navigate(paths.analysis)}
          />
          <h2 className="text-[32px] font-semibold" aria-label="Profile page title">
            Profile
          </h2>
        </div>

        {/* Tab navigation */}
        <div className="ml-auto flex gap-6" role="tablist" aria-label="Profile tabs">
          <span
            role="tab"
            aria-selected={tab === 1}
            aria-controls="view-account-tab"
            tabIndex={0}
            className={`relative cursor-pointer ${tab === 2 && 'text-gray-500'}`}
            onClick={() => setTab(1)}>
            Profile
            {tab === 1 && (
              <span className="absolute -bottom-1 left-0 top-[26px] h-1 w-full rounded-full bg-primary"></span>
            )}
          </span>
          <span
            role="tab"
            aria-selected={tab === 2}
            aria-controls="edit-account-tab"
            tabIndex={0}
            className={`relative cursor-pointer ${tab === 1 && 'text-gray-500'}`}
            onClick={() => setTab(2)}>
            My account
            {tab === 2 && (
              <span className="absolute -bottom-1 left-0 top-[26px] h-1 w-full rounded-full bg-primary"></span>
            )}
          </span>
        </div>
      </div>

      {/* Main content: left card with user info, right side for tab content */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* User profile card */}
        <Card className="max-h-max rounded-[8px] px-4 pb-6 pt-8 text-center shadow-custom md:col-span-1">
          <Avatar className="mx-auto mb-4 h-[100px] w-[100px]" aria-label="User avatar">
            <AvatarImage src={data?.profilePic ?? ''} />
            <AvatarFallback>{`${data?.firstName?.[0] ?? 'U'}${data?.lastName?.[0] ?? ''}`}</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold" aria-label="User full name">
            {data?.firstName} {data?.lastName}
          </h2>
          <p className="text-sm text-gray-500" aria-label="User job title">
            {data?.jobTitle}
          </p>

          <Separator className="my-4 bg-border" />

          {/* Contact info */}
          <div className="mt-8 flex flex-col place-items-start gap-1 space-y-3 px-2 text-sm text-gray-700">
            <div className="flex items-center justify-center">
              <span className="min-w-7">
                <SVGIcon icon="phone" aria-hidden />
              </span>
              <span className="text-grayShades-shade1" aria-label="User phone number">
                {data?.phoneNumber}
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="min-w-7">
                <SVGIcon icon="email" color="fill-grayShades-shade1" height={18} width={18} aria-hidden />
              </span>
              <span className="text-grayShades-shade1" aria-label="User email">
                {data?.email}
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="min-w-7">
                <SVGIcon icon="location" aria-hidden />
              </span>
              <span className="text-grayShades-shade1" aria-label="User city">
                {data?.city}
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="min-w-7">
                <SVGIcon icon="link" aria-hidden />
              </span>
              <span className="text-grayShades-shade1" aria-label="User website">
                www.websitename.com
              </span>
            </div>
          </div>
        </Card>

        {/* Tab content: view or edit account */}
        <div className="md:col-span-2">
          {tab === 1 ? (
            <div id="view-account-tab" role="tabpanel" aria-labelledby="Profile">
              <ViewAccountDetails defaultValues={{ ...(data ?? {}) }} />
            </div>
          ) : (
            <div id="edit-account-tab" role="tabpanel" aria-labelledby="My account">
              <EditAccountDetails defaultValues={{ ...(data ?? {}) }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
