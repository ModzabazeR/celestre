import type { NextPage } from 'next'
import { useEffect, useRef } from 'react'
import useVideoPlayer from '../utils/useVideoPlayer'
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi'
const SubtitlesOctopus = require('libass-wasm')
// import dynamic from 'next/dynamic'
// const ReactNetflixPlayer = dynamic(() => import('react-netflix-player'), {
//     ssr: false,
// })

const YouTube: NextPage = () => {
    const videoElement = useRef<HTMLVideoElement>(null)
    const videoWrapperRef = useRef<HTMLDivElement>(null)
    const {
        isPlaying,
        progress,
        speed,
        isMuted,
        isFullScreen,
        showFirstPlayButton,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute,
        toggleFullScreen,
        firstPlayClickHandler,
    } = useVideoPlayer(videoElement, videoWrapperRef)
    useEffect(() => {
        const options = {
            video: videoElement.current,
            subUrl: "https://modzabazer.github.io/multi-subtitle-and-audio-player/resources/subtitle/travail_trailer.th.ass", // Thai
            fonts: ["https://modzabazer.github.io/multi-subtitle-and-audio-player/resources/fonts/browalia.ttc"],
            workerUrl: "../subtitle-octopus/subtitles-octopus-worker.js",
            legacyWorkerUrl: "../subtitle-octopus/subtitles-octopus-worker-legacy.js",
        };
        const instance = new SubtitlesOctopus(options);
    }, [])
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                {
                    showFirstPlayButton && (
                        <FaPlay className='text-4xl md:text-5xl lg:text-6xl cursor-pointer absolute block' onClick={firstPlayClickHandler}/>
                    )
                }
                <div className={"video-wrapper w-full max-w-screen-md relative flex justify-center overflow-hidden rounded-lg" + (showFirstPlayButton ? " -z-10" : "")} ref={videoWrapperRef}>
                    <video
                        className="w-full"
                        src="assets/video.mp4"
                        preload='auto'
                        poster='https://wallpaperaccess.com/full/3458146.jpg'
                        ref={videoElement}
                        onTimeUpdate={handleOnTimeUpdate}
                    />
                    <div className="controls z-50">
                        <div>
                            <button className="bg-none border-none outline-none cursor-pointer" onClick={togglePlay}>
                                {
                                    isPlaying ? (
                                        <FaPause />
                                    ) : (
                                        <FaPlay />
                                    )
                                }
                            </button>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={(e) => handleVideoProgress(e)}
                            className="bg-white/20 rounded-3xl h-1 w-80"
                        />
                        <select
                            className="velocity"
                            value={speed}
                            onChange={(e) => handleVideoSpeed(e)}
                        >
                            <option value="0.50">0.50x</option>
                            <option value="1">1x</option>
                            <option value="1.25">1.25x</option>
                            <option value="2">2x</option>
                        </select>
                        <button className="bg-none border-none outline-none cursor-pointer" onClick={toggleMute}>
                            {
                                isMuted ? (
                                    <FaVolumeMute />
                                ) : (
                                    <FaVolumeUp />
                                )
                            }
                        </button>
                        <button onClick={toggleFullScreen}>
                            {
                                isFullScreen ? (
                                    <BiExitFullscreen />
                                ) : (
                                    <BiFullscreen />
                                )
                            }
                        </button>
                    </div>
                </div>

            </div>
            <div>HIII</div>
        </>
    )
}

export default YouTube;