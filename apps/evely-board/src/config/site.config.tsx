import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/logo-short.svg';
import logoImg from '@public/logo.svg';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: "Pulse - Votre solution d'archivage",
  description: `Pulse the ultimate file management solution for businesses. Streamline your document management, enhance collaboration, and ensure data security.`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Pulse Archive` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Pulse Archive` : title,
      description,
      url: 'https://isomorphic-furyroad.vercel.app',
      siteName: 'Pulse Archive', // https://developers.google.com/search/docs/appearance/site-names
      // images: {
      // url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
      //   width: 1200,
      //   height: 630,
      // },
      locale: 'fr_Fr',
      type: 'website',
    },
  };
};
