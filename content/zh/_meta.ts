import type { MetaRecord } from 'nextra';

/**
 * type MetaRecordValue =
 *  | TitleSchema
 *  | PageItemSchema
 *  | SeparatorSchema
 *  | MenuSchema
 *
 * type MetaRecord = Record<string, MetaRecordValue>
 **/
const meta: MetaRecord = {
  '*': {
    theme: {
      breadcrumb: false,
    },
  },
  index: {
    title: '前言',
  },
  overview: {
    title: '引言与概述',
  },
  introduction_to_css_bugs: {
    title: 'CSS Bug 简介',
  },
  environments_and_tools: {
    title: '调试环境和工具',
  },
  common_bugs: {
    title: '通常会导致 bug 的 CSS 属性',
  },
  breaking_layout: {
    title: '不同方式破坏布局',
  },
  inconsistency_implementation: {
    title: '浏览器不一致和实现错误',
  },
  tips_tricks: {
    title: '通用技巧和诀窍',
  },
  acknowledgements: {
    title: '致谢',
  },
  contact: {
    title: '联系',
    type: 'page',
    href: 'https://github.com/chenmijiang/css-debug-master/issues',
  },
};

export default meta;
