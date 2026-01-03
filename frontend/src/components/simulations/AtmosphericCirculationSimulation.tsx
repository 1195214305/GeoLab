import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AtmosphericCirculationSimulation() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [showLabels, setShowLabels] = useState(true)

  return (
    <div className="space-y-6">
      {/* 演示区域 - 三圈环流 */}
      <div className="relative bg-gradient-to-b from-slate-900 to-blue-900 rounded-xl p-6 min-h-[450px] overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 700 400" preserveAspectRatio="xMidYMid meet">
          {/* 地球剖面 */}
          <defs>
            <linearGradient id="earthSurface" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#166534" />
            </linearGradient>
          </defs>

          {/* 纬度带背景 */}
          {/* 极地 */}
          <rect x="50" y="30" width="600" height="50" fill="rgba(147, 197, 253, 0.3)" />
          <rect x="50" y="320" width="600" height="50" fill="rgba(147, 197, 253, 0.3)" />

          {/* 温带 */}
          <rect x="50" y="80" width="600" height="80" fill="rgba(134, 239, 172, 0.2)" />
          <rect x="50" y="240" width="600" height="80" fill="rgba(134, 239, 172, 0.2)" />

          {/* 热带 */}
          <rect x="50" y="160" width="600" height="80" fill="rgba(251, 191, 36, 0.2)" />

          {/* 纬度线和标签 */}
          <g fill="var(--text-secondary)" fontSize="11">
            <line x1="50" y1="55" x2="650" y2="55" stroke="var(--border-color)" strokeDasharray="5,5" />
            <text x="660" y="60">90°N 北极</text>

            <line x1="50" y1="105" x2="650" y2="105" stroke="var(--border-color)" strokeDasharray="5,5" />
            <text x="660" y="110">60°N</text>

            <line x1="50" y1="160" x2="650" y2="160" stroke="var(--border-color)" strokeDasharray="5,5" />
            <text x="660" y="165">30°N</text>

            <line x1="50" y1="200" x2="650" y2="200" stroke="var(--border-color)" strokeWidth="2" />
            <text x="660" y="205">0° 赤道</text>

            <line x1="50" y1="240" x2="650" y2="240" stroke="var(--border-color)" strokeDasharray="5,5" />
            <text x="660" y="245">30°S</text>

            <line x1="50" y1="295" x2="650" y2="295" stroke="var(--border-color)" strokeDasharray="5,5" />
            <text x="660" y="300">60°S</text>

            <line x1="50" y1="345" x2="650" y2="345" stroke="var(--border-color)" strokeDasharray="5,5" />
            <text x="660" y="350">90°S 南极</text>
          </g>

          {/* 气压带标注 */}
          {showLabels && (
            <g fill="var(--text-primary)" fontSize="12" fontWeight="bold">
              <text x="100" y="50" fill="#60a5fa">极地高压带</text>
              <text x="100" y="100" fill="#ef4444">副极地低压带</text>
              <text x="100" y="155" fill="#60a5fa">副热带高压带</text>
              <text x="100" y="205" fill="#ef4444">赤道低压带</text>
              <text x="100" y="250" fill="#60a5fa">副热带高压带</text>
              <text x="100" y="300" fill="#ef4444">副极地低压带</text>
              <text x="100" y="350" fill="#60a5fa">极地高压带</text>
            </g>
          )}

          {/* 三圈环流 - 北半球 */}
          {/* 哈德莱环流（低纬环流） */}
          <g>
            <motion.path
              d="M 300 200 Q 350 180 300 160"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="3"
              markerEnd="url(#arrowY)"
              animate={isPlaying ? { strokeDashoffset: [0, -20] } : {}}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              strokeDasharray="10,5"
            />
            <motion.path
              d="M 300 160 Q 250 180 300 200"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="3"
              markerEnd="url(#arrowY)"
              animate={isPlaying ? { strokeDashoffset: [0, -20] } : {}}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              strokeDasharray="10,5"
            />
            {showLabels && <text x="320" y="185" fill="#fbbf24" fontSize="10">低纬环流</text>}
          </g>

          {/* 费雷尔环流（中纬环流） */}
          <g>
            <motion.path
              d="M 400 160 Q 450 130 400 105"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              markerEnd="url(#arrowG)"
              animate={isPlaying ? { strokeDashoffset: [0, -20] } : {}}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              strokeDasharray="10,5"
            />
            <motion.path
              d="M 400 105 Q 350 130 400 160"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              markerEnd="url(#arrowG)"
              animate={isPlaying ? { strokeDashoffset: [0, -20] } : {}}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              strokeDasharray="10,5"
            />
            {showLabels && <text x="420" y="135" fill="#22c55e" fontSize="10">中纬环流</text>}
          </g>

          {/* 极地环流 */}
          <g>
            <motion.path
              d="M 500 105 Q 550 80 500 55"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="3"
              markerEnd="url(#arrowB)"
              animate={isPlaying ? { strokeDashoffset: [0, -20] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              strokeDasharray="10,5"
            />
            <motion.path
              d="M 500 55 Q 450 80 500 105"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="3"
              markerEnd="url(#arrowB)"
              animate={isPlaying ? { strokeDashoffset: [0, -20] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              strokeDasharray="10,5"
            />
            {showLabels && <text x="520" y="85" fill="#60a5fa" fontSize="10">极地环流</text>}
          </g>

          {/* 风带标注 */}
          {showLabels && (
            <g fontSize="11">
              <text x="250" y="185" fill="#f97316">东北信风 ↙</text>
              <text x="250" y="220" fill="#f97316">东南信风 ↖</text>
              <text x="350" y="135" fill="#a855f7">盛行西风 ↗</text>
              <text x="350" y="270" fill="#a855f7">盛行西风 ↘</text>
              <text x="450" y="85" fill="#06b6d4">极地东风 ↙</text>
              <text x="450" y="320" fill="#06b6d4">极地东风 ↖</text>
            </g>
          )}

          {/* 箭头定义 */}
          <defs>
            <marker id="arrowY" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24" />
            </marker>
            <marker id="arrowG" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
            </marker>
            <marker id="arrowB" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* 控制面板 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="control-panel flex items-center justify-between">
          <label className="control-label mb-0">动画播放</label>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium"
          >
            {isPlaying ? '暂停' : '播放'}
          </button>
        </div>
        <div className="control-panel flex items-center justify-between">
          <label className="control-label mb-0">显示标签</label>
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showLabels
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
            }`}
          >
            {showLabels ? '显示' : '隐藏'}
          </button>
        </div>
      </div>

      {/* 气压带风带表 */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--bg-secondary)]">
              <th className="p-3 text-left text-[var(--text-primary)]">纬度</th>
              <th className="p-3 text-left text-[var(--text-primary)]">气压带</th>
              <th className="p-3 text-left text-[var(--text-primary)]">风带</th>
              <th className="p-3 text-left text-[var(--text-primary)]">成因</th>
            </tr>
          </thead>
          <tbody className="text-[var(--text-secondary)]">
            <tr className="border-b border-[var(--border-color)]">
              <td className="p-3">0°</td>
              <td className="p-3 text-red-400">赤道低压带</td>
              <td className="p-3">-</td>
              <td className="p-3">热力原因（受热上升）</td>
            </tr>
            <tr className="border-b border-[var(--border-color)]">
              <td className="p-3">0°-30°</td>
              <td className="p-3">-</td>
              <td className="p-3 text-orange-400">信风带</td>
              <td className="p-3">气压梯度力+地转偏向力</td>
            </tr>
            <tr className="border-b border-[var(--border-color)]">
              <td className="p-3">30°</td>
              <td className="p-3 text-blue-400">副热带高压带</td>
              <td className="p-3">-</td>
              <td className="p-3">动力原因（下沉堆积）</td>
            </tr>
            <tr className="border-b border-[var(--border-color)]">
              <td className="p-3">30°-60°</td>
              <td className="p-3">-</td>
              <td className="p-3 text-purple-400">盛行西风带</td>
              <td className="p-3">气压梯度力+地转偏向力</td>
            </tr>
            <tr className="border-b border-[var(--border-color)]">
              <td className="p-3">60°</td>
              <td className="p-3 text-red-400">副极地低压带</td>
              <td className="p-3">-</td>
              <td className="p-3">动力原因（冷暖气流相遇上升）</td>
            </tr>
            <tr>
              <td className="p-3">90°</td>
              <td className="p-3 text-blue-400">极地高压带</td>
              <td className="p-3 text-cyan-400">极地东风带</td>
              <td className="p-3">热力原因（冷却下沉）</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 图例 */}
      <div className="geo-legend">
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-yellow-400" />
          <span>低纬环流</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-green-500" />
          <span>中纬环流</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-blue-400" />
          <span>极地环流</span>
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>三圈环流：低纬环流（哈德莱环流）、中纬环流（费雷尔环流）、高纬环流（极地环流）</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>气压带成因：热力原因（赤道低压、极地高压）和动力原因（副热带高压、副极地低压）</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>风向规律：北半球向右偏，南半球向左偏（地转偏向力）</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>气压带风带随太阳直射点移动而南北移动，移动幅度约5°-10°</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
