import AuthWrapper from '@/app/shared/auth-layout/auth-wrapper';
import { metaObject } from '@/config/site.config';
import SignInForm from './sign-in-form';

export const metadata = {
  ...metaObject('Connexion'),
};

export default function SignInPage() {
  return (
    <AuthWrapper
      title={<>Connectez-vous avec vos informations d&apos;identification.</>}
      isSignIn
      isSocialLoginActive={false}
    >
      <SignInForm />
    </AuthWrapper>
  );
}
