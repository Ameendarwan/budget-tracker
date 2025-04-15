import React, { FC } from 'react';

import { AuthPageTitleProps } from './types';

const AuthPageTitle: FC<AuthPageTitleProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text text-[32px] font-semibold">{title}</h2>
      <span className="text-2xl text-[#878A99]">{description}</span>
    </div>
  );
};

export default AuthPageTitle;
