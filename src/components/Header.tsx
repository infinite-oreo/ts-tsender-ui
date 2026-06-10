/**
 * [INPUT]:  依赖 @rainbow-me/rainbowkit 的 ConnectButton，依赖 react-icons/fa 的 FaGithub
 * [OUTPUT]: 导出 Header 组件，提供品牌导航 + GitHub 链接 + 钱包连接按钮
 * [POS]:    components/ 的全局导航栏，被 ClientLayout 唯一消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { FaGithub } from "react-icons/fa"
export default function Header() {
    return (
        <nav className="px-8 py-4.5 border-b border-zinc-100 flex flex-row justify-between items-center bg-white xl:min-h-19.25">
            <div className="flex items-center gap-2.5 md:gap-6">
                <a href="/" className="flex items-center gap-1 text-zinc-800">
                    <h1 className="font-bold text-2xl">TSender</h1>
                </a>
                <a
                    href="https://github.com/infinite-oreo/ts-tsender-ui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors border-2 border-zinc-600 hover:border-zinc-500 cursor-alias hidden md:block"
                >
                    <FaGithub className="h-5 w-5 text-white" />
                </a>
            </div>
            <h3 className="italic text-left hidden text-zinc-500 lg:block">
                The most gas efficient airdrop contract on earth, built in huff 🐎
            </h3>
            <div className="flex items-center gap-4">
                <ConnectButton />
            </div>
        </nav>
    )
}