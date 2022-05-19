import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import db from '../db'
import Image from 'next/image'

const Home: NextPage = () => {
  const sortedByDate = db.sort((a, b) => {
    return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
  })

  return (
    <div>
      <Head>
        <title>Genshin Web Player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8 mt-8">
          {
            sortedByDate.map((video) => {
              return (
                <Link key={video.id} href={`/watch/${video.id}`}>
                  <div className="cursor-pointer">
                    {/* <h1>{video.title}</h1>
                    <div>{video.duration}</div> */}
                    <Image src={video.thumbnail} width={1280} height={720} alt={video.title} className="rounded-md" layout='responsive' />
                  </div>
                </Link>
              )
            })
          }
        </div>
    </div>
  )
}

export default Home