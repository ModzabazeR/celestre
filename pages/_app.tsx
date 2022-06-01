import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import Head from 'next/head'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

function MyApp({ Component, pageProps }: AppProps) {

  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })

  return (
    <>
      <Head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" 
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" />
          <link rel="stylesheet" href="/assets/fonts/style.css" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
