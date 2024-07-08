import React, { useEffect, useState } from 'react'
import type { Editor } from 'grapesjs'
import grapesjs from 'grapesjs'
import gjsBlocksBasic from 'grapesjs-blocks-basic'
import gjsCountdown from 'grapesjs-component-countdown'
import customCodePlugin from 'grapesjs-custom-code'
import parserPostCSS from 'grapesjs-parser-postcss'
import gjsExport from 'grapesjs-plugin-export'
import gjsForms from 'grapesjs-plugin-forms'
import grapesjsPresetWebpage from 'grapesjs-preset-webpage'
import gjsStyleBg from 'grapesjs-style-bg'
import pluginTooltip from 'grapesjs-tooltip'
import gjsTuiImage from 'grapesjs-tui-image-editor'
import gjsTyped from 'grapesjs-typed'
import { useField } from 'payload/components/forms'
import type { Field } from 'payload/types'

import 'grapesjs/dist/css/grapes.min.css'
import 'grapick/dist/grapick.min.css'
import './grapesjsStyles.css'

export const GrapesEditor: Field = {
  name: 'visualEditor',
  type: 'json',
  localized: true,
  admin: {
    components: {
      Field: GrapesComponent,
    },
  },
}

export function GrapesComponent({ path }) {
  const [editor, setEditor] = useState<Editor>()
  const { value, setValue } = useField<object>({ path })
  useEffect(() => {
    const grapes = grapesjs.init({
      container: '#gjs',
      projectData: value || {},
      storageManager: { type: 'inline' },
      plugins: [
        gjsBlocksBasic,
        gjsForms,
        gjsCountdown,
        gjsExport,
        customCodePlugin,
        grapesjsPresetWebpage,
        parserPostCSS,
        pluginTooltip,
        gjsTuiImage,
        gjsTyped,
        gjsStyleBg,
        editor => {
          editor.Storage.add('inline', {
            store: data => {
              setValue(data)
              return Promise.resolve(data)
            },
            load: () => {
              return Promise.resolve(value || {});
            },
          })
        },
      ],
      pluginsOpts: {
        [gjsBlocksBasic as any]: {
          flexGrid: true,
        },
        [grapesjsPresetWebpage as any]: {
          modalImportTitle: 'Import Template',
          modalImportLabel:
            '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
        },
        [gjsTuiImage as any]: {
          script: [
            'https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js',
            'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.js',
            'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.js',
          ],
          style: [
            'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.css',
            'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.css',
          ],
        },
        [gjsTyped as any]: {
          block: {
            category: 'Extra',
            content: {
              type: 'typed',
              'type-speed': 40,
              strings: ['Text row one', 'Text row two', 'Text row three'],
            },
          },
        },
      },
    })
    setEditor(grapes)
  }, [])
  return <div id="gjs"></div>
}
