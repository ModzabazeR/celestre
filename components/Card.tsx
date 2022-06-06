import Link from "next/link";
import Image from "next/image";

const convertImage = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

interface CardProps {
    videoId: string;
    videoThumbnail: string;
    videoTitle: string;
    videoDuration: string;
}

const Card = ({ videoId, videoThumbnail, videoTitle, videoDuration }: CardProps) => {
    return (
        <Link href={`/watch/${videoId}`}>
        <a className="cursor-pointer bg-[#1b1d2a] hover:bg-[#343746] rounded-md transition-all" title={videoTitle}>
          <div className="relative">
            <div className="absolute z-20 bg-[#1b1d2a]/75 m-2 p-2 rounded-md bottom-0 right-0">{videoDuration}</div>
            <Image 
             src={videoThumbnail} 
             width={1280} 
             height={720} 
             alt={videoTitle} 
             className="rounded-t-md pointer-events-none" 
             layout='responsive'
             placeholder='blur'
             blurDataURL={`data:image/svg+xml;base64,${toBase64(convertImage(700, 475))}`} />
          </div>
          <h1 className="m-3 line-clamp-2 font-medium">{videoTitle}</h1>
        </a>
      </Link>
    )
}

export default Card;