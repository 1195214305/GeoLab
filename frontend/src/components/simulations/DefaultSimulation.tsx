import { Info } from 'lucide-react'

export default function DefaultSimulation() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mb-4">
        <Info size={32} className="text-[var(--text-tertiary)]" />
      </div>
      <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
        演示加载中
      </h3>
      <p className="text-sm text-[var(--text-secondary)] max-w-md">
        该知识点的交互式演示正在准备中，请稍后再试。
      </p>
    </div>
  )
}
