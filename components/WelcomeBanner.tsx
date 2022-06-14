import { useRouter } from "next/router"
import loc from "../locales/locales"

const WelcomeBanner = () => {

    const router = useRouter()
    const { locale } = router
    const t = locale === "th" ? loc.th : loc.en

    return (
        <section className="text-white bg-gray-900">
            <div className="max-w-screen-xl px-4 py-32 mx-auto lg:items-center lg:flex">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-2">
                        {t.welcomeTitle}
                    </h1>

                    <p className="max-w-xl mx-auto mt-4 sm:leading-relaxed sm:text-xl">
                        {t.welcomeSubtitle}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default WelcomeBanner