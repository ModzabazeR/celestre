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
    hasAudio: boolean;
    hasVideo: boolean;
    itag: number;
    container: "webm" | "mp4" | "flv" | "3gp" | "ts";
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
        kor?: string;
        ja?: string;
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
        zh?: {
            url: string;
            timeshift?: number;
        };
        en?: {
            url: string;
            timeshift?: number;
        };
        ja?: {
            url: string;
            timeshift?: number;
        };
        kor?: {
            url: string;
            timeshift?: number;
        };
        th?: {
            url: string;
            timeshift?: number;
        };
    },
    tags: string[];
}

export type dbData = dbItem[]

export type relatedVideo =  {
    id: string;
    length_seconds: number;
    title: string;
}

export type relatedVideos = relatedVideo[]