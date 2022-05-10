import db from "../../db";
import { GetServerSideProps, GetStaticPaths } from "next";
import { VideoDetails } from "../../typings";
import VideoPlayer from "../../components/VideoPlayer";
import packer from "../../utils/packer";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";

const Post = ({ videoDetails, thumbnail_url, audio_list, video_url }: any) => {

    const router: NextRouter = useRouter();
    const { id } = router.query;
    const db_data = db.find((video: any) => video.id === id) ?? { id: "", subtitleUrls: {}, audioUrls: {} };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>Genshin Web Player - {videoDetails.title}</title>
                <link rel="icon" href="/favicon.ico" />
                <script src="../subtitle-octopus/subtitles-octopus.js"></script>
            </Head>
            <main className="grid items-center justify-center">
                <h1 className="text-2xl font-bold text-center">{videoDetails.title}</h1>
                <VideoPlayer
                    videoSrc={video_url}
                    subtitleList={packer.packSubtitle({ subtitleUrls: db_data.subtitleUrls })}
                    audioList={audio_list}
                    thumbnail={thumbnail_url}
                />
            </main>
        </div>
    )
}

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    const db_data = db.find((video: any) => video.id === id) ?? { id: "", subtitleUrls: {}, audioUrls: {} };

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
