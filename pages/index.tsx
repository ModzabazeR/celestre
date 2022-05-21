import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import db from '../db'
import { dbItem } from '../typings'
import Image from 'next/image'
import { useState } from 'react'
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from 'react-icons/fa'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

const Home: NextPage = () => {
  const [isReversed, setIsReversed] = useState(false)
  const [isArrowDown, setIsArrowDown] = useState(false)

  const sortedByDate = (a: dbItem, b: dbItem) => {
    if (isReversed) {
      return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
    }
    else {
      return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    }
  }

  const sortedByDuration = (a: dbItem, b: dbItem) => {
    // duration format: mm:ss
    const a_duration = a.duration.split(':').map(Number)
    const b_duration = b.duration.split(':').map(Number)

    if (isReversed) {
      return a_duration[0] * 60 + a_duration[1] - (b_duration[0] * 60 + b_duration[1])
    }
    else {
      return b_duration[0] * 60 + b_duration[1] - (a_duration[0] * 60 + a_duration[1])
    }
  }

  return (
    <div>
      <Head>
        <title>Genshin Web Player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-row items-center w-full justify-between px-8 pt-8">
        <div className="bg-[#1b1d2a] hover:bg-[#343746] py-4 px-6 rounded-lg cursor-pointer z-20 h-14" onClick={() => {alert("More options coming soon")}}>
          <span>Sort By Date</span>
          {/* {isArrowDown ? <IoIosArrowDown className="inline ml-2" /> : <IoIosArrowUp className="inline ml-2" />} */}
        </div>

        <button className="bg-[#1b1d2a] hover:bg-[#343746] py-4 px-6 rounded-lg h-14" onClick={() => { setIsReversed(!isReversed) }} title={isReversed ? "Ascending" : "Descending"}>
          {isReversed ? <FaSortAmountDownAlt /> : <FaSortAmountUpAlt />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8 mt-8">
        {
          db.sort(sortedByDate).map((video) => {
            return (
              <Link key={video.id} href={`/watch/${video.id}`}>
                <a className="cursor-pointer bg-[#1b1d2a] hover:bg-[#343746] rounded-b-md mb-8" title={video.title}>
                  <div className="relative">
                    <div className="absolute z-20 bg-[#1b1d2a]/75 m-2 p-2 rounded-md bottom-0 right-0">{video.duration}</div>
                    <Image src={video.thumbnail} width={1280} height={720} alt={video.title} className="rounded-t-md pointer-events-none" layout='responsive' />
                  </div>
                  <h1 className="m-3 line-clamp-2 font-medium">{video.title}</h1>
                </a>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home