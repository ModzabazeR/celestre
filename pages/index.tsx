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

  const convertImage = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  return (
    <div className="m-8">
      <Head>
        <title>Genshin Web Player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-row items-center w-full justify-between">
        <div className="bg-[#1b1d2a] hover:bg-[#343746] py-4 px-6 rounded-lg cursor-pointer z-20 h-14" onClick={() => {alert("More options coming soon")}}>
          <span>Sort By Date</span>
          {/* {isArrowDown ? <IoIosArrowDown className="inline ml-2" /> : <IoIosArrowUp className="inline ml-2" />} */}
        </div>

        <button className="bg-[#1b1d2a] hover:bg-[#343746] py-4 px-6 rounded-lg h-14" onClick={() => { setIsReversed(!isReversed) }} title={isReversed ? "Ascending" : "Descending"}>
          {isReversed ? <FaSortAmountDownAlt /> : <FaSortAmountUpAlt />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {
          db.sort(sortedByDate).map((video) => {
            return (
              <Link key={video.id} href={`/watch/${video.id}`}>
                <a className="cursor-pointer bg-[#1b1d2a] hover:bg-[#343746] rounded-md" title={video.title}>
                  <div className="relative">
                    <div className="absolute z-20 bg-[#1b1d2a]/75 m-2 p-2 rounded-md bottom-0 right-0">{video.duration}</div>
                    <Image 
                     src={video.thumbnail} 
                     width={1280} 
                     height={720} 
                     alt={video.title} 
                     className="rounded-t-md pointer-events-none" 
                     layout='responsive'
                     placeholder='blur'
                     blurDataURL={`data:image/svg+xml;base64,${toBase64(convertImage(700, 475))}`} />
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