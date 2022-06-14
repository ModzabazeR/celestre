import Link from "next/link";
import Router, { useRouter } from 'next/router'
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import Logo from "../images/logo.svg"
import loc from "../locales/locales";

const NavBar = () => {
    const router = useRouter();
    const { locale, asPath } = router;
    const t = locale === "th" ? loc.th : loc.en;
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    Router.events.on("routeChangeComplete", () => {
        setIsNavExpanded(false);
    })

    return (
        <header className={"bg-[#1b1d2a] sticky top-0 z-50 " + t.code}>
            <div className="flex items-center h-16 gap-8 px-4 mx-auto sm:px-6 lg:px-8">
                <Link href="/">
                    <a className="block text-teal-600">
                        <span className="sr-only">Home</span>
                        <Logo className="h-8" />
                    </a>
                </Link>

                <div className="flex items-center justify-end flex-1 md:justify-between">
                    <nav className={"md:block" + (!isNavExpanded ? " hidden" : "")} aria-labelledby="header-navigation">
                        <h2 className="sr-only" id="header-navigation">Header navigation</h2>

                        <ul className={"flex items-center md:gap-6" + (isNavExpanded ? " flex-col absolute right-0 top-16 bg-[#1b1d2a] p-4 rounded-md w-full" : "")}>

                            <li className={isNavExpanded ? "w-full text-center hover:bg-[#343746] p-4 rounded-md" : "md:cursor-pointer"}>
                                <Link href="/">
                                    <a className="text-white transition hover:text-white/75">
                                        {t.home}
                                    </a>
                                </Link>
                            </li>



                            <li className={isNavExpanded ? "w-full text-center hover:bg-[#343746] p-4 rounded-md" : "md:cursor-pointer"}>
                                <Link href="/tags">
                                    <a className="text-white transition hover:text-white/75">
                                        {t.tags}
                                    </a>
                                </Link>
                            </li>



                            <li className={isNavExpanded ? "w-full text-center hover:bg-[#343746] p-4 rounded-md" : "md:cursor-pointer"}>
                                <Link href="/about">
                                    <a className="text-white transition hover:text-white/75">
                                        {t.about}
                                    </a>
                                </Link>
                            </li>



                            <li className={isNavExpanded ? "w-full text-center hover:bg-[#343746] p-4 rounded-md" : "md:cursor-pointer"}>
                                <Link href="/faq">
                                    <a className="text-white transition hover:text-white/75">
                                        {t.faq}
                                    </a>
                                </Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:gap-4 sm:flex">
                            <div className="flex items-center justify-center px-4 py-2 text-white bg-[#363f7e] hover:bg-[#657ef8] transition rounded-md text-sm md:text-base cursor-pointer" onClick={() => {
                                router.push(asPath, asPath, { locale: t.code === "th" ? "en-US" : "th" })
                            }}>
                                <span className="font-medium uppercase">{t.code}</span>
                            </div>
                        </div>

                        <button
                            className="block p-2 text-white transition bg-[#363f7e] hover:bg-[#657ef8] rounded-md md:hidden cursor-default"
                            onClick={() => setIsNavExpanded(!isNavExpanded)}
                        >
                            <span className="sr-only">Toggle menu</span>
                            {isNavExpanded ? <MdClose className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default NavBar;