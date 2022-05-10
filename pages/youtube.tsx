import type { NextPage, GetServerSideProps } from 'next'
import { VideoDetails } from '../typings'

const YouTube: NextPage = ({thumbnail_url, audio_url, video_url}:any) => {
    // const Youtube = require('youtube-stream-url')
    // Youtube.getInfo({ url: 'https://www.youtube.com/watch?v=7-VnFQvCLDc' })
    //     .then((video: any) => {
    //         const videoDetails: VideoDetails = video.videoDetails;
    //         const formats = video.formats;
    //         console.log(videoDetails);
    //         console.log(formats);


    //         // console.log(videoDetails.thumbnail.thumbnails[videoDetails.thumbnail.thumbnails.length - 1].url);
    //         // for (const format of formats) {
    //         //     if (format.audioQuality === 'AUDIO_QUALITY_MEDIUM' && format.mimeType === 'audio/webm; codecs="opus"') {
    //         //         console.log(format.url);
    //         //     }
    //         //     if (format.quality === 'hd1080' && format.mimeType === 'video/webm; codecs="vp9"') {
    //         //         console.log(format.url);
    //         //     }
    //         // }
    //     })
    console.log(`Thumbnail: ${thumbnail_url}`);
    console.log(`Audio: ${audio_url}`);
    console.log(`Video: ${video_url}`);
    return (
        <div>
            <img src={thumbnail_url} className="w-[40%] h-auto" />
            <video src={video_url} controls className="w-[40%] h-auto" />
            <audio src={audio_url} controls />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const Youtube = require('youtube-stream-url')
    const video = await Youtube.getInfo({ url: 'https://www.youtube.com/watch?v=1_wHgvZyZdk' })
    const videoDetails: VideoDetails = video.videoDetails;
    const formats = video.formats;

    const thumbnail_url = videoDetails.thumbnail.thumbnails[videoDetails.thumbnail.thumbnails.length - 1].url;
    const audio_url = formats.find((format: any) => format.audioQuality === 'AUDIO_QUALITY_MEDIUM' && format.mimeType === 'audio/webm; codecs="opus"').url;
    const video_url = formats.find((format: any) => format.quality === 'hd1080' && format.mimeType === 'video/webm; codecs="vp9"').url;
    return {
        props: {
            thumbnail_url,
            audio_url,
            video_url,
        }
    }
}

export default YouTube;