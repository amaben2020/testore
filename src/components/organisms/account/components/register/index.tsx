'use client';

import { useActionState } from 'react';
import { LOGIN_VIEW } from '../../templates/login-template';
import { signup } from '@/lib/data/customer';
import Input from '@/components/elements/input';
import LocalizedClientLink from '@/components/elements/localized-link';
import { SubmitButton } from '@/components/organisms/checkout/components/submit-button';

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null);

  return (
    <div
      className="flex flex-col items-center max-w-sm"
      data-testid="register-page"
    >
      <h1 className="mb-6 uppercase text-large-semi">
        Become a Medusa Store Member
      </h1>
      <p className="mb-4 text-center text-base-regular text-ui-fg-base">
        Create your Medusa Store Member profile, and get access to an enhanced
        shopping experience.
      </p>
      <form className="flex flex-col w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Last name"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>

        <p>{message}</p>
        <span className="mt-6 text-center text-ui-fg-base text-small-regular">
          By creating an account, you agree to Medusa Store&apos;s{' '}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            Privacy Policy
          </LocalizedClientLink>{' '}
          and{' '}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          Join
        </SubmitButton>
      </form>
      <span className="mt-6 text-center text-ui-fg-base text-small-regular">
        Already a member?{' '}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Sign in
        </button>
        .
      </span>
    </div>
  );
};

export default Register;
