import AuthWrapper from '@/app/shared/auth-layout/auth-wrapper';
import { metaObject } from '@/config/site.config';
import SignUpForm from './sign-up-form';

export const metadata = {
  ...metaObject('Sign Up 4'),
};

export default function SignUpPage() {
  return (
    <AuthWrapper
      title="Join us today! Get special benefits and stay up-to-date."
      isSocialLoginActive={true}
    >
      <SignUpForm />
    </AuthWrapper>
  );
}
