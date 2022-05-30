const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return {
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
    }
}

export default formatTime