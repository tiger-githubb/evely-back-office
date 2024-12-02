import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import AuthProvider from '@/app/api/auth/[...nextauth]/auth-provider';
import { inter, lexendDeca } from '@/app/fonts';
import GlobalDrawer from '@/app/shared/drawer-views/container';
import GlobalModal from '@/app/shared/modal-views/container';
import { JotaiProvider, ThemeProvider } from '@/app/shared/theme-provider';
import { siteConfig } from '@/config/site.config';
import NextProgress from '@core/components/next-progress';
import cn from '@core/utils/class-names';
import { getServerSession } from 'next-auth/next';
import { Toaster } from 'react-hot-toast';

// styles
import '@/app/globals.css';
import ReactQueryProvider from '@/utils/providers/ReactQueryProvider';
import 'swiper/css';
import 'swiper/css/navigation';

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html
      lang="fr"
      dir="ltr"
      // required this one for next-themes, remove it if you are not using next-theme
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, 'font-inter')}
      >
        <ReactQueryProvider>
          <AuthProvider session={session}>
            <ThemeProvider>
              <NextProgress />
              <JotaiProvider>
                {children}
                <Toaster position="bottom-right" />
                <GlobalDrawer />
                <GlobalModal />
              </JotaiProvider>
            </ThemeProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
