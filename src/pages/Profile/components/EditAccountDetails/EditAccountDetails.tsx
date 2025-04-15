import { EditAccountDetailsProps, FormData } from './types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@app/components/Form/Form';

import { Button } from '@app/components/Button/Button';
import { Card } from '@app/components/Card/Card';
import { FC } from 'react';
import { Input } from '@app/components/Input/Input';
import { Textarea } from '@app/components/TextArea/Textarea';
import TitleSection from '@app/components/TitleSection';
import auth from '@app/utils/auth';
import { formSchema } from './EditAccountDetails.utils';
import { showSuccessToast } from '@app/components/Toast/Toast';
import { useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '@app/store/apis/user';
import { yupResolver } from '@hookform/resolvers/yup';

const EditAccountDetails: FC<EditAccountDetailsProps> = ({ defaultValues }) => {
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  const form = useForm<FormData>({
    resolver: yupResolver(formSchema),
    defaultValues: { ...defaultValues },
  });

  const onSubmit = (values: FormData) => {
    updateUser({
      userId: auth.getDecodedToken()?.id ?? '',
      body: {
        ...values,
      },
    });
    showSuccessToast('User Updated', 'User edited successfully.!');
  };

  return (
    <Card className="w-full rounded-[8px] shadow-custom">
      <TitleSection title="My Account" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 rounded bg-white p-6">
          {/* Name & Job */}
          <div>
            <h3 className="text-md mb-2 font-semibold text-text">Name & Job</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Brooklyn" {...field} className="bg-inputBackground placeholder-placeholder" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Simmons" {...field} className="bg-inputBackground placeholder-placeholder" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Simmons" {...field} className="bg-inputBackground placeholder-placeholder" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-md mb-2 font-semibold">Address</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="78 south 34 North"
                        {...field}
                        className="bg-inputBackground placeholder-placeholder"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="North Orange"
                        {...field}
                        className="bg-inputBackground placeholder-placeholder"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="New York" {...field} className="bg-inputBackground placeholder-placeholder" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input placeholder="9876665" {...field} className="bg-inputBackground placeholder-placeholder" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4">
              <FormField
                control={form.control}
                name="completeAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complete Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} className="bg-inputBackground placeholder-placeholder" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-md mb-2 font-semibold">Contact Info</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123-456-8945"
                        {...field}
                        className="bg-inputBackground placeholder-placeholder"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@domain.com"
                        {...field}
                        className="bg-inputBackground placeholder-placeholder"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-md mb-2 font-semibold">Bio</h3>
            <div className="mb-6 flex w-full flex-row">
              <FormField
                control={form.control}
                name="aboutMe"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>About Me</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="I'm a"
                        {...field}
                        className="w-full bg-inputBackground placeholder-placeholder md:min-w-[225px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="9/05/99"
                        {...field}
                        className="w-full bg-inputBackground placeholder-placeholder md:min-w-[225px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masters"
                        {...field}
                        className="w-full bg-inputBackground placeholder-placeholder md:min-w-[225px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Female"
                        {...field}
                        className="w-full bg-inputBackground placeholder-placeholder md:min-w-[250px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Financial */}
          <div>
            <h3 className="text-md mb-2 font-semibold">Financial Information</h3>
            <FormField
              control={form.control}
              name="budgetLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget (PKR)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1000 - 500000"
                      {...field}
                      className="max-w-max bg-inputBackground placeholder-placeholder"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" loading={updateLoading}>
              Update
            </Button>
            <Button type="button" variant="ghost" className="text-base font-medium text-grayShades-shade3">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default EditAccountDetails;
