'use client';

import { useActionState } from 'react';

import { Text, Heading, Input, IconButton } from '@medusajs/ui';

import { CheckCircleMiniSolid, XCircleSolid } from '@medusajs/icons';
import { useEffect, useState } from 'react';
import { createTransferRequest } from '@/lib/data/orders';
import { SubmitButton } from '@/components/organisms/checkout/components/submit-button';

export default function TransferRequestForm() {
  const [showSuccess, setShowSuccess] = useState(false);

  const [state, formAction] = useActionState(createTransferRequest, {
    success: false,
    error: null,
    order: null,
  });

  useEffect(() => {
    if (state.success && state.order) {
      setShowSuccess(true);
    }
  }, [state.success, state.order]);

  return (
    <div className="flex flex-col w-full gap-y-4">
      <div className="grid items-center w-full sm:grid-cols-2 gap-x-8 gap-y-4">
        <div className="flex flex-col gap-y-1">
          <Heading level="h3" className="text-lg text-neutral-950">
            Order transfers
          </Heading>
          <Text className="text-base-regular text-neutral-500">
            Can&apos;t find the order you are looking for?
            <br /> Connect an order to your account.
          </Text>
        </div>
        <form
          action={formAction}
          className="flex flex-col gap-y-1 sm:items-end"
        >
          <div className="flex flex-col w-full gap-y-2">
            <Input className="w-full" name="order_id" placeholder="Order ID" />
            <SubmitButton
              variant="secondary"
              className="self-end w-fit whitespace-nowrap"
            >
              Request transfer
            </SubmitButton>
          </div>
        </form>
      </div>
      {!state.success && state.error && (
        <Text className="text-right text-base-regular text-rose-500">
          {state.error}
        </Text>
      )}
      {showSuccess && (
        <div className="flex items-center self-stretch justify-between w-full p-4 bg-neutral-50 shadow-borders-base">
          <div className="flex items-center gap-x-2">
            <CheckCircleMiniSolid className="w-4 h-4 text-emerald-500" />
            <div className="flex flex-col gap-y-1">
              <Text className="text-medim-pl text-neutral-950">
                Transfer for order {state.order?.id} requested
              </Text>
              <Text className="text-base-regular text-neutral-600">
                Transfer request email sent to {state.order?.email}
              </Text>
            </div>
          </div>
          <IconButton
            variant="transparent"
            className="h-fit"
            onClick={() => setShowSuccess(false)}
          >
            <XCircleSolid className="w-4 h-4 text-neutral-500" />
          </IconButton>
        </div>
      )}
    </div>
  );
}
