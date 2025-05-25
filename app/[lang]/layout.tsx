import Logo from '@/components/Logo';
import { generateThemeConfig, Locale } from '@/theme/theme.config';
import { Analytics } from '@vercel/analytics/next';
import { type Metadata } from 'next';
import { Layout, Navbar } from 'nextra-theme-docs';
import 'nextra-theme-docs/style.css';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';

import './globals.css';

const isProduction = process.env.NODE_ENV === 'production';

export const metadata: Metadata = {
  title: {
    default: 'CSS Debug Master',
    template: '%s | CSS Debug Master',
  },
  description: 'CSS Debug Master documentation',
  icons: '/favicon.ico',
};

// const banner = <Banner storageKey="some-key">Nextra 4.0 is released 🎉</Banner>;
const navbar = (
  <Navbar
    logo={<Logo className="h-8 md:h-10 relative -left-2" />}
    logoLink="/"
    projectLink="https://github.com/chenmijiang/css-debug-master"
  />
);

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang = 'en' } = await params;

  const pageMap = await getPageMap(`/${lang}`);
  const themeConfig = generateThemeConfig(lang);

  return (
    <html
      lang={lang}
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head></Head>
      <body>
        <Layout {...themeConfig} navbar={navbar} pageMap={pageMap}>
          {children}
          {isProduction && <Analytics />}
        </Layout>
      </body>
    </html>
  );
}
