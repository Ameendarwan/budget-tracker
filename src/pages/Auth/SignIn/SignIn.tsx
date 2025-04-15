import { Eye, EyeOff } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@app/components/Form/Form';

import AuthHeader from '@app/components/AuthHeader';
import AuthPageTitle from '@app/components/AuthPageTitle';
import { Button } from '@app/components/Button/Button';
import { Checkbox } from '@app/components/Checkbox/Checkbox';
import { Input } from '@app/components/Input/Input';
import { Label } from '@app/components/Label/Label';
import { LoginPayload } from './types';
import SVGIcon from '@app/components/SVGIcon';
import auth from '@app/utils/auth';
import { paths } from '@app/routes/Routes.utils';
import signinImage from '@app/assets/auth/sign-in.png';
import { signinValidationSchema } from './SignIn.utils';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '@app/store/apis/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

const SignIn = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<LoginPayload>({
    resolver: yupResolver(signinValidationSchema),
    defaultValues: {
      email: 'test@gmail.com',
      password: '',
    },
  });

  const onSubmit = async (data: LoginPayload) => {
    try {
      const result = await login({
        body: {
          ...data,
        },
      }).unwrap();
      auth.saveToken(result.token);
      navigate(paths.analysis);
    } catch {
      console.error('Oops! login failed.');
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="test@gmail.com"
                          className="bg-inputBackground placeholder-placeholder"
                          icon={<SVGIcon icon="email" />}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
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

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Checkbox />
                    <Label className="text-base text-text">Remember me</Label>
                  </div>
                  <span
                    className="cursor-pointer text-base font-medium text-primary hover:underline"
                    onClick={() => navigate(paths.resetPassword)}>
                    Forgot Password?
                  </span>
                </div>

                <Button type="submit" className="!mt-6 !h-[48px] w-full" loading={isLoading}>
                  LOG IN
                </Button>

                <p className="text-center text-base text-text">
                  Don’t have an account?{' '}
                  <span onClick={() => navigate(paths.signUp)} className="cursor-pointer font-medium text-primary">
                    Sign Up
                  </span>
                </p>
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

export default SignIn;
