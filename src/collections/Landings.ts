import type { CollectionConfig } from 'payload/types'

import { GrapesEditor } from '../fields/grapesjs/grapes'
import { slugField } from '../fields/slug'

export const Landings: CollectionConfig = {
  slug: 'landings',
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    livePreview: {
      url: ({ data }) =>
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/${data.slug !== 'home' ? data.slug : ''}`,
    },
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/${
          doc.slug !== 'home' ? (doc.slug as string) : ''
        }`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      required: true,
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      tabs: [
        {
          fields: [GrapesEditor],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'googleTag',
              type: 'code',
              admin: {
                language: 'javascript',
              },
            },
          ],
          label: 'Google Tag',
        },
        {
          fields: [
            {
              name: 'js',
              type: 'code',
              admin: {
                language: 'javascript',
              },
            },
          ],
          label: 'Javascript',
        },
        {
          fields: [
            {
              name: 'css',
              type: 'code',
              admin: {
                language: 'css',
              },
            },
          ],
          label: 'CSS',
        },
      ],
      type: 'tabs',
    },
    {
      name: 'dateTo',
      admin: {
        position: 'sidebar',
      },
      type: 'date',
    },
    {
      name: 'redirect',
      admin: {
        position: 'sidebar',
      },
      type: 'text',
    },
    {
      name: 'jurisdiction',
      admin: {
        position: 'sidebar',
      },
      relationTo: 'jurisdictions',
      type: 'relationship',
    },
    slugField(),
  ],
}
