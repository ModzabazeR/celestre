import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaDribbble, FaDiscord, FaYoutube } from 'react-icons/fa';
import Logo from "../images/logo.svg"

const Footer = () => {
    return (
        <footer className="bg-[#1b1d2a]">
            <div className="max-w-5xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-center">
                    <Logo className="h-12" />
                </div>

                <p className="max-w-md mx-auto mt-6 leading-relaxed text-center text-gray-400">
                    Genshin Web Player is not affiliated with HoYoverse. <br />
                    Genshin Impact, game content and materials are trademarks and copyrights of HoYoverse.
                </p>

                <div className="flex flex-wrap justify-center gap-x-20">
                <div>
                    <h1 className="text-center font-medium text-lg my-6">Community Links</h1>
                    <ul className="flex justify-center gap-6 md:gap-8">
                        <li>
                            <Link href="https://github.com/ModzabazeR/genshin-web-player">
                                <a
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className="text-white transition hover:text-white/75"
                                >
                                    <span className="sr-only">GitHub</span>
                                    <FaGithub className='w-6 h-6' />
                                </a>
                            </Link>
                        </li>

                        <li>
                            <Link href="/">
                                <a
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className="text-white transition hover:text-white/75"
                                >
                                    <span className="sr-only">Website</span>
                                    <FaDribbble className='w-6 h-6' />
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h1 className="text-center font-medium text-lg my-6">Official Links</h1>
                    <ul className="flex justify-center gap-6 md:gap-8">
                        <li>
                            <Link href="https://www.facebook.com/Genshinimpact/">
                                <a
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className="text-white transition hover:text-white/75"
                                >
                                    <span className="sr-only">Facebook</span>
                                    <FaFacebook className='w-6 h-6' />
                                </a>
                            </Link>
                        </li>

                        <li>
                            <Link href="https://discord.gg/4nbWsCGjjE">
                                <a
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className="text-white transition hover:text-white/75"
                                >
                                    <span className="sr-only">Discord</span>
                                    <FaDiscord className='w-6 h-6' />
                                </a>
                            </Link>
                        </li>

                        <li>
                            <Link href="https://www.youtube.com/channel/UCiS882YPwZt1NfaM0gR0D9Q">
                                <a
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className="text-white transition hover:text-white/75"
                                >
                                    <span className="sr-only">YouTube</span>
                                    <FaYoutube className='w-6 h-6' />
                                </a>
                            </Link>
                        </li>

                        <li>
                            <Link href="https://genshin.hoyoverse.com">
                                <a
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className="text-white transition hover:text-white/75"
                                >
                                    <span className="sr-only">Website</span>
                                    <FaDribbble className='w-6 h-6' />
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer;