import type { NextPage } from 'next'
import Head from 'next/head'
import db from '../db'
import Card from '../components/Card'
import useSorted from '../utils/useSorted'
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from 'react-icons/fa'

const Home: NextPage = () => {

  const {
    isReversed,
    isSortedByDate,
    setIsReversed,
    setIsSortedByDate,
    sortedByDate,
    sortedByDuration
  } = useSorted()

  return (
    <div className="m-8">
      <Head>
        <title>Genshin Web Player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-row items-center w-full justify-between">
        <div className="bg-[#1b1d2a] hover:bg-[#343746] py-4 px-6 rounded-lg cursor-pointer z-20 h-14 transition-all" onClick={() => {setIsSortedByDate(!isSortedByDate)}}>
          <span>{"Sort By " + (isSortedByDate ? "Date" : "Duration")}</span>
        </div>

        <button className="bg-[#1b1d2a] hover:bg-[#343746] py-4 px-6 rounded-lg h-14 transition-all" onClick={() => { setIsReversed(!isReversed) }} title={isReversed ? "Ascending" : "Descending"}>
          {isReversed ? <FaSortAmountDownAlt /> : <FaSortAmountUpAlt />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
        {
          db.sort(isSortedByDate ? sortedByDate : sortedByDuration).map((video) => {
            return (
              <Card
                key={video.id}
                videoId={video.id}
                videoThumbnail={video.thumbnail}
                videoTitle={video.title}
                videoDuration={video.duration} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Home