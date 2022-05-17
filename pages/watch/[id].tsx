import db from "../../db";
import { GetServerSideProps } from "next";
import { VideoDetails } from "../../typings";
import CustomVideoPlayer from "../../components/CustomVideoPlayer";
import packer from "../../utils/packer";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import Link from "next/link";


interface PostProps {
    videoDetails: VideoDetails;
    thumbnail_url: string;
    audio_list: {
        id: number;
        lang: string;
        url: any;
    }[];
    video_url: string;
}

const Post = ({ videoDetails, thumbnail_url, audio_list, video_url }: PostProps) => {

    const router: NextRouter = useRouter();
    const { id } = router.query;

    const db_data = db.db.find((video: any) => video.id === id) ?? { id: "", subtitleUrls: {}, audioUrls: {} };

    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <Head>
                <title>{videoDetails.title} - Genshin Web Player</title>
                <link rel="icon" href="/favicon.ico" />
                <script src="../subtitle-octopus/subtitles-octopus.js"></script>
            </Head>
            <main className="w-full max-w-screen-md relative grid justify-center overflow-hidden">
                <h1 className="text-2xl font-bold text-center">{videoDetails.title}</h1>
                <CustomVideoPlayer
                    videoSrc={video_url}
                    subtitleList={packer.packSubtitle({ subtitleUrls: db_data.subtitleUrls })}
                    audioList={audio_list}
                    thumbnail={thumbnail_url}
                />
                <Link href="/"><a className="text-center text-blue-400 underline">Back to Home</a></Link>
            </main>
        </div>
    )
}

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    const res = context.res;
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=60");

    const db_data = db.db.find((video: any) => video.id === id) ?? { id: "", subtitleUrls: {}, audioUrls: {} };

    const Youtube = require('youtube-stream-url')
    const video = await Youtube.getInfo({ url: `https://www.youtube.com/watch?v=${id}` })
    const videoDetails: VideoDetails = video.videoDetails;

    const thumbnail_url = videoDetails.thumbnail.thumbnails[videoDetails.thumbnail.thumbnails.length - 1].url;
    const video_url = await packer.extractVideoUrl(`https://www.youtube.com/watch?v=${db_data?.id}`);
    const audio_list = await packer.packAudios({ audioUrls: db_data.audioUrls });
    return {
        props: {
            videoDetails,
            thumbnail_url,
            audio_list,
            video_url,
        }
    }
}