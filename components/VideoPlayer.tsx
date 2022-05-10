import React from 'react';
import { useRef, useEffect } from 'react';
const SubtitlesOctopus = require('libass-wasm')

interface VideoPlayerProps {
    videoSrc: string;
    subtitleList: { lang: string, url: string | undefined }[];
    audioList: { lang: string, url: string | undefined }[];
    thumbnail: string;
}

const VideoPlayer = ({ videoSrc, subtitleList, audioList, thumbnail }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const audioRef = useRef<HTMLAudioElement>(null)
    const audioSourceRef = useRef<HTMLSourceElement>(null)
    useEffect(() => {
        const options = {
            video: videoRef.current,
            subUrl: subtitleList[6].url, // Thai
            fonts: ["https://modzabazer.github.io/multi-subtitle-and-audio-player/resources/fonts/browalia.ttc"],
            workerUrl: "../subtitle-octopus/subtitles-octopus-worker.js",
            legacyWorkerUrl: "../subtitle-octopus/subtitles-octopus-worker-legacy.js",
        };
        const instance = new SubtitlesOctopus(options);
        audioSourceRef.current!.src = audioList[1].url!; // Japanese
        audioRef.current!.load();

        videoRef.current!.onplay = () => {
            audioRef.current!.currentTime = videoRef.current!.currentTime;
            audioRef.current!.play();
        }
        videoRef.current!.onpause = () => {
            audioRef.current!.pause();
        }
        videoRef.current!.onseeked = () => {
            audioRef.current!.currentTime = videoRef.current!.currentTime;
        }
    }, []);

    return (
        <>
            <video src={videoSrc} className="w-full max-h-[80%]" controls ref={videoRef} poster={thumbnail} preload="auto"></video>
            <audio ref={audioRef} preload="auto">
                <source ref={audioSourceRef}></source>
            </audio>
        </>
    )
}

export default VideoPlayer