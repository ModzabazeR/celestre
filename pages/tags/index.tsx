import { allTags } from "../../db"

const initTags = (tagSet: Set<string>) => {
    const tags = Array.from(tagSet)
    tags.sort()
    return tags
}

const Tags = () => {
    const tags = initTags(allTags)
    console.log(tags);
    return (
        <div className="h-screen">Tags</div>
    )
}

export default Tags