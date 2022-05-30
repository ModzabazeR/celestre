import db from "../../db";
import { GetServerSideProps } from "next";
import { VideoDetails } from "../../typings";
import CustomVideoPlayer from "../../components/CustomVideoPlayer";
import packer from "../../utils/packer";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import Link from "next/link";
import { FiRefreshCw } from "react-icons/fi";
import { FaHome } from "react-icons/fa";

interface PostProps {
    videoDetails: VideoDetails;
    audio_list: {
        id: number;
        lang: string;
        url: any;
        timeshift: number;
    }[];
    video_url: string;
}

const Post = ({ videoDetails, audio_list, video_url }: PostProps) => {

    const router: NextRouter = useRouter();
    const { id } = router.query;

    const db_data = db.find((video: any) => video.id === id) ?? { id: "", title: "", duration: "", thumbnail: "", subtitleUrls: {}, audioUrls: {}, tags: [] };

    return (
        <div className="flex flex-col items-center justify-center">
            <Head>
                <title>{db_data.title} - Genshin Web Player</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="w-full max-w-screen-md relative grid justify-centers p-8">
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-center">{db_data.title}</h1>
                <CustomVideoPlayer
                    videoSrc={video_url}
                    subtitleList={packer.packSubtitle({ subtitleUrls: db_data.subtitleUrls })}
                    audioList={audio_list}
                    thumbnail={db_data.thumbnail}
                    videoDetails={videoDetails}
                />
                <div className="divide-x-2 divide-[#343746]">
                    <button className="bg-[#1b1d2a] p-2 mb-4 rounded-l-md hover:bg-[#343746] transition-all w-1/2 text-sm lg:text-base" onClick={router.reload}>
                        <FiRefreshCw className="inline mr-2" />
                        <span>Reload</span>
                    </button>
                    <Link href="/">
                        <button className="bg-[#1b1d2a] p-2 mb-4 rounded-r-md hover:bg-[#343746] transition-all w-1/2 text-sm lg:text-base">
                        <FaHome className="inline mr-2" />
                        Back to Home
                        </button>
                    </Link>
                </div>

            </main>
        </div>
    )
}

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    const res = context.res;
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=60");

    const db_data = db.find((video: any) => video.id === id) ?? { id: "", subtitleUrls: {}, audioUrls: {} };

    const Youtube = require('youtube-stream-url')
    const video = await Youtube.getInfo({ url: `https://www.youtube.com/watch?v=${id}` })
    const videoDetails: VideoDetails = video.videoDetails;

    const video_url = await packer.extractVideoUrl(`https://www.youtube.com/watch?v=${db_data?.id}`);
    const audio_list = await packer.packAudios({ audioUrls: db_data.audioUrls });
    return {
        props: {
            videoDetails,
            audio_list,
            video_url,
        }
    }
}