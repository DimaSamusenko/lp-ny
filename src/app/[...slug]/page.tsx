import React, { Fragment } from 'react'
import { impossible } from '@libsql/hrana-client/lib-esm/util'
import { caching, createCache, memoryStore } from 'cache-manager'
import crypto from 'crypto'
import grapesjs from 'grapesjs'
import parse, { attributesToProps, Element, HTMLReactParserOptions } from 'html-react-parser'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, sep } from 'node:path'

import { Landing } from '../../payload-types'
import { AddCss } from '../_components/AddCss'

interface PageParams {
  params: { slug: string[] }
}

const editor = grapesjs.init({ headless: true })
const memoryCache = createCache(
  memoryStore({
    max: 100,
    ttl: 240 * 1000,
  }),
)

export default async function Page({ params }: PageParams) {
  let { slug } = params || {}
  if (!slug) slug = ['home']

  const lastSlug = slug[slug.length - 1]
  const cachedData: Landing & { cssData: string; htmlData: string } = await memoryCache.get(
    lastSlug,
  )
  let page: Landing
  let htmlData = ''
  let cssData = ''

  if (!cachedData?.htmlData) {
    const { docs } = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/landings?where[slug][equals]=${lastSlug}&depth=2`,
      {
        method: 'GET',
      },
    ).then(res => res.json())
    page = docs?.[0] as Landing
    if (page?.visualEditor) {
      editor.loadData(page?.visualEditor)
      htmlData = editor.getHtml()
      cssData = editor.getCss()
    }
    await memoryCache.set(lastSlug, { ...page, htmlData, cssData }, 240 * 1000)
  }

  if (!page && !cachedData?.htmlData) {
    return notFound()
  }

  const content = {
    cssData,
    htmlData,
    ...page,
    ...cachedData,
  }
  // @ts-ignore
  return (
    <>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: content.cssData || '' }}></style>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script id="googleTag" type="text/partytown" strategy="beforeInteractive">
        {content.googleTag}
      </Script>
      <span dangerouslySetInnerHTML={{ __html: content.htmlData || '' }}></span>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: content.css }}></style>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <script
        id="customJs"
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: content.js || '' }}
      ></script>
    </>
  )
}

type Path = {
  slug: string[]
}

type Paths = Path[]

export async function generateStaticParams() {
  let paths: Paths = []

  const pages: Landing[] = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/landings?depth=0&limit=300`,
  )?.then(res => res.json()?.then(data => data.docs))

  if (pages && Array.isArray(pages) && pages.length > 0) {
    paths = pages.map(page => {
      const { slug } = page

      let slugs = [slug]

      return { slug: slugs }
    })
  }

  return paths
}

/*async function tempFile(prefix = '', suffix = '', data = '', encoding = 'utf8') {
  try {
    const CWD = __dirname
    const tempDir = await mkdtemp(join(CWD, 'foobar-'))
    const filePath = join(tempDir, prefix + crypto.randomBytes(16).toString('hex') + suffix)
    // @ts-ignore
    await writeFile(filePath, data, encoding)
    return filePath
  } catch (error) {
    throw error
  }
}*/
