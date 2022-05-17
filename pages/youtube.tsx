import type { NextPage } from 'next'
import CustomVideoPlayer from '../components/CustomVideoPlayer';
// import dynamic from 'next/dynamic'
// const ReactNetflixPlayer = dynamic(() => import('react-netflix-player'), {
//     ssr: false,
// })

const YouTube: NextPage = () => {

    return (
        <div className="flex justify-center items-center h-screen">
            {/* <CustomVideoPlayer /> */}
        </div>
    )
}

export default YouTube;