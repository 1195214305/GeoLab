import { useState } from 'react'
import { motion } from 'framer-motion'

export default function HeatBalanceSimulation() {
  const [showDetails, setShowDetails] = useState(true)
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null)

  const processes = [
    { id: 'solar', name: '太阳辐射', value: 100, color: '#fbbf24', description: '太阳以短波辐射形式向地球输送能量' },
    { id: 'reflect', name: '大气反射', value: 25, color: '#94a3b8', description: '云层和大气颗粒反射部分太阳辐射' },
    { id: 'absorb', name: '大气吸收', value: 19, color: '#60a5fa', description: '臭氧、水汽等吸收部分太阳辐射' },
    { id: 'surface', name: '到达地面', value: 56, color: '#22c55e', description: '穿过大气层到达地表的太阳辐射' },
    { id: 'ground', name: '地面辐射', value: 100, color: '#ef4444', description: '地面以长波辐射形式向外释放能量' },
    { id: 'counter', name: '大气逆辐射', value: 95, color: '#f97316', description: '大气向地面返还的长波辐射，保温作用' },
  ]

  return (
    <div className="space-y-6">
      {/* 演示区域 */}
      <div className="relative bg-gradient-to-b from-slate-900 via-blue-900 to-green-800 rounded-xl p-6 min-h-[450px] overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
          {/* 太阳 */}
          <g transform="translate(80, 50)">
            <circle r="35" fill="#fbbf24">
              <animate attributeName="r" values="35;38;35" dur="2s" repeatCount="indefinite" />
            </circle>
            <text y="55" textAnchor="middle" fill="white" fontSize="12">太阳</text>
          </g>

          {/* 太阳辐射箭头 */}
          <g>
            {/* 入射太阳辐射 */}
            <motion.path
              d="M 120 70 L 300 180"
              stroke="#fbbf24"
              strokeWidth="8"
              fill="none"
              markerEnd="url(#arrowYellow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            />
            <text x="180" y="110" fill="#fbbf24" fontSize="11" transform="rotate(30 180 110)">太阳辐射 100%</text>

            {/* 大气反射 */}
            <path
              d="M 250 150 L 350 80"
              stroke="#94a3b8"
              strokeWidth="4"
              fill="none"
              markerEnd="url(#arrowGray)"
              strokeDasharray="5,3"
            />
            <text x="320" y="100" fill="#94a3b8" fontSize="10">反射 25%</text>

            {/* 大气吸收 */}
            <circle cx="280" cy="170" r="20" fill="#60a5fa" opacity="0.5" />
            <text x="280" y="175" textAnchor="middle" fill="white" fontSize="9">吸收19%</text>

            {/* 到达地面 */}
            <path
              d="M 300 200 L 300 320"
              stroke="#22c55e"
              strokeWidth="6"
              fill="none"
              markerEnd="url(#arrowGreen)"
            />
            <text x="310" y="270" fill="#22c55e" fontSize="10">到达地面 56%</text>
          </g>

          {/* 大气层 */}
          <rect x="100" y="140" width="400" height="100" fill="rgba(96, 165, 250, 0.2)" rx="10" />
          <text x="500" y="190" fill="rgba(255,255,255,0.7)" fontSize="12">大气层</text>

          {/* 地面 */}
          <rect x="100" y="320" width="400" height="60" fill="#22c55e" rx="5" />
          <text x="300" y="355" textAnchor="middle" fill="white" fontSize="14">地面</text>

          {/* 地面辐射 */}
          <g>
            <path
              d="M 350 320 L 350 250"
              stroke="#ef4444"
              strokeWidth="5"
              fill="none"
              markerEnd="url(#arrowRed)"
            />
            <text x="360" y="285" fill="#ef4444" fontSize="10">地面辐射</text>

            {/* 大气吸收地面辐射 */}
            <circle cx="350" cy="220" r="15" fill="#ef4444" opacity="0.3" />
          </g>

          {/* 大气逆辐射 */}
          <g>
            <path
              d="M 420 240 L 420 310"
              stroke="#f97316"
              strokeWidth="5"
              fill="none"
              markerEnd="url(#arrowOrange)"
            />
            <text x="430" y="280" fill="#f97316" fontSize="10">大气逆辐射</text>
            <text x="430" y="295" fill="#f97316" fontSize="9">(保温作用)</text>
          </g>

          {/* 射向宇宙 */}
          <path
            d="M 380 180 L 450 100"
            stroke="#94a3b8"
            strokeWidth="3"
            fill="none"
            markerEnd="url(#arrowGray)"
            strokeDasharray="5,3"
          />
          <text x="440" y="130" fill="#94a3b8" fontSize="9">射向宇宙</text>

          {/* 箭头定义 */}
          <defs>
            <marker id="arrowYellow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24" />
            </marker>
            <marker id="arrowGray" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
            <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
            </marker>
            <marker id="arrowRed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
            </marker>
            <marker id="arrowOrange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* 能量收支表 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {processes.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedProcess(selectedProcess === p.id ? null : p.id)}
            className={`p-4 rounded-lg text-left transition-all ${
              selectedProcess === p.id ? 'ring-2 ring-[var(--accent)]' : ''
            }`}
            style={{ backgroundColor: p.color + '20' }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
              <span className="font-medium text-[var(--text-primary)]">{p.name}</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: p.color }}>{p.value}%</div>
          </button>
        ))}
      </div>

      {/* 选中过程详情 */}
      {selectedProcess && (
        <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
          <h4 className="font-bold text-[var(--text-primary)] mb-2">
            {processes.find(p => p.id === selectedProcess)?.name}
          </h4>
          <p className="text-[var(--text-secondary)]">
            {processes.find(p => p.id === selectedProcess)?.description}
          </p>
        </div>
      )}

      {/* 图例 */}
      <div className="geo-legend">
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-yellow-400" />
          <span>太阳短波辐射</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-red-500" />
          <span>地面长波辐射</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-orange-500" />
          <span>大气逆辐射</span>
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>太阳辐射是短波辐射，地面辐射和大气辐射是长波辐射</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>大气对太阳辐射的削弱作用：吸收、反射、散射</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>大气逆辐射是大气保温作用的关键，使地面温度不会过低</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>温室效应：CO2等温室气体增加，大气逆辐射增强，全球变暖</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
