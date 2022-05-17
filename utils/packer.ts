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
            id: 0,
            lang: 'English',
            url: en_real_url
        },
        {
            id: 1,
            lang: 'Japanese',
            url: ja_real_url
        },
        {
            id: 2,
            lang: 'Korean',
            url: kor_real_url
        },
        {
            id: 3,
            lang: 'Thai (Tanudan)',
            url: th_real_url
        }
    ]

    return audioList

}

const packSubtitle = ({ subtitleUrls }: packSubtitleProps) => {
    return [
        {
            id: 0,
            lang: 'Chinese (Simplified)',
            url: subtitleUrls?.zhs
        },
        {
            id: 1,
            lang: 'Chinese (Traditional)',
            url: subtitleUrls?.zht
        },
        {
            id: 2,
            lang: 'English',
            url: subtitleUrls?.en
        },
        {
            id: 3,
            lang: 'Spanish',
            url: subtitleUrls?.es
        },
        {
            id: 4,
            lang: 'French',
            url: subtitleUrls?.fr
        },
        {
            id: 5,
            lang: 'Russian',
            url: subtitleUrls?.ru
        },
        {
            id: 6,
            lang: 'Thai',
            url: subtitleUrls?.th
        },
        {
            id: 7,
            lang: 'Vietnamese',
            url: subtitleUrls?.vi
        },
        {
            id: 8,
            lang: 'German',
            url: subtitleUrls?.de
        },
        {
            id: 9,
            lang: 'Indonesian',
            url: subtitleUrls?.ind
        },
        {
            id: 10,
            lang: 'Portuguese',
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
