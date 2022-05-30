import React, { useState, useEffect } from "react";

interface hookProps {
    videoRef: React.RefObject<HTMLVideoElement>,
    videoWrapperRef: React.RefObject<HTMLDivElement>,
    audioRef: React.RefObject<HTMLAudioElement>,
}

const useVideoPlayer = ({ videoRef, videoWrapperRef, audioRef }: hookProps) => {
    const [isPlaying, setisPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [progressString, setProgressString] = useState({
        minutes: "00",
        seconds: "00",
    });
    const [isMuted, setIsMuted] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showFirstPlayButton, setShowFirstPlayButton] = useState(true);
    const [showCursor, setShowCursor] = useState(true);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return {
            minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
            seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
        }
    }

    const togglePlay = () => {
        setisPlaying(!isPlaying);
    }

    useEffect(() => {
        isPlaying ? videoRef.current!.play() : videoRef.current!.pause();
    }, [isPlaying, videoRef]);

    const handleOnTimeUpdate = () => {
        const progress = videoRef.current!.currentTime;
        setProgress(progress);

        setProgressString(formatTime(progress))
    }

    const handleVideoProgress = (e: any) => {
        const manualChange = Number(e.target.value);
        videoRef.current!.currentTime = manualChange;
        setProgress(manualChange);
    }

    const toggleMute = () => {
        setIsMuted(!isMuted);
    }

    useEffect(() => {
        isMuted ? audioRef.current!.muted = true : audioRef.current!.muted = false;
    }, [isMuted, audioRef]);

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    }

    useEffect(() => {
        if (isFullScreen) {
            videoWrapperRef.current!.requestFullscreen()
        } else {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        }
    }, [isFullScreen, videoWrapperRef]);

    const firstPlayClickHandler = () => {
        setShowFirstPlayButton(false);
        togglePlay();
    }

    return {
        isPlaying,
        progress,
        isMuted,
        isFullScreen,
        showFirstPlayButton,
        showCursor,
        progressString,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        toggleMute,
        toggleFullScreen,
        firstPlayClickHandler,
        setisPlaying,
        setShowCursor,
        setIsFullScreen,
    }
}

export default useVideoPlayer;