import ProfileBillingAddress from '@/components/organisms/account/components/profile-billing-address';
import { retrieveCustomer } from '@/services/customer';
import { listRegions } from '@/services/regions';
import { Metadata } from 'next';

import { notFound } from 'next/navigation';

import ProfileEmail from '@/components/organisms/account/components/profile-email';
import ProfileName from '@/components/organisms/account/components/profile-name';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'View and edit your Medusa Store profile.',
};

export default async function Profile() {
  const customer = await retrieveCustomer();
  const regions = await listRegions();

  if (!customer || !regions) {
    notFound();
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="flex flex-col mb-8 gap-y-4">
        <h1 className="text-2xl-semi">Profile</h1>
        <p className="text-base-regular">
          View and update your profile information, including your name, email,
          and phone number. You can also update your billing address, or change
          your password.
        </p>
      </div>
      <div className="flex flex-col w-full gap-y-8">
        <ProfileName customer={customer} />
        <Divider />
        <ProfileEmail customer={customer} />
        <Divider />
        {/* <ProfilePhone customer={customer} /> */}
        <Divider />
        {/* <ProfilePassword customer={customer} />
        <Divider /> */}
        <ProfileBillingAddress customer={customer} regions={regions} />
      </div>
    </div>
  );
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />;
};
