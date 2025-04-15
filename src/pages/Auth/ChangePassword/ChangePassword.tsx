import { Eye, EyeOff } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@app/components/Form/Form';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import AuthHeader from '@app/components/AuthHeader';
import AuthPageTitle from '@app/components/AuthPageTitle';
import { Button } from '@app/components/Button/Button';
import { ChangePasswordPayload } from './types';
import { Input } from '@app/components/Input/Input';
import auth from '@app/utils/auth';
import { changePasswordValidationSchema } from './ChangePassword.utils';
import { paths } from '@app/routes/Routes.utils';
import { showSuccessToast } from '@app/components/Toast/Toast';
import signinImage from '@app/assets/auth/sign-in.png';
import { useChangePasswordMutation } from '@app/store/apis/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const form = useForm<ChangePasswordPayload>({
    resolver: yupResolver(changePasswordValidationSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const token = searchParams.get('token');
    if (!!token) auth.saveToken(token);
  }, [searchParams]);

  const onSubmit = async (data: ChangePasswordPayload) => {
    try {
      await changePassword({
        body: {
          userId: auth.getDecodedToken()?.id ?? '',
          password: data.password,
        },
      }).unwrap();
      auth.clearToken();
      navigate(paths.signIn);
      showSuccessToast('Password Changed', 'Password has been updated');
    } catch {
      console.error('Oops! Password changed failed.');
    }
  };

  const handleShowPassword = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    setShowPassword(prev => !prev);
  };

  return (
    <div className="flex min-h-screen flex-col max-md:px-6 md:pl-20">
      <div className="flex flex-col justify-center md:flex-row">
        {/* Left side */}
        <div className="flex h-screen w-full flex-col gap-10 overflow-y-auto pb-20 pr-4 md:w-1/2 md:gap-24">
          <AuthHeader />
          <div className="max-sm:w-full md:max-w-[600px]">
            <div className="mb-10">
              <AuthPageTitle title="Welcome Back!" description="Sign in to continue to Budget Tracker" />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          className="bg-inputBackground placeholder-placeholder"
                          icon={
                            showPassword ? (
                              <Eye className="cursor-pointer text-placeholder" onClick={handleShowPassword} />
                            ) : (
                              <EyeOff className="cursor-pointer text-placeholder" onClick={handleShowPassword} />
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          className="bg-inputBackground placeholder-placeholder"
                          icon={
                            showPassword ? (
                              <Eye className="cursor-pointer text-placeholder" onClick={handleShowPassword} />
                            ) : (
                              <EyeOff className="cursor-pointer text-placeholder" onClick={handleShowPassword} />
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="!mt-6 !h-[48px] w-full" loading={isLoading}>
                  SAVE
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="mx-8 hidden w-px bg-border md:block" />

        {/* Right side image */}
        <div className="hidden h-screen w-1/2 items-center justify-center bg-white max-md:hidden md:flex">
          <img src={signinImage} alt="Login Illustration" className="max-w-md" />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
