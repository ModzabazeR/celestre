import Link from "next/link";
import Router from 'next/router'
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import Logo from "../images/logo.svg"

const NavBar = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    Router.events.on("routeChangeComplete", () => {
        setIsNavExpanded(false);
    })

    return (
        <header className="bg-[#1b1d2a] sticky top-0 z-50">
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
                            <Link href="/">
                                <li className={isNavExpanded ? "w-full text-center hover:bg-[#343746] p-4 rounded-md" : "md:cursor-pointer"}>
                                    <a className="text-white transition hover:text-white/75">
                                        Home
                                    </a>
                                </li>
                            </Link>

                            <Link href="/tags">
                                <li className={isNavExpanded ? "w-full text-center hover:bg-[#343746] p-4 rounded-md" : "md:cursor-pointer"}>
                                    <a className="text-white transition hover:text-white/75">
                                        Tags
                                    </a>
                                </li>
                            </Link>

                            <Link href="/about">
                                <li className={isNavExpanded ? "w-full text-center hover:bg-[#343746] p-4 rounded-md" : "md:cursor-pointer"}>
                                    <a className="text-white transition hover:text-white/75">
                                         About
                                    </a>
                                </li>
                            </Link>

                            <Link href="/faq">
                                <li className={isNavExpanded ? "w-full text-center hover:bg-[#343746] p-4 rounded-md" : "md:cursor-pointer"}>
                                    <a className="text-white transition hover:text-white/75">
                                        FAQ
                                    </a>
                                </li>
                            </Link>
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:gap-4 sm:flex">
                            <Link href="https://github.com/ModzabazeR/genshin-web-player">
                                <a className="flex items-center justify-center px-4 py-2 text-white bg-[#363f7e] hover:bg-[#657ef8] transition rounded-md text-sm md:text-base" target="_blank">
                                    <FaGithub className="inline mr-1 md:mr-2" />
                                    <span className="font-medium">GitHub</span>
                                </a>
                            </Link>
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