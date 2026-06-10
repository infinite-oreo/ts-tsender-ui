/**
 * [INPUT]:  依赖 ./providers 的 Providers，依赖 @/components/Header
 * [OUTPUT]: 导出 ClientLayout 组件，作为根布局的客户端壳层
 * [POS]:    app/ 的 SSR 隔离层，被 layout.tsx 唯一消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import Header from "@/components/Header";

// WalletConnect 使用 indexedDB 等浏览器 API，ssr: false 防止服务端初始化崩溃
const Providers = dynamic(
  () => import("./providers").then((m) => ({ default: m.Providers })),
  { ssr: false }
);

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <Header />
      {children}
    </Providers>
  );
}
