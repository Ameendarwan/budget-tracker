import React from 'react';
import logoImage from '@app/assets/logo.png';
import logoText from '@app/assets/logo-text.svg';
import { paths } from '@app/routes/Routes.utils';
import { useNavigate } from 'react-router-dom';

const AuthHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-12 flex flex-row items-center gap-5">
      <img src={logoImage} className="cursor-pointer" alt="Logo" onClick={() => navigate(paths.signIn)} />
      <img src={logoText} alt="Logo Text" />
    </div>
  );
};

export default AuthHeader;
