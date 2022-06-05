import React, { useState, useEffect } from "react";
import { formatTime } from "./globalUtils";

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
    const [isLoading, setIsLoading] = useState(true)

    const togglePlay = () => {
        if (!isLoading) {
            setisPlaying(!isPlaying);
        }
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

    let fullScreenDocument: any
    if (typeof window !== "undefined"){
    fullScreenDocument = document as Document & {
        webkitFullscreenElement: any;
        webkitExitFullscreen(): Promise<void>;
    }}

    const fullScreenDiv = videoWrapperRef.current! as HTMLDivElement & {
        webkitRequestFullscreen(): Promise<void>;
        mozRequestFullScreen(): Promise<void>;
    }

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
        if (document.fullscreenElement) {
            document.exitFullscreen();
          } else if (fullScreenDocument.webkitFullscreenElement) {
            fullScreenDocument.webkitExitFullscreen();
          } else if (fullScreenDiv.webkitRequestFullscreen) {
            fullScreenDiv.webkitRequestFullscreen();
          } else {
            videoWrapperRef.current!.requestFullscreen();
          }
    }
    
    const firstPlayClickHandler = () => {
        setShowFirstPlayButton(false);
        togglePlay();
    }

    return {
        isPlaying,
        progress,
        isMuted,
        isFullScreen,
        isLoading,
        showFirstPlayButton,
        showCursor,
        progressString,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        toggleMute,
        toggleFullScreen,
        setIsLoading,
        firstPlayClickHandler,
        setisPlaying,
        setShowCursor,
        setIsFullScreen,
    }
}

export default useVideoPlayer;