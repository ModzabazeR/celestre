import Link from "next/link";

const Tag = ({ tag }: { tag: string }) => {
    return (
        <Link href={`/tag/${tag}`}>
            <a>
                <div className="bg-[#40434c] hover:bg-[#76777f] rounded-md p-1 uppercase font-medium text-xs md:text-sm cursor-pointer transition-all">{tag}</div>
            </a>
        </Link>
    )
}

export default Tag;