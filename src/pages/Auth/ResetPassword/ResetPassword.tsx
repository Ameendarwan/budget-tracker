import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@app/components/Form/Form';

import AuthHeader from '@app/components/AuthHeader';
import AuthPageTitle from '@app/components/AuthPageTitle';
import { Button } from '@app/components/Button/Button';
import { Input } from '@app/components/Input/Input';
import { ResetPayload } from './types';
import SVGIcon from '@app/components/SVGIcon';
import { paths } from '@app/routes/Routes.utils';
import { resetPasswordValidationSchema } from './ResetPassword.utils';
import { showSuccessToast } from '@app/components/Toast/Toast';
import signinImage from '@app/assets/auth/sign-in.png';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '@app/store/apis/auth';
import { yupResolver } from '@hookform/resolvers/yup';

const ResetPassword = () => {
  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm<ResetPayload>({
    resolver: yupResolver(resetPasswordValidationSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ResetPayload) => {
    try {
      await resetPassword({
        body: {
          ...data,
        },
      }).unwrap();
      showSuccessToast('Reset Password', 'Reset password email has ben sent');
      navigate(paths.signIn);
    } catch {
      console.error('Oops! Reset password failed.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col max-md:px-6 md:pl-20">
      <div className="flex flex-col justify-center md:flex-row">
        {/* Left side */}
        <div className="flex h-screen w-full flex-col gap-10 overflow-y-auto pb-20 pr-4 md:w-1/2 md:gap-24">
          <AuthHeader />
          <div className="max-sm:w-full md:max-w-[600px]">
            <div className="mb-10">
              <AuthPageTitle title="Reset Password" description="Enter your email for a reset link." />
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

                <Button type="submit" className="!mt-6 !h-[48px] w-full" loading={isLoading}>
                  Send Reset Password Link
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
          <img src={signinImage} alt="Reset Password Illustration" className="max-w-md" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
