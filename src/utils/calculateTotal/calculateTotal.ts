/**
 * [INPUT]:  amounts: string，逗号或换行分隔的数字字符串
 * [OUTPUT]: 返回 number，所有金额之和；任何元素非数字则返回 0
 * [POS]:    utils/calculateTotal/ 的核心纯函数，被 AirdropForm 通过 useMemo 消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
export function calculateTotal(amounts: string): number {
    const amountArray = amounts
        .split(/[,\n]+/)
        .map(amt => amt.trim())
        .filter(amt => amt !== "")
        .map(amt => parseFloat(amt))
    if (amountArray.some(isNaN)) {
        return 0
    }
    return amountArray.reduce((acc, curr) => acc + curr, 0)
}