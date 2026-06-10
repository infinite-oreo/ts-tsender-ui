/**
 * [INPUT]:  依赖 wagmi 的 useAccount，依赖 @/components/HomeContent
 * [OUTPUT]: 首页路由组件，根据钱包连接状态渲染主内容或引导文案
 * [POS]:    app/ 的唯一页面入口，被 Next.js App Router 自动挂载为 /
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import HomeContent from "@/components/HomeContent";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div>
      {isConnected ? (
        <HomeContent />
      ) : (
        <div className="flex items-center justify-center min-h-[60vh] text-zinc-500 text-lg">
          Please connect your wallet to use the app
        </div>
      )}
    </div>
  );
}
