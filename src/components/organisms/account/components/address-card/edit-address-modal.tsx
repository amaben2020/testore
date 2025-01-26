'use client';

import React, { useEffect, useState, useActionState } from 'react';
import { PencilSquare as Edit, Trash } from '@medusajs/icons';
import { Button, Heading, Text, clx, useToggleState } from '@medusajs/ui';

import { HttpTypes } from '@medusajs/types';
import {
  deleteCustomerAddress,
  updateCustomerAddress,
} from '@/lib/data/customer';
import Spinner from '@/components/icons/spinner';
import { Dialog } from '@headlessui/react';
import Input from '@/components/elements/input';
import CountrySelect from '@/components/organisms/checkout/components/country-select';
import { SubmitButton } from '@/components/organisms/checkout/components/submit-button';

type EditAddressProps = {
  region: HttpTypes.StoreRegion;
  address: HttpTypes.StoreCustomerAddress;
  isActive?: boolean;
};

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const [removing, setRemoving] = useState(false);
  const [successState, setSuccessState] = useState(false);
  const { state, open, close: closeModal } = useToggleState(false);

  const [formState, formAction] = useActionState(updateCustomerAddress, {
    success: false,
    error: null,
    addressId: address.id,
  });

  const close = () => {
    setSuccessState(false);
    closeModal();
  };

  useEffect(() => {
    if (successState) {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState]);

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true);
    }
  }, [formState]);

  const removeAddress = async () => {
    setRemoving(true);
    await deleteCustomerAddress(address.id);
    setRemoving(false);
  };

  return (
    <>
      <div
        className={clx(
          'border rounded-rounded p-5 min-h-[220px] h-full w-full flex flex-col justify-between transition-colors',
          {
            'border-gray-900': isActive,
          }
        )}
        data-testid="address-container"
      >
        <div className="flex flex-col">
          <Heading
            className="text-left text-base-semi"
            data-testid="address-name"
          >
            {address.first_name} {address.last_name}
          </Heading>
          {address.company && (
            <Text
              className="txt-compact-small text-ui-fg-base"
              data-testid="address-company"
            >
              {address.company}
            </Text>
          )}
          <Text className="flex flex-col mt-2 text-left text-base-regular">
            <span data-testid="address-address">
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span data-testid="address-postal-city">
              {address.postal_code}, {address.city}
            </span>
            <span data-testid="address-province-country">
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </Text>
        </div>
        <div className="flex items-center gap-x-4">
          <button
            className="flex items-center text-small-regular text-ui-fg-base gap-x-2"
            onClick={open}
            data-testid="address-edit-button"
          >
            <Edit />
            Edit
          </button>
          <button
            className="flex items-center text-small-regular text-ui-fg-base gap-x-2"
            onClick={removeAddress}
            data-testid="address-delete-button"
          >
            {removing ? <Spinner /> : <Trash />}
            Remove
          </button>
        </div>
      </div>

      <Dialog open={state} onClose={close} data-testid="edit-address-modal">
        <Dialog.Title>
          <Heading className="mb-2">Edit address</Heading>
        </Dialog.Title>
        <form action={formAction}>
          <input type="hidden" name="addressId" value={address.id} />
          <div>
            <div className="grid grid-cols-1 gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <Input
                  label="First name"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  defaultValue={address.first_name || undefined}
                  data-testid="first-name-input"
                />
                <Input
                  label="Last name"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  defaultValue={address.last_name || undefined}
                  data-testid="last-name-input"
                />
              </div>
              <Input
                label="Company"
                name="company"
                autoComplete="organization"
                defaultValue={address.company || undefined}
                data-testid="company-input"
              />
              <Input
                label="Address"
                name="address_1"
                required
                autoComplete="address-line1"
                defaultValue={address.address_1 || undefined}
                data-testid="address-1-input"
              />
              <Input
                label="Apartment, suite, etc."
                name="address_2"
                autoComplete="address-line2"
                defaultValue={address.address_2 || undefined}
                data-testid="address-2-input"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <Input
                  label="Postal code"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  defaultValue={address.postal_code || undefined}
                  data-testid="postal-code-input"
                />
                <Input
                  label="City"
                  name="city"
                  required
                  autoComplete="locality"
                  defaultValue={address.city || undefined}
                  data-testid="city-input"
                />
              </div>
              <Input
                label="Province / State"
                name="province"
                autoComplete="address-level1"
                defaultValue={address.province || undefined}
                data-testid="state-input"
              />
              <CountrySelect
                name="country_code"
                region={region}
                required
                autoComplete="country"
                defaultValue={address.country_code || undefined}
                data-testid="country-select"
              />
              <Input
                label="Phone"
                name="phone"
                autoComplete="phone"
                defaultValue={address.phone || undefined}
                data-testid="phone-input"
              />
            </div>
            {formState.error && (
              <div className="py-2 text-rose-500 text-small-regular">
                {formState.error}
              </div>
            )}
          </div>
          <footer>
            <div className="flex gap-3 mt-6">
              <Button
                type="reset"
                variant="secondary"
                onClick={close}
                className="h-10"
                data-testid="cancel-button"
              >
                Cancel
              </Button>
              <SubmitButton data-testid="save-button">Save</SubmitButton>
            </div>
          </footer>
        </form>
      </Dialog>
    </>
  );
};

export default EditAddress;
