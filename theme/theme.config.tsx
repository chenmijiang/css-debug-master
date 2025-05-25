import CustomFooter from '@/components/Footer';
import { type Layout } from 'nextra-theme-docs';

type ThemeConfigProps = Omit<Parameters<typeof Layout>[0], 'children' | 'pageMap'>;
export type Locale = 'en' | 'zh';

export function generateThemeConfig(lang: Locale): ThemeConfigProps {
  const isEnglish = lang === 'en';
  return {
    docsRepositoryBase: 'https://github.com/chenmijiang/css-debug-master/tree/main',
    toc: {
      extraContent: <CustomFooter />,
    },
    i18n: [
      { locale: 'en', name: isEnglish ? 'English' : '英文' },
      { locale: 'zh', name: isEnglish ? 'Chinese' : '中文' },
    ],
    themeSwitch: {
      dark: isEnglish ? 'dark' : '暗黑',
      light: isEnglish ? 'light' : '亮色',
      system: isEnglish ? 'system' : '跟随系统',
    },
    editLink: isEnglish ? 'Edit this page' : '编辑此页面',
    feedback: {
      content: isEnglish ? 'Question? Give us feedback' : '有疑问？请给我们反馈',
    },
  };
}
