/**
 * [INPUT]:  依赖 @/rainbowKitConfig 的 wagmi config，依赖 wagmi/rainbowkit/tanstack-query
 * [OUTPUT]: 导出 Providers 组件，提供 WagmiProvider + QueryClientProvider + RainbowKitProvider 三层上下文
 * [POS]:    app/ 的上下文根，被 ClientLayout 通过 next/dynamic(ssr:false) 懒加载，禁止直接 SSR
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import config from "@/rainbowKitConfig";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

export function Providers(props: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

