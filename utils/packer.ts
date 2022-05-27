export interface packAudioProps {
    audioUrls: {
        zh?: {
            url: string;
            timeshift?: number;
        },
        en?: {
            url: string;
            timeshift?: number;
        }
        ja?: {
            url: string;
            timeshift?: number;
        }
        kor?: {
            url: string;
            timeshift?: number;
        }
        th?: {
            url: string;
            timeshift?: number;
        }
    }
}

export interface packSubtitleProps {
    subtitleUrls: {
        zhs?: string
        zht?: string
        en?: string
        kor?: string
        ja?: string
        es?: string
        fr?: string
        ru?: string
        th?: string
        vi?: string
        de?: string
        ind?: string
        pt?: string
    }
}

const packAudio = async (url: string | undefined) => {
    if (url) {
        const Youtube = require("youtube-stream-url");
        const info = await Youtube.getInfo({ url });
        const formats = info.formats;
        const real_audio_url = formats.find((format: any) => format.audioQuality === 'AUDIO_QUALITY_MEDIUM' && format.mimeType === 'audio/webm; codecs="opus"').url;
        return real_audio_url
    }
    else {
        return null
    }
}

const packAudios = async ({ audioUrls }: packAudioProps) => {

    const zh_real_url = audioUrls.zh ? await packAudio(audioUrls.zh.url) : null;
    const en_real_url = audioUrls.en ? await packAudio(audioUrls.en.url) : null;
    const ja_real_url = audioUrls.ja ? await packAudio(audioUrls.ja.url) : null;
    const kor_real_url = audioUrls.kor ? await packAudio(audioUrls.kor.url) : null;
    const th_real_url = audioUrls.th ? await packAudio(audioUrls.th.url) : null;

    const audioList =  [
        {
            id: 0,
            lang: 'Chinese',
            url: zh_real_url,
            timeshift: audioUrls.zh?.timeshift ? audioUrls.zh.timeshift : 0
        },
        {
            id: 1,
            lang: 'English',
            url: en_real_url,
            timeshift: audioUrls.en?.timeshift ? audioUrls.en.timeshift : 0
        },
        {
            id: 2,
            lang: 'Japanese',
            url: ja_real_url,
            timeshift: audioUrls.ja?.timeshift ? audioUrls.ja.timeshift : 0
        },
        {
            id: 3,
            lang: 'Korean',
            url: kor_real_url,
            timeshift: audioUrls.kor?.timeshift ? audioUrls.kor.timeshift : 0
        },
        {
            id: 4,
            lang: 'Thai (Tanudan)',
            url: th_real_url,
            timeshift: audioUrls.th?.timeshift ? audioUrls.th.timeshift : 0
        }
    ]

    return audioList

}

const packSubtitle = ({ subtitleUrls }: packSubtitleProps) => {
    return [
        {
            id: 0,
            lang: 'Chinese (Simplified)',
            url: subtitleUrls.zhs ? subtitleUrls.zhs : null
        },
        {
            id: 1,
            lang: 'Chinese (Traditional)',
            url: subtitleUrls.zht ? subtitleUrls.zht : null
        },
        {
            id: 2,
            lang: 'English',
            url: subtitleUrls.en ? subtitleUrls.en : null
        },
        {
            id: 3,
            lang: 'Korean',
            url: subtitleUrls.kor ? subtitleUrls.kor : null
        },
        {
            id: 4,
            lang: 'Japanese',
            url: subtitleUrls.ja ? subtitleUrls.ja : null
        },
        {
            id: 5,
            lang: 'Spanish',
            url: subtitleUrls.es ? subtitleUrls.es : null
        },
        {
            id: 6,
            lang: 'French',
            url: subtitleUrls.fr ? subtitleUrls.fr : null
        },
        {
            id: 7,
            lang: 'Russian',
            url: subtitleUrls.ru ? subtitleUrls.ru : null
        },
        {
            id: 8,
            lang: 'Thai',
            url: subtitleUrls.th ? subtitleUrls.th : null
        },
        {
            id: 9,
            lang: 'Vietnamese',
            url: subtitleUrls.vi ? subtitleUrls.vi : null
        },
        {
            id: 10,
            lang: 'German',
            url: subtitleUrls.de ? subtitleUrls.de : null
        },
        {
            id: 11,
            lang: 'Indonesian',
            url: subtitleUrls.ind ? subtitleUrls.ind : null
        },
        {
            id: 12,
            lang: 'Portuguese',
            url: subtitleUrls.pt ? subtitleUrls.pt : null
        }
    ]
}

const extractVideoUrl = async (videoUrl: string) => {
    const Youtube = require("youtube-stream-url");
    const info = await Youtube.getInfo({ url: videoUrl });
    const formats = info.formats;
    const real_video_url = formats.find((format: any) => format.quality === 'hd1080' && format.mimeType === 'video/webm; codecs="vp9"').url;
    return real_video_url
}

export default {
    packAudios,
    packSubtitle,
    extractVideoUrl,
}
