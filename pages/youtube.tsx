import ytdl from "ytdl-core";
import { GetServerSideProps } from "next";

interface pageProps {
    videoDetails: any;
    videoFormats: any;
    relatedVideos: any;
}

const YouTube = ({ videoDetails, videoFormats, relatedVideos }: pageProps) => {
    console.log(videoDetails);
    console.log(videoFormats);
    console.log(relatedVideos);
    return (
        <div>
            YouTube
        </div>
    )
}

export default YouTube;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const video = await ytdl.getInfo("TAlKhARUcoY");
    const videoFormats = video.formats;
    const relatedVideos = video.related_videos;
    const videoDetails = video.videoDetails;
    return {
        props: {
            videoDetails,
            videoFormats,
            relatedVideos,
        }
    }
}