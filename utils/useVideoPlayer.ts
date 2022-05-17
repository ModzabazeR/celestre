import React, { useState, useEffect } from "react";

const useVideoPlayer = (videoElement: React.RefObject<HTMLVideoElement>, videoWrapperRef: React.RefObject<HTMLDivElement>) => {
    const [isPlaying, setisPlaying] = useState(false);
    const [progress , setProgress] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const togglePlay = () => {
        setisPlaying(!isPlaying);
    }

    useEffect(() => {
        isPlaying ? videoElement.current!.play() : videoElement.current!.pause();
    }, [isPlaying, videoElement]);

    const handleOnTimeUpdate = () => {
        const progress = (videoElement.current!.currentTime / videoElement.current!.duration) * 100;
        setProgress(progress);
    }

    const handleVideoProgress = (e: any) => {
        const manualChange = Number(e.target.value);
        videoElement.current!.currentTime = (videoElement.current!.duration / 100) * manualChange;
        setProgress(manualChange);
    }

    const handleVideoSpeed = (e: any) => {
        const speed = Number(e.target.value);
        videoElement.current!.playbackRate = speed;
        setSpeed(speed);
    }

    const toggleMute = () => {
        setIsMuted(!isMuted);
    }

    useEffect(() => {
        isMuted ? videoElement.current!.muted = true : videoElement.current!.muted = false;
    }, [isMuted, videoElement]);

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
        // isFullScreen ? videoWrapperRef.current!.requestFullscreen() : document.exitFullscreen();
    }, [isFullScreen, videoWrapperRef]);

    return {
        isPlaying,
        progress,
        speed,
        isMuted,
        isFullScreen,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute,
        toggleFullScreen
    }
}

export default useVideoPlayer;