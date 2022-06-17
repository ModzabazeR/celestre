import db from "../../db";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { VideoDetails, VideoFormat, relatedVideos, IIndexable } from "../../typings";
import packer from "../../utils/packer";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import Link from "next/link";
import { FiRefreshCw } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import ytdl from "ytdl-core";
import Tag from "../../components/Tag";
import { langIdentifier } from "../../utils/globalUtils";
import { isSafari, isMobileSafari } from "react-device-detect";
import { useEffect } from "react";
import loc from "../../locales/locales";
const CustomVideoPlayer = dynamic(() => import("../../components/CustomVideoPlayer"), {
    ssr: false,
    loading: () => <div>Loading...</div>
})

interface PostProps {
    videoDetails: VideoDetails;
    videoFormats: VideoFormat[];
    relatedVideos: relatedVideos;
    audio_list: {
        id: number;
        lang: string;
        url: any;
        timeshift: number;
    }[];
}

const ytPrefix = "https://www.youtube.com/watch?v=";

const Post = ({ videoDetails, videoFormats, relatedVideos, audio_list }: PostProps) => {
    const router: NextRouter = useRouter();
    const { id } = router.query;
    const { locale } = router;
    const t = locale === "th" ? loc.th : loc.en;

    const db_data = db.find((video: any) => video.id === id) ?? { id: "", title: "", duration: "", thumbnail: "", subtitleUrls: {}, audioUrls: {}, tags: [] };
    const webm = videoFormats.filter(format => format.mimeType.includes("webm"));
    const webmVideo = webm.filter(format => format.mimeType.includes("video"));
    console.log(webmVideo[0].url);

    useEffect(() => {
        if (isSafari || isMobileSafari) {
            alert("Celestre work best on Chrome.")
        }
    }, [])

    return (
        <div className={"flex flex-col items-center justify-center " + t.code}>
            <Head>
                <title>{db_data.title} - Celestre</title>
                <meta name="description" content={videoDetails.description} />
                <meta property="og:title" content={`[All languages] ${db_data.title}`} />
                <meta property="og:description" content={videoDetails.description} />
                <meta property="og:image" content={db_data.thumbnail} />
                <meta property="og:url" content={`https://celestre.vercel.app/${id}`} />
                <meta property="og:type" content="video" />
                <meta property="og:site_name" content="Celestre" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image:alt" content={`[All languages] ${db_data.title}`} />
            </Head>
            <main className="w-full max-w-screen-md relative grid justify-centers p-8">
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-center mb-8">{db_data.title}</h1>
                <p className="text-center game-font text-xs md:text-sm mb-4">{t.subtitleInfo}</p>
                <CustomVideoPlayer
                    videoSrc={webmVideo}
                    subtitleList={packer.packSubtitle({ subtitleUrls: db_data.subtitleUrls })}
                    audioList={audio_list}
                    thumbnail={db_data.thumbnail}
                    videoDetails={videoDetails}
                />
                <div className="divide-x-2 divide-[#343746] my-8">
                    <button className="bg-[#1b1d2a] p-2 rounded-l-md hover:bg-[#343746] transition-all w-1/2 text-sm lg:text-base" onClick={router.reload}>
                        <FiRefreshCw className="inline mr-2" />
                        <span>{t.reload}</span>
                    </button>
                    <Link href="/">
                        <button className="bg-[#1b1d2a] p-2 rounded-r-md hover:bg-[#343746] transition-all w-1/2 text-sm lg:text-base">
                            <FaHome className="inline mr-2" />
                            {t.backToHome}
                        </button>
                    </Link>
                </div>
                
                <div className="bg-[#1b1d2a] rounded-md p-4 divide-y divide-[#343746]">
                    <div className="pb-2">
                        <h1 className="text-xl font-bold pb-2">{t.videoDetails}</h1>
                        <div className="inline-flex flex-wrap">
                            {
                                db_data.tags.map((tag: string, index: number) => (
                                    <Tag tag={tag} key={index} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="pt-4">
                        {
                            Object.entries(db_data.audioUrls).map(([lang, obj]) => {
                                return (
                                    <p className="text-sm lg:text-base" key={obj.url}>
                                        <span className="font-medium">{(langIdentifier as IIndexable)[lang]} Video URL: </span>
                                        <Link href={`${ytPrefix}${obj.url}`}><a className="link" target="_blank">{`${ytPrefix}${obj.url}`}</a></Link>
                                    </p>
                                )
                            }
                            )
                        }
                        <p className="text-sm lg:text-base whitespace-pre-wrap">
                            <span className="font-medium">Description: </span>
                            {"\n" + videoDetails.description?.split("\n\n")[0]}
                        </p>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    const res = context.res;
    res.setHeader("Cache-Control", "private, s-maxage=3600, stale-while-revalidate=60");

    const db_data = db.find((video: any) => video.id === id) ?? { id: "", subtitleUrls: {}, audioUrls: {} };

    const video = await ytdl.getInfo(db_data.id);
    const videoFormats = video.formats;
    const relatedVideos = video.related_videos;
    const videoDetails = video.videoDetails;

    const audio_list = await packer.packAudios({ audioUrls: db_data.audioUrls });
    return {
        props: {
            videoDetails,
            videoFormats,
            relatedVideos,
            audio_list,
        }
    }
}