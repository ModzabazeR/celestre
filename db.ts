type dbData = {
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
}[]

const db: dbData = [
    {
        id: "TAlKhARUcoY",
        title: "Teyvat Chapter Storyline Preview: Travail｜Genshin Impact (Contains spoilers)",
        duration: "04:18",
        thumbnail: "https://i.ytimg.com/vi/TAlKhARUcoY/maxresdefault.jpg",
        uploadDate: "2020-09-28",
        subtitleUrls: {
            zhs: "/assets/subtitles/travail_trailer.zhs.ass",
            zht: "/assets/subtitles/travail_trailer.zht.ass",
            en: "/assets/subtitles/travail_trailer.en.ass",
            es: "/assets/subtitles/travail_trailer.es.ass",
            fr: "/assets/subtitles/travail_trailer.fr.ass",
            ru: "/assets/subtitles/travail_trailer.ru.ass",
            th: "/assets/subtitles/travail_trailer.th.ass",
            vi: "/assets/subtitles/travail_trailer.vi.ass",
            de: "/assets/subtitles/travail_trailer.de.ass",
            ind: "/assets/subtitles/travail_trailer.ind.ass",
            pt: "/assets/subtitles/travail_trailer.pt.ass"
        },
        audioUrls: {
            en: "https://www.youtube.com/watch?v=TAlKhARUcoY",
            ja: "https://www.youtube.com/watch?v=jtpX8a8G3q0",
            kor: "https://www.youtube.com/watch?v=aCNNqHEMA9A",
        },
        tags: ["story teaser", "dainsleif"]
    },
    {
        id: "qrH9vMZBwAk",
        title: "Character Demo - \"Hu Tao: Let the Living Beware\" | Genshin Impact",
        duration: "01:40",
        thumbnail: "https://i.ytimg.com/vi/qrH9vMZBwAk/maxresdefault.jpg",
        uploadDate: "2021-03-01",
        subtitleUrls: {
            en: "/assets/subtitles/hutao_demo.en.ass",
            th: "/assets/subtitles/hutao_demo.th.ass",
        },
        audioUrls: {
            en: "https://www.youtube.com/watch?v=qrH9vMZBwAk",
            ja: "https://www.youtube.com/watch?v=vRj3YbsVTPc",
            kor: "https://www.youtube.com/watch?v=kMIweyKSoqI",
            th: "/assets/audio/hutao_demo.th.mp3",
        },
        tags: ["character demo", "hutao", "qiqi", "liyue"]
    },
    {
        id: "SO__VQZirJ4",
        title: "Genshin Impact Story Teaser: We Will Be Reunited (Contains spoilers)",
        duration: "02:14",
        thumbnail: "https://i.ytimg.com/vi/SO__VQZirJ4/maxresdefault.jpg",
        uploadDate: "2020-08-31",
        subtitleUrls: {
            zht: "/assets/subtitles/we_will_be_reunited.zht.ass",
            en: "/assets/subtitles/we_will_be_reunited.en.ass",
            es: "/assets/subtitles/we_will_be_reunited.es.ass",
            fr: "/assets/subtitles/we_will_be_reunited.fr.ass",
            ru: "/assets/subtitles/we_will_be_reunited.ru.ass",
            th: "/assets/subtitles/we_will_be_reunited.th.ass",
            vi: "/assets/subtitles/we_will_be_reunited.vi.ass",
            de: "/assets/subtitles/we_will_be_reunited.de.ass",
            ind: "/assets/subtitles/we_will_be_reunited.ind.ass",
            pt: "/assets/subtitles/we_will_be_reunited.pt.ass"
        },
        audioUrls: {
            en: "https://www.youtube.com/watch?v=SO__VQZirJ4",
            ja: "https://www.youtube.com/watch?v=C4Chz2toaK4",
            kor: "https://www.youtube.com/watch?v=ANiJXb7WzIE",
        },
        tags: ["story teaser", "lumine", "aether"]
    },
    {
        id: "C_duDk5e8yU",
        title: "New Character Demo - \"Klee: Da-Da Da!\" | Genshin Impact",
        duration: "01:42",
        thumbnail: "https://i.ytimg.com/vi/C_duDk5e8yU/maxresdefault.jpg",
        uploadDate: "2020-10-19",
        subtitleUrls: {},
        audioUrls: {
            en: "https://www.youtube.com/watch?v=C_duDk5e8yU",
            ja: "https://www.youtube.com/watch?v=7-VnFQvCLDc",
            kor: "https://www.youtube.com/watch?v=CYQ0Qj8N1Ms"
        },
        tags: ["character demo", "klee", "jean", "monstadt"]
    },
    {
        id: "4oBpaBEMBIM",
        title: "Character Demo - \"Zhongli: The Listener\" | Genshin Impact",
        duration: "01:54",
        thumbnail: "https://i.ytimg.com/vi/4oBpaBEMBIM/maxresdefault.jpg",
        uploadDate: "2020-11-30",
        subtitleUrls: {},
        audioUrls: {
            en: "https://www.youtube.com/watch?v=4oBpaBEMBIM",
            ja: "https://www.youtube.com/watch?v=wO3_S82III0",
            kor: "https://www.youtube.com/watch?v=ck8CBmeLjVQ",
        },
        tags: ["character demo", "zhongli", "liyue"]
    },
    {
        id: "zif0Lmhrivc",
        title: "New Character Demo - \"Kaedehara Kazuha: Wandering Winds\" | Genshin Impact",
        duration: "02:03",
        thumbnail: "https://i.ytimg.com/vi/zif0Lmhrivc/maxresdefault.jpg",
        uploadDate: "2021-06-28",
        subtitleUrls: {},
        audioUrls: {
            en: "https://www.youtube.com/watch?v=zif0Lmhrivc",
            ja: "https://www.youtube.com/watch?v=ZxLLysD9q6g",
            kor: "https://www.youtube.com/watch?v=03OrtAv9nBc",
        },
        tags: ["character demo", "kaedehara kazuha", "inazuma"]
    },
    {
        id: "rAlymhPyKhQ",
        title: "\"Tsubaki in Thawing Snow\" Short Trailer | Genshin Impact",
        duration: "03:11",
        thumbnail: "https://i.ytimg.com/vi/rAlymhPyKhQ/maxresdefault.jpg",
        uploadDate: "2022-04-18",
        subtitleUrls: {},
        audioUrls: {
            en: "https://www.youtube.com/watch?v=rAlymhPyKhQ",
            ja: "https://www.youtube.com/watch?v=1_wHgvZyZdk",
            kor: "https://www.youtube.com/watch?v=fMyuzvUQNMg",
        },
        tags: ["character teaser", "kamisato ayaka", "kamisato ayato", "inazuma"]
    },
    {
        id: "s3ok84NeMdU",
        title: "Character Teaser - \"Kamisato Ayato: Lanterns in the Night\" | Genshin Impact",
        duration: "01:56",
        thumbnail: "https://i.ytimg.com/vi/s3ok84NeMdU/maxresdefault.jpg",
        uploadDate: "2022-03-24",
        subtitleUrls: {},
        audioUrls: {
            en: "https://www.youtube.com/watch?v=s3ok84NeMdU",
            ja: "https://www.youtube.com/watch?v=cklsFHnt-38",
            kor: "https://www.youtube.com/watch?v=qo_djskMb9s"
        },
        tags: ["character teaser", "kamisato ayato", "kamisato ayaka", "thoma", "inazuma"]
    }
]
export default db