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
  contact: {
    title: 'Contact',
    type: 'page',
    href: 'https://github.com/chenmijiang/css-debug-master/issues',
  },
};

export default meta;
