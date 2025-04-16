import { Eye, EyeOff } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@app/components/Form/Form';

import AuthHeader from '@app/components/AuthHeader';
import AuthPageTitle from '@app/components/AuthPageTitle';
import { Button } from '@app/components/Button/Button';
import { Input } from '@app/components/Input/Input';
import { SignUpPayload } from '@app/store/apis/auth/types';
import { paths } from '@app/routes/Routes.utils';
import { showSuccessToast } from '@app/components/Toast/Toast';
import signupImage from '@app/assets/auth/sign-up.png';
import { signupValidationSchema } from './SignUp.utils';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '@app/store/apis/auth';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [signUp, { isLoading }] = useSignUpMutation();

  const form = useForm<SignUpPayload>({
    resolver: yupResolver(signupValidationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: 'test@gmail.com',
      password: '',
      confirmPassword: '',
      budgetLimit: 0,
    },
  });

  const onSubmit = async (data: SignUpPayload) => {
    try {
      await signUp({
        body: {
          ...data,
        },
      }).unwrap();
      showSuccessToast('Signup Successfull', '');
      navigate(paths.signIn);
    } catch {}
  };

  const handleShowPassword = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    setShowPassword(prev => !prev);
  };

  return (
    <div className="flex min-h-screen flex-col max-md:px-6 md:pl-20">
      <div className="flex flex-col justify-center md:flex-row">
        {/* Left side */}
        <div className="flex h-screen w-full flex-col gap-10 overflow-y-auto pb-20 pr-4 md:w-1/2 md:gap-14">
          <AuthHeader />
          <div className="max-sm:w-full md:max-w-[600px]">
            <div className="mb-10">
              <AuthPageTitle title="Sign Up" description="Welcome to our community" />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-4">
                  <FormField
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Cameron"
                            className="bg-inputBackground placeholder-placeholder"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Williamson"
                            className="bg-inputBackground placeholder-placeholder"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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

                <FormField
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
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
                  name="budgetLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget Limit</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Enter Amount"
                          className="bg-inputBackground placeholder-placeholder"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="!mt-6 !h-[48px] w-full" loading={isLoading}>
                  SIGN UP
                </Button>

                <p className="text-center text-base text-text">
                  Already have an account?{' '}
                  <span onClick={() => navigate(paths.signIn)} className="cursor-pointer font-medium text-primary">
                    Log in
                  </span>
                </p>
              </form>
            </Form>
          </div>
        </div>

        <div className="mx-8 hidden w-px bg-border md:block" />

        {/* Right side image */}
        <div className="hidden h-screen w-1/2 items-center justify-center bg-white max-md:hidden md:flex">
          <img src={signupImage} alt="Signup Illustration" className="max-w-md" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
