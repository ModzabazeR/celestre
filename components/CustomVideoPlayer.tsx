import { useEffect, useRef, useState } from 'react'
import useVideoPlayer from '../utils/useVideoPlayer'
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi'
import { MdSubtitles, MdHeadphones, MdCheck } from 'react-icons/md'
import { isMobile } from 'react-device-detect'
import Router from 'next/router'
const SubtitlesOctopus = require('libass-wasm')

interface VideoPlayerProps {
    videoSrc: string;
    subtitleList: { id: number, lang: string, url: string | null }[];
    audioList: { id: number, lang: string, url: string | null }[];
    thumbnail: string;
}

const CustomVideoPlayer = ({ videoSrc, subtitleList, audioList, thumbnail }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const videoWrapperRef = useRef<HTMLDivElement>(null)
    const audioRef = useRef<HTMLAudioElement>(null)
    const audioSourceRef = useRef<HTMLSourceElement>(null)
    const controlsRef = useRef<HTMLDivElement>(null)
    const [instance, setInstance] = useState<any>()
    const [controlsOnHover, setControlsOnHover] = useState(false)
    const {
        isPlaying,
        progress,
        isMuted,
        isFullScreen,
        showFirstPlayButton,
        showCursor,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        toggleMute,
        toggleFullScreen,
        firstPlayClickHandler,
        setisPlaying,
        setShowCursor,
        setIsFullScreen,
    } = useVideoPlayer({ videoRef, videoWrapperRef, audioRef })

    const audioHandler = (langId: number) => {
        videoRef.current!.pause()
        audioSourceRef.current!.src = audioList[langId].url!;
        audioRef.current!.load();
        audioRef.current!.onloadeddata = () => {
            videoRef.current!.play();
            audioRef.current!.currentTime = videoRef.current!.currentTime;
        }
    }

    let timer: any
    const controlsShowHandler = () => {
        clearTimeout(timer)
        controlsRef.current!.className = "controls z-50 translate-y-0 opacity-100"
        setShowCursor(true)
        try {
            timer = setTimeout(() => {
                controlsRef.current!.className = "controls z-50 translate-y-[150%] opacity-0"
                setShowCursor(false)
            }, 8000)
        } catch (error) {
            console.log(error)
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

        audioSourceRef.current!.src = audioList[2].url!; // Japanese
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
            audioRef.current!.pause();
        }
        videoRef.current!.onplaying = () => {
            audioRef.current!.play();
        }

    }, [])

    const subtitleHandler = (langId: number) => {
        const url = subtitleList[langId].url!;
        instance.setTrackByUrl(url);
    }

    const availableSubtitles = subtitleList.filter(sub => sub.url !== null)
    const availableAudios = audioList.filter(audio => audio.url !== null)

    const [activeSubtitle, setActiveSubtitle] = useState({
        activeSub: subtitleList[6],
        objects: availableSubtitles
    })

    const toggleSubtitle = (index: number) => {
        setActiveSubtitle({ ...activeSubtitle, activeSub: availableSubtitles[index] })
    }

    const checkIfSubtitleActive = (index: number) => {
        return activeSubtitle.objects[index] === activeSubtitle.activeSub
    }

    const [activeAudio, setActiveAudio] = useState({
        activeAudio: audioList[2],
        objects: availableAudios
    })

    const toggleAudio = (index: number) => {
        setActiveAudio({ ...activeAudio, activeAudio: availableAudios[index] })
    }

    const checkIfAudioActive = (index: number) => {
        return activeAudio.objects[index] === activeAudio.activeAudio
    }

    return (
        <>
            <div className={showFirstPlayButton ? "bg-black/30 my-8 cursor-pointer flex justify-center items-center" : "py-8"} onClick={showFirstPlayButton ? firstPlayClickHandler : () => { }}>
                {
                    showFirstPlayButton && (
                        <FaPlay className='text-4xl md:text-5xl lg:text-6xl absolute' />
                    )
                }
                <div className={"video-wrapper w-full max-w-screen-md relative flex justify-center overflow-hidden" + (showFirstPlayButton ? " -z-10" : "") + (showCursor ? " cursor-auto" : " cursor-none")} ref={videoWrapperRef} onMouseMove={controlsShowHandler}>
                    <video
                        className="w-full object-cover"
                        src={videoSrc}
                        preload='auto'
                        poster={thumbnail}
                        ref={videoRef}
                        onTimeUpdate={handleOnTimeUpdate}
                        onClick={isMobile ? controlsShowHandler : togglePlay}
                        crossOrigin="anonymous"
                    />
                    <audio ref={audioRef} preload="auto" crossOrigin="anonymous">
                        <source ref={audioSourceRef} />
                    </audio>
                    <div className="controls z-50 translate-y-[150%] opacity-0" ref={controlsRef} onMouseOver={() => { setControlsOnHover(true) }} onMouseLeave={() => { setControlsOnHover(false) }}>
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
                            <ul className={"absolute hidden text-white pt-1 group-hover:block bottom-0 my-4 text-sm w-max rounded-lg" + (availableSubtitles.length <= 3 ? "" : " overflow-hidden overflow-y-scroll h-24 md:h-32 lg:h-48")}>
                                {
                                    availableSubtitles.map((sub, index) => {
                                        return (<li key={index} className={(index === 0 ? "option-top" : index === availableSubtitles.length - 1 ? "option-bottom" : "option-middle") + (checkIfSubtitleActive(index) ? " bg-black/70" : "")} onClick={() => {
                                            subtitleHandler(sub.id)
                                            toggleSubtitle(index)
                                        }}>{checkIfSubtitleActive(index) && <MdCheck className="inline mr-2" />}{sub.lang}</li>)

                                    })
                                }
                            </ul>
                        </div>

                        <div className="cursor-pointer group inline-block relative">
                            <MdHeadphones />
                            <ul className={"absolute hidden text-white pt-1 group-hover:block bottom-0 my-4 text-sm w-max rounded-lg" + (availableAudios.length <= 3 ? "" : " overflow-hidden overflow-y-scroll h-24 md:h-32 lg:h-48")}>
                                {
                                    availableAudios.map((audio, index) => {
                                        return (<li key={index} className={(index === 0 ? "option-top" : index === availableAudios.length - 1 ? "option-bottom" : "option-middle")} onClick={() => {
                                            audioHandler(audio.id)
                                            toggleAudio(index)
                                        }}>{checkIfAudioActive(index) && <MdCheck className="inline mr-2" />}{audio.lang}</li>)
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