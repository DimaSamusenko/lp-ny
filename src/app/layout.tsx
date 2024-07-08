/* eslint-disable @next/next/no-page-custom-font */
import React from 'react'
import { partytownSnippet } from '@builder.io/partytown/integration'
const snippetText = partytownSnippet()

import Script from 'next/script'

import './app.scss'

import classes from './layout.module.scss'

export const metadata = {
  title: 'Landings cms',
  description: 'landings',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="description" content="" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"
        />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <title>Welcome Olympus</title>
        <link rel="canonical" href="https://www.marathonbet.com/landings/welcome_olympus_ru" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i%7CRoboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&amp;subset=cyrillic,cyrillic-ext&display=optional"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Alumni+Sans:300,300i,400,400i,500,500i,600,600i,700,700i&amp;subset=cyrillic,cyrillic-ext&display=optional"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=League+Spartan:300,300i,400,400i,500,500i,600,600i,700,700i&amp;subset=cyrillic,cyrillic-ext&display=optional"
          rel="stylesheet"
        />
        <meta
          name="yandex-tableau-widget"
          content="logo=/landings/assets/images/favicon/marathonbet-YandexBrowser-ru.png, color=#ffffff"
        />
        <Script id="partytown">{snippetText}</Script>
      </head>
      <body className={classes.body}>{children}</body>
    </html>
  )
}
