const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return {
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
    }
}

const langIdentifier = {
    en: 'English',
    zh: 'Chinese',
    th: 'Thai',
    kor: 'Korean',
    ja: 'Japanese',
}

export {
    formatTime,
    langIdentifier,
}