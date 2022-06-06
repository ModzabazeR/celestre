import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import Logo from "../images/logo.svg"

const NavBar = () => {
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
                    <nav className="hidden md:block" aria-labelledby="header-navigation">
                        <h2 className="sr-only" id="header-navigation">Header navigation</h2>

                        <ul className="flex items-center gap-6">
                            <li>
                                <Link href="/">
                                    <a className="text-white transition hover:text-white/75">
                                        Home
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/tags">
                                    <a className="text-white transition hover:text-white/75">
                                        Tags
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/about">
                                    <a className="text-white transition hover:text-white/75">
                                        About
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/faq">
                                    <a className="text-white transition hover:text-white/75">
                                        FAQ
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:gap-4 sm:flex">
                            <Link href="https://github.com/ModzabazeR/genshin-web-player">
                            <a className="flex items-center justify-center px-4 py-2 text-white bg-[#363f7e] hover:bg-[#657ef8] transition rounded-md text-sm md:text-base" target="_blank">
                                <FaGithub className="inline mr-1 md:mr-2"/>
                                <span className="font-medium">GitHub</span>
                            </a>
                            </Link>
                        </div>

                        <button className="block p-2 text-gray-600 transition bg-gray-100 rounded-md md:hidden hover:text-gray-600/75">
                            <span className="sr-only">Toggle menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default NavBar;