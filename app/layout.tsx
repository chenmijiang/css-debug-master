import Logo from '@/components/Logo';
import { type Metadata } from 'next';
import { Layout, Navbar } from 'nextra-theme-docs';
import 'nextra-theme-docs/style.css';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import './globals.css';

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

const CustomFooter = (
  <div className="flex justify-center w-full py-4 mt-4 text-xs text-gray-500 dark:text-gray-800 border-t border-gray-400 dark:border-gray-800 rounded-lg border">
    MIT {new Date().getFullYear()} © CSS Debug Master.
  </div>
);

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
      // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/chenmijiang/css-debug-master/tree/main"
          toc={{
            extraContent: CustomFooter,
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
