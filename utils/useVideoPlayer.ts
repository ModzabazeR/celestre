import React, { useState, useEffect } from "react";

interface hookProps {
    videoRef: React.RefObject<HTMLVideoElement>,
    videoWrapperRef: React.RefObject<HTMLDivElement>,
}

const useVideoPlayer = ({ videoRef, videoWrapperRef }: hookProps) => {
    const [isPlaying, setisPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showFirstPlayButton, setShowFirstPlayButton] = useState(true);

    const togglePlay = () => {
        setisPlaying(!isPlaying);
    }

    useEffect(() => {
        isPlaying ? videoRef.current!.play() : videoRef.current!.pause();
    }, [isPlaying, videoRef]);

    const handleOnTimeUpdate = () => {
        const progress = (videoRef.current!.currentTime / videoRef.current!.duration) * 100;
        setProgress(progress);
    }

    const handleVideoProgress = (e: any) => {
        const manualChange = Number(e.target.value);
        videoRef.current!.currentTime = (videoRef.current!.duration / 100) * manualChange;
        setProgress(manualChange);
    }

    const toggleMute = () => {
        setIsMuted(!isMuted);
    }

    useEffect(() => {
        isMuted ? videoRef.current!.muted = true : videoRef.current!.muted = false;
    }, [isMuted, videoRef]);

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
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        toggleMute,
        toggleFullScreen,
        firstPlayClickHandler,
        setisPlaying,
    }
}

export default useVideoPlayer;