import db from "../../db";
import { NextRouter, useRouter } from "next/router";

const Tag = () => {
    const router: NextRouter = useRouter();
    const { id } = router.query;

    return(
        <div>{id}</div>
    )
}

export default Tag;