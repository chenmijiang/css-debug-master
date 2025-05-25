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
    title: 'Foreword',
  },
  overview: {
    title: 'Introduction and Overview',
  },
  introduction_to_css_bugs: {
    title: 'Introduction to CSS Bugs',
  },
  environments_and_tools: {
    title: 'Debugging Environments and Tools',
  },
  common_bugs: {
    title: 'Common Bugs',
  },
  breaking_layout: {
    title: 'Breaking Layout',
  },
  inconsistency_implementation: {
    title: 'Inconsistency Implementation',
  },
  tips_tricks: {
    title: 'General Tips and Tricks',
  },
  acknowledgements: {
    title: 'Acknowledgements',
  },
  contact: {
    title: 'Contact',
    type: 'page',
    href: 'https://github.com/chenmijiang/css-debug-master/issues',
  },
};

export default meta;
