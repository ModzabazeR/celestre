import { useEffect, useRef, useState } from 'react'
import useVideoPlayer from '../utils/useVideoPlayer'
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi'
import { MdSubtitles, MdHeadphones, MdCheck } from 'react-icons/md'
import db from '../db'
const SubtitlesOctopus = require('libass-wasm')

interface VideoPlayerProps {
    videoSrc: string;
    subtitleList: { id: number, lang: string, url: string | undefined }[];
    audioList: { id: number, lang: string, url: string | undefined }[];
    thumbnail: string;
}

const CustomVideoPlayer = ({ videoSrc, subtitleList, audioList, thumbnail }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const videoWrapperRef = useRef<HTMLDivElement>(null)
    const audioRef = useRef<HTMLAudioElement>(null)
    const audioSourceRef = useRef<HTMLSourceElement>(null)
    const [instance, setInstance] = useState<any>()
    const {
        isPlaying,
        progress,
        isMuted,
        isFullScreen,
        showFirstPlayButton,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        toggleMute,
        toggleFullScreen,
        firstPlayClickHandler,
        setisPlaying,
    } = useVideoPlayer({ videoRef, videoWrapperRef })

    const audioHandler = (langId: number) => {
        videoRef.current!.pause()
        audioSourceRef.current!.src = audioList[langId].url!;
        audioRef.current!.load();
        audioRef.current!.onloadeddata = () => {
            videoRef.current!.play();
            audioRef.current!.currentTime = videoRef.current!.currentTime;
        }
    }

    useEffect(() => {
        const options = {
            video: videoRef.current,
            subUrl: subtitleList[6].url, // Thai
            fonts: ["https://modzabazer.github.io/multi-subtitle-and-audio-player/resources/fonts/browalia.ttc", "https://modzabazer.github.io/multi-subtitle-and-audio-player/resources/fonts/zh-cn.ttf"],
            workerUrl: "../subtitle-octopus/subtitles-octopus-worker.js",
            legacyWorkerUrl: "../subtitle-octopus/subtitles-octopus-worker-legacy.js",
        };
        setInstance(new SubtitlesOctopus(options));

        audioSourceRef.current!.src = audioList[1].url!; // Japanese
        audioRef.current!.load();

        videoRef.current!.onplay = () => {
            audioRef.current!.currentTime = videoRef.current!.currentTime;
            setisPlaying(true)
            audioRef.current!.play();
        }
        videoRef.current!.onpause = () => {
            setisPlaying(false)
            audioRef.current!.pause();
        }
        videoRef.current!.onseeked = () => {
            audioRef.current!.currentTime = videoRef.current!.currentTime;
        }
        videoRef.current!.onwaiting = () => {
            setisPlaying(false)
            videoRef.current!.pause();
        }
    }, [])

    const subtitleHandler = (langId: number) => {
        const url = subtitleList[langId].url!;
        instance.setTrackByUrl(url);
    }

    const availableSubtitles = subtitleList.filter(sub => sub.url !== undefined && sub.url !== null)
    const availableAudios = audioList.filter(audio => audio.url !== undefined && audio.url !== null)

    return (
        <>
            <div className={showFirstPlayButton ? "bg-black/30 my-8 cursor-pointer" : "py-8"} onClick={showFirstPlayButton ? firstPlayClickHandler : () => { }}>
                {
                    showFirstPlayButton && (
                        <FaPlay className='text-4xl md:text-5xl lg:text-6xl absolute w-full top-1/2' />
                    )
                }
                <div className={"video-wrapper w-full max-w-screen-md relative flex justify-center overflow-hidden" + (showFirstPlayButton ? " -z-10" : "")} ref={videoWrapperRef}>
                    <video
                        className="w-full object-cover"
                        src={videoSrc}
                        preload='auto'
                        poster={thumbnail}
                        ref={videoRef}
                        onTimeUpdate={handleOnTimeUpdate}
                    />
                    <audio ref={audioRef} preload="auto">
                        <source ref={audioSourceRef} />
                    </audio>
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


                        <div className="cursor-pointer group inline-block relative">
                            <MdSubtitles />
                            <ul className={"absolute hidden text-white pt-1 group-hover:block bottom-0 my-4 text-sm overflow-hidden overflow-y-scroll" + (availableSubtitles.length <= 2 ? " h-20" : " h-32 lg:h-48")}>
                                {
                                    availableSubtitles.map((sub, index) => {
                                        if (index === 0) { return (<li key={index} className="option-top" onClick={() => subtitleHandler(sub.id)}>{sub.lang}</li>) }
                                        else if (index === availableSubtitles.length - 1) { return (<li key={index} className="option-bottom" onClick={() => subtitleHandler(sub.id)}>{sub.lang}</li>) }
                                        else { return (<li key={index} className="option-middle" onClick={() => subtitleHandler(sub.id)}>{sub.lang}</li>) }
                                    })
                                }
                                {/* {subtitleList[0].url && (<li className="option-top">{db.subtitleLangIds[0]["name"]}</li>)}
                                {subtitleList[1].url && (<li className="option-middle">{db.subtitleLangIds[1]["name"]}</li>)}
                                {subtitleList[2].url && (<li className="option-middle">{db.subtitleLangIds[2]["name"]}</li>)}
                                {subtitleList[3].url && (<li className="option-middle">{db.subtitleLangIds[3]["name"]}</li>)}
                                {subtitleList[4].url && (<li className="option-middle">{db.subtitleLangIds[4]["name"]}</li>)}
                                {subtitleList[5].url && (<li className="option-middle">{db.subtitleLangIds[5]["name"]}</li>)}
                                {subtitleList[6].url && (<li className="option-middle">{db.subtitleLangIds[6]["name"]}</li>)}
                                {subtitleList[7].url && (<li className="option-middle">{db.subtitleLangIds[7]["name"]}</li>)}
                                {subtitleList[8].url && (<li className="option-middle">{db.subtitleLangIds[8]["name"]}</li>)}
                                {subtitleList[9].url && (<li className="option-middle">{db.subtitleLangIds[9]["name"]}</li>)}
                                {subtitleList[10].url && (<li className="option-bottom">{db.subtitleLangIds[10]["name"]}</li>)} */}
                            </ul>
                        </div>

                        <div className="cursor-pointer group inline-block relative">
                            <MdHeadphones />
                            <ul className="absolute hidden text-white pt-1 group-hover:flex flex-col bottom-0 my-4 text-sm">
                                {
                                    availableAudios.map((audio, index) => {
                                        if (index === 0) return (<li key={index} className="option-top" onClick={() => audioHandler(audio.id)}>{audio.lang}</li>)
                                        else if (index === availableAudios.length - 1) return (<li key={index} className="option-bottom" onClick={() => audioHandler(audio.id)}>{audio.lang}</li>)
                                        else return (<li key={index} className="option-middle" onClick={() => audioHandler(audio.id)}>{audio.lang}</li>)
                                    })
                                }
                            </ul>
                        </div>

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
        </>
    )
}

export default CustomVideoPlayer