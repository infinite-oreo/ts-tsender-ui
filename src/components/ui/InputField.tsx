/**
 * [INPUT]:  无外部依赖，纯受控组件，接收 label/placeholder/value/onChange/large/type props
 * [OUTPUT]: 导出 InputForm 组件和 InputFormProps 类型，渲染单行 input 或多行 textarea
 * [POS]:    components/ui/ 的原子输入组件，被 AirdropForm 多次消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
export interface InputFormProps {
    label: string
    placeholder: string
    value?: string
    type?: string
    large?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function InputForm({ label, placeholder, value, type, large, onChange }: InputFormProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-zinc-600 font-medium text-sm">{label}</label>
            {large ? (
                <textarea
                    className={`bg-white py-2 px-3 border border-zinc-300 placeholder:text-zinc-500 text-zinc-900 shadow-xs rounded-lg focus:ring-[4px] focus:ring-zinc-400/15 focus:outline-none h-24 align-text-top`}
                    placeholder={placeholder}
                    value={value || ''}
                    onChange={onChange}
                />
            ) : (
                <input
                    className={`bg-white py-2 px-3 border border-zinc-300 placeholder:text-zinc-500 text-zinc-900 shadow-xs rounded-lg focus:ring-[4px] focus:ring-zinc-400/15 focus:outline-none`}
                    type={type}
                    placeholder={placeholder}
                    value={value || ''}
                    onChange={onChange}
                />
            )}
        </div>
    )
}