import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import db from '../db'
import Card from '../components/Card'
import useSorted from '../utils/useSorted'
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from 'react-icons/fa'
import loc from "../locales/locales";

const Home: NextPage = () => {
  const router = useRouter()
  const { locale } = router;
  const t = locale === "th" ? loc.th : loc.en;

  const {
    isReversed,
    isSortedByDate,
    setIsReversed,
    setIsSortedByDate,
    sortedByDate,
    sortedByDuration
  } = useSorted()

  return (
    <div className={"m-8 " + t.code}>
      <Head>
        <title>Celestre</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-row items-center w-full justify-between">
        <div className="bg-[#1b1d2a] hover:bg-[#343746] py-4 px-6 rounded-lg cursor-pointer z-20 h-14 transition-all" onClick={() => {setIsSortedByDate(!isSortedByDate)}}>
          <span>{isSortedByDate ? t.sortByDate : t.sortByDuration}</span>
        </div>

        <button className="bg-[#1b1d2a] hover:bg-[#343746] py-4 px-6 rounded-lg h-14 transition-all" onClick={() => { setIsReversed(!isReversed) }} title={isReversed ? t.ascending : t.descending}>
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