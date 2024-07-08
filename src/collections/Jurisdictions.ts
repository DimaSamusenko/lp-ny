import type { CollectionConfig } from 'payload/types'

export const Jurisdictions: CollectionConfig = {
  access: {
    delete: () => false,
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'header',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'footer',
      type: 'textarea',
      localized: true,
    },
  ],
  slug: 'jurisdictions',
}
