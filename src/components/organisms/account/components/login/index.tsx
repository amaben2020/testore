import { login } from '@/services/customer';
import { useActionState } from 'react';
import { LOGIN_VIEW } from '../../templates/login-template';
import Input from '@/components/elements/input';
import { SubmitButton } from '@/components/organisms/checkout/components/submit-button';

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null);

  return (
    <div
      className="flex flex-col items-center w-full max-w-sm"
      data-testid="login-page"
    >
      <h1 className="mb-6 uppercase text-large-semi">Welcome back</h1>
      <p className="mb-8 text-center text-base-regular text-ui-fg-base">
        Sign in to access an enhanced shopping experience.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>

        <p className="text-lg text-red-600">{message}</p>
        <SubmitButton data-testid="sign-in-button" className="w-full mt-6">
          Sign in
        </SubmitButton>
      </form>
      <span className="justify-center mx-auto text-center text-ui-fg-base text-small-regular">
        Not a member?{' '}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
          data-testid="register-button"
        >
          Join us
        </button>
        .
      </span>
    </div>
  );
};

export default Login;
