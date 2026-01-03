import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function WaterCycleSimulation() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [selectedCycle, setSelectedCycle] = useState<'sea-land' | 'land' | 'sea'>('sea-land')

  const cycles = {
    'sea-land': { name: '海陆间循环', description: '海洋与陆地之间的水循环，是最重要的水循环类型' },
    'land': { name: '陆地内循环', description: '陆地上的水循环，水量较小' },
    'sea': { name: '海上内循环', description: '海洋上的水循环，水量最大' },
  }

  return (
    <div className="space-y-6">
      {/* 演示区域 */}
      <div className="relative bg-gradient-to-b from-sky-400 via-sky-300 to-blue-600 rounded-xl p-6 min-h-[400px] overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 700 400" preserveAspectRatio="xMidYMid meet">
          {/* 太阳 */}
          <g transform="translate(100, 60)">
            <circle r="35" fill="#fbbf24">
              <animate attributeName="r" values="35;38;35" dur="2s" repeatCount="indefinite" />
            </circle>
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1="0"
                y1="45"
                x2="0"
                y2="65"
                stroke="#fbbf24"
                strokeWidth="3"
                transform={`rotate(${i * 45})`}
              />
            ))}
          </g>

          {/* 云 */}
          <g transform="translate(350, 80)">
            <ellipse cx="0" cy="0" rx="60" ry="30" fill="white" opacity="0.9" />
            <ellipse cx="-40" cy="10" rx="40" ry="25" fill="white" opacity="0.9" />
            <ellipse cx="40" cy="10" rx="45" ry="28" fill="white" opacity="0.9" />
            <ellipse cx="0" cy="20" rx="50" ry="25" fill="white" opacity="0.9" />
          </g>

          {/* 山脉 */}
          <polygon points="400,280 500,150 600,280" fill="#6b7280" />
          <polygon points="450,280 530,180 610,280" fill="#9ca3af" />
          <polygon points="350,280 420,200 490,280" fill="#4b5563" />

          {/* 陆地 */}
          <rect x="300" y="280" width="400" height="120" fill="#22c55e" />

          {/* 海洋 */}
          <rect x="0" y="280" width="300" height="120" fill="#0ea5e9" />
          <text x="150" y="350" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">海洋</text>
          <text x="500" y="350" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">陆地</text>

          {/* 水循环过程 */}
          {/* 1. 海洋蒸发 */}
          {isPlaying && (
            <g>
              {[0, 1, 2].map(i => (
                <motion.circle
                  key={`evap-sea-${i}`}
                  cx={100 + i * 50}
                  cy={280}
                  r="4"
                  fill="#60a5fa"
                  animate={{
                    cy: [280, 150],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </g>
          )}
          <text x="150" y="220" fill="#0284c7" fontSize="11">蒸发</text>
          <path d="M 150 270 L 150 200" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrowBlue)" strokeDasharray="5,3" />

          {/* 2. 水汽输送 */}
          {isPlaying && (
            <motion.g
              animate={{ x: [0, 200] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <ellipse cx="200" cy="100" rx="20" ry="10" fill="white" opacity="0.7" />
            </motion.g>
          )}
          <path d="M 200 100 L 400 100" stroke="white" strokeWidth="2" markerEnd="url(#arrowWhite)" />
          <text x="300" y="90" fill="white" fontSize="11">水汽输送</text>

          {/* 3. 降水 */}
          {isPlaying && (
            <g>
              {[0, 1, 2, 3].map(i => (
                <motion.line
                  key={`rain-${i}`}
                  x1={380 + i * 30}
                  y1={120}
                  x2={375 + i * 30}
                  y2={135}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  animate={{
                    y1: [120, 260],
                    y2: [135, 275],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </g>
          )}
          <text x="420" y="180" fill="#1d4ed8" fontSize="11">降水</text>

          {/* 4. 地表径流 */}
          <path d="M 500 280 Q 400 300 300 290" stroke="#0ea5e9" strokeWidth="4" fill="none" />
          <text x="380" y="310" fill="#0284c7" fontSize="11">地表径流</text>

          {/* 5. 地下径流 */}
          <path d="M 550 320 Q 450 350 300 340" stroke="#0369a1" strokeWidth="3" fill="none" strokeDasharray="8,4" />
          <text x="420" y="365" fill="#0369a1" fontSize="11">地下径流</text>

          {/* 6. 下渗 */}
          <path d="M 450 280 L 450 320" stroke="#0369a1" strokeWidth="2" markerEnd="url(#arrowDarkBlue)" strokeDasharray="3,3" />
          <text x="460" y="300" fill="#0369a1" fontSize="10">下渗</text>

          {/* 7. 陆地蒸发和植物蒸腾 */}
          {isPlaying && (
            <motion.circle
              cx={550}
              cy={280}
              r="3"
              fill="#86efac"
              animate={{
                cy: [280, 180],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
          <text x="560" y="230" fill="#16a34a" fontSize="10">蒸发蒸腾</text>

          {/* 箭头定义 */}
          <defs>
            <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#0284c7" />
            </marker>
            <marker id="arrowWhite" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="white" />
            </marker>
            <marker id="arrowDarkBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#0369a1" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* 控制面板 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="control-panel flex items-center justify-between">
          <label className="control-label mb-0">动画播放</label>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium"
          >
            {isPlaying ? '暂停' : '播放'}
          </button>
        </div>
        <div className="control-panel">
          <label className="control-label">水循环类型</label>
          <div className="flex gap-2">
            {(Object.keys(cycles) as Array<keyof typeof cycles>).map(key => (
              <button
                key={key}
                onClick={() => setSelectedCycle(key)}
                className={`flex-1 px-2 py-1 rounded text-xs transition-colors ${
                  selectedCycle === key
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                }`}
              >
                {cycles[key].name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 水循环环节 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: '蒸发', icon: '💨', desc: '水变为水汽' },
          { name: '水汽输送', icon: '☁️', desc: '风将水汽输送' },
          { name: '降水', icon: '🌧️', desc: '水汽凝结降落' },
          { name: '径流', icon: '🌊', desc: '水流回海洋' },
        ].map(item => (
          <div key={item.name} className="info-card text-center">
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="font-medium text-[var(--text-primary)]">{item.name}</div>
            <div className="text-xs text-[var(--text-tertiary)]">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* 图例 */}
      <div className="geo-legend">
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-sky-400" />
          <span>蒸发</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-white border border-[var(--border-color)]" />
          <span>水汽输送</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-blue-500" />
          <span>降水</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-cyan-500" />
          <span>地表径流</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-blue-800" />
          <span>地下径流</span>
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>海陆间循环：最重要的水循环，使陆地水得到补充更新</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>水循环的意义：维持全球水量平衡、更新陆地淡水资源、调节气候、塑造地表形态</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>人类活动影响：修建水库改变径流时间分配，跨流域调水改变空间分布</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>水循环动力：太阳辐射（蒸发）和重力（降水、径流）</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
