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