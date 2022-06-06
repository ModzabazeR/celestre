import Link from "next/link";

const Tag = ({ tag }: { tag: string }) => {
    return (
        <Link href={`/tags/${tag}`}>
            <a>
                <div className="bg-[#40434c] hover:bg-[#76777f] rounded-md p-1 mr-2 mb-2 uppercase font-medium text-xs md:text-sm cursor-pointer transition-all w-max">{tag}</div>
            </a>
        </Link>
    )
}

export default Tag;