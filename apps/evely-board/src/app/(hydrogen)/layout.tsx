'use client';

import HydrogenLayout from '@/layouts/hydrogen/layout';
import { useIsMounted } from '@core/hooks/use-is-mounted';

import { useLayout } from '@/layouts/use-layout';

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return <LayoutProvider>{children}</LayoutProvider>;
}

function LayoutProvider({ children }: LayoutProps) {
  const { layout } = useLayout();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <HydrogenLayout>{children}</HydrogenLayout>;
}
