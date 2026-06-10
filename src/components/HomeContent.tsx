/**
 * [INPUT]:  依赖 @/components/AirdropForm
 * [OUTPUT]: 导出 HomeContent 组件，已连接钱包状态下的页面主体容器
 * [POS]:    components/ 的布局容器，被 page.tsx 在钱包已连接时渲染
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import AirdropForm from "@/components/AirdropForm"


export default function HomeContent() {
    return (
        <div>
            <AirdropForm />
        </div>
    )
}