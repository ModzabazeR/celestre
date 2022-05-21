export interface VideoDetails {
    videoId: string;
    title: string;
    lengthSeconds: string;
    keywords?: string[];
    channelId: string;
    isOwnerViewing: boolean;
    shortDescription?: string;
    isCrawlable: boolean;
    thumbnail: {
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    };
    averageRating: number;
    allowRatings: boolean;
    viewCount: string;
    author: string;
    isPrivate: boolean;
    isUnpluggedCorpus: boolean;
    isLiveContent: boolean;
}

export interface VideoFormat {
    url: string;
    mimeType: string;
    bitrate: number;
    quality: string;
    qualityLabel: string;
    averageBitrate: number;
    audioQuality?: string;
}

export type dbItem = {
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
    uploadDate: string | Date;
    subtitleUrls: {
        zhs?: string;
        zht?: string;
        en?: string;
        es?: string;
        fr?: string;
        ru?: string;
        th?: string;
        vi?: string;
        de?: string;
        ind?: string;
        pt?: string;
    }
    audioUrls: {
        zh?: string;
        en?: string;
        ja?: string;
        kor?: string;
        th?: string;
    },
    tags: string[];
}

export type dbData = dbItem[]