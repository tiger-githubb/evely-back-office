'use client';

import SearchWidget from '@/app/shared/search/search';
import HamburgerButton from '@/layouts/hamburger-button';
import HeaderMenuRight from '@/layouts/header-menu-right';
import Sidebar from '@/layouts/hydrogen/sidebar';
import StickyHeader from '@/layouts/sticky-header';
import Logo from '@public/logo-primary.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <StickyHeader className="z-[990] 2xl:py-5 3xl:px-8 4xl:px-10">
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton
          view={<Sidebar className="static w-full 2xl:w-full" />}
        />
        <Link
          href={'/'}
          aria-label="Site Logo"
          className="me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden"
        >
          {/* <Logo /> */}
          <Image src={Logo} alt="logo" />
        </Link>

        <SearchWidget />
      </div>

      <HeaderMenuRight />
    </StickyHeader>
  );
}
