import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Genshin Web Player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid items-center justify-center text-center">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <Link href="/watch/TAlKhARUcoY"><a className="pt-5 text-blue-400 underline">Watch Demo 1 (Genshin Impact Chapter Trailer)</a></Link>
        <Link href="/watch/qrH9vMZBwAk"><a className="pt-5 text-blue-400 underline">Watch Demo 2 (Hutao Character Demo)</a></Link>
      </main>
    </div>
  )
}

export default Home