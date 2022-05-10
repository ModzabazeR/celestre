export interface packAudioProps {
    audioUrls: {
        en?: string
        ja?: string
        kor?: string
        th?: string
    }
}

export interface packSubtitleProps {
    subtitleUrls: {
        zhs?: string
        zht?: string
        en?: string
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

    const en_real_url = await packAudio(audioUrls.en);
    const ja_real_url = await packAudio(audioUrls.ja);
    const kor_real_url = await packAudio(audioUrls.kor);
    const th_real_url = await packAudio(audioUrls.th);

    const audioList =  [
        {
            lang: 'en',
            url: en_real_url
        },
        {
            lang: 'ja',
            url: ja_real_url
        },
        {
            lang: 'kor',
            url: kor_real_url
        },
        {
            lang: 'th',
            url: th_real_url
        }
    ]

    return audioList

}

const packSubtitle = ({ subtitleUrls }: packSubtitleProps) => {
    return [
        {
            lang: 'zhs',
            url: subtitleUrls?.zhs
        },
        {
            lang: 'zht',
            url: subtitleUrls?.zht
        },
        {
            lang: 'en',
            url: subtitleUrls?.en
        },
        {
            lang: 'es',
            url: subtitleUrls?.es
        },
        {
            lang: 'fr',
            url: subtitleUrls?.fr
        },
        {
            lang: 'ru',
            url: subtitleUrls?.ru
        },
        {
            lang: 'th',
            url: subtitleUrls?.th
        },
        {
            lang: 'vi',
            url: subtitleUrls?.vi
        },
        {
            lang: 'de',
            url: subtitleUrls?.de
        },
        {
            lang: 'ind',
            url: subtitleUrls?.ind
        },
        {
            lang: 'pt',
            url: subtitleUrls?.pt
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
