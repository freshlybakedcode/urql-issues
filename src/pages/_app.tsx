import '../styles/globals.css'
import UrqlProvider from '../providers/UrqlProvider';
import React from 'react';
import { CountryProvider } from '../providers/CountryContext';
import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <UrqlProvider>
      <CountryProvider>
        <Component {...pageProps} />
      </CountryProvider>
    </UrqlProvider>
  )
}

export default MyApp
