declare module '*.mdx' {
  import type { ReactNode } from 'react';

  export const metadata: Record<string, any>;

  interface MDXProps {
    children: ReactNode;
  }

  const MDXContent: (props: MDXProps) => ReactNode;
  export default MDXContent;
}
