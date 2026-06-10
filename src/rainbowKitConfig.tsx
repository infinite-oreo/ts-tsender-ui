/**
 * [INPUT]:  依赖 @rainbow-me/rainbowkit 的 getDefaultConfig，依赖 wagmi/chains，依赖 NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID 环境变量
 * [OUTPUT]: 导出 wagmi config 单例，配置支持链与 WalletConnect projectId
 * [POS]:    src/ 的全局 wagmi 配置，仅被 providers.tsx 消费（通过 ClientLayout 确保仅客户端加载）
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, base, mainnet, optimism, anvil, zksync, sepolia } from "wagmi/chains";

export default getDefaultConfig({
    appName: "TSender",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [mainnet, arbitrum, optimism, base, zksync, sepolia, anvil],
    ssr: false,
});