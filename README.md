# TSender UI

ERC20 批量空投前端，100% 客户端渲染，对接 TSender 合约。

智能合约仓库：https://github.com/Cyfrin/TSender/

**技术栈：** Next.js 16 · Tailwind v4 · wagmi v3 · RainbowKit v2 · viem v2 · TypeScript

**支持网络：** Ethereum · Arbitrum · Optimism · Base · zkSync · Sepolia · Anvil（本地）

---

- [快速开始](#快速开始)
  - [环境要求](#环境要求)
  - [环境变量](#环境变量)
  - [本地运行](#本地运行)
- [测试](#测试)
- [项目结构](#项目结构)

---

# 快速开始

## 环境要求

- [Node.js](https://nodejs.org/en/download) — `node --version` 应输出 `v20+`
- [pnpm](https://pnpm.io/) — `pnpm --version` 应输出 `9+`
- [git](https://git-scm.com/downloads) — `git --version` 应输出 `2+`
- [Foundry](https://getfoundry.sh/)（本地测试可选）— `anvil --version` 应有输出

## 环境变量

在项目根目录创建 `.env.local`：

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=你的ProjectID
```

Project ID 从 [reown cloud](https://cloud.reown.com/) 获取，免费注册即可。

## 本地运行

```bash
git clone https://github.com/infinite-oreo/ts-tsender-ui
cd ts-tsender-ui
pnpm install
```

**可选：启动本地 Anvil 链（用于本地测试）**

在第一个终端：

```bash
pnpm anvil
```

确保 MetaMask / Rabby 钱包已连接到本地 Anvil 实例（`http://127.0.0.1:8545`，Chain ID `31337`）。Anvil 默认账户内置有测试代币。

**启动前端**

在另一个终端：

```bash
pnpm dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

---

# 测试

## 单元测试

```bash
pnpm test:unit
```

使用 Vitest 运行，覆盖 `calculateTotal` 等纯函数逻辑。

---

# 项目结构

```
src/
├── app/
│   ├── ClientLayout.tsx   # 客户端壳层，隔离 WalletConnect 的 SSR 问题
│   ├── layout.tsx         # 根布局（Server Component）
│   ├── page.tsx           # 首页，根据钱包连接状态路由渲染
│   ├── providers.tsx      # wagmi + RainbowKit 上下文
│   └── globals.css        # Tailwind v4 全局样式
├── components/
│   ├── AirdropForm.tsx    # 核心表单，执行 approve + airdropERC20
│   ├── Header.tsx         # 顶部导航 + 钱包连接按钮
│   ├── HomeContent.tsx    # 已连接状态的页面容器
│   └── ui/
│       └── InputField.tsx # 通用输入组件
├── utils/
│   └── calculateTotal/    # 金额字符串求和纯函数
├── constants.ts           # 合约 ABI + 各链地址映射
└── rainbowKitConfig.tsx   # wagmi 全局配置
```
