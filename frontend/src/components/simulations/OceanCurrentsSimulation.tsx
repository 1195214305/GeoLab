import { useState } from 'react'

export default function OceanCurrentsSimulation() {
  const [showLabels, setShowLabels] = useState(true)
  const [selectedCurrent, setSelectedCurrent] = useState<string | null>(null)

  const currents = [
    { id: 'gulf-stream', name: '墨西哥湾暖流', type: 'warm', effect: '使西欧气候温和湿润' },
    { id: 'kuroshio', name: '日本暖流（黑潮）', type: 'warm', effect: '使日本东部气候温暖' },
    { id: 'labrador', name: '拉布拉多寒流', type: 'cold', effect: '与暖流交汇形成渔场' },
    { id: 'peru', name: '秘鲁寒流', type: 'cold', effect: '使沿岸形成荒漠' },
    { id: 'west-wind-drift', name: '西风漂流', type: 'cold', effect: '环绕南极大陆流动' },
  ]

  return (
    <div className="space-y-6">
      {/* 演示区域 - 世界洋流分布 */}
      <div className="relative bg-[var(--bg-primary)] rounded-xl p-4 min-h-[400px]">
        <svg className="w-full h-full" viewBox="0 0 700 400" preserveAspectRatio="xMidYMid meet">
          {/* 海洋背景 */}
          <rect x="0" y="0" width="700" height="400" fill="#0c4a6e" rx="10" />

          {/* 简化大陆轮廓 */}
          {/* 北美 */}
          <path d="M 80 80 L 180 60 L 200 150 L 150 200 L 80 180 Z" fill="#22c55e" opacity="0.7" />
          {/* 南美 */}
          <path d="M 120 220 L 180 200 L 200 320 L 140 350 L 100 280 Z" fill="#22c55e" opacity="0.7" />
          {/* 欧洲 */}
          <path d="M 320 60 L 400 50 L 420 120 L 350 140 L 300 100 Z" fill="#22c55e" opacity="0.7" />
          {/* 非洲 */}
          <path d="M 320 150 L 420 140 L 450 280 L 380 320 L 300 250 Z" fill="#22c55e" opacity="0.7" />
          {/* 亚洲 */}
          <path d="M 450 50 L 620 40 L 650 180 L 550 200 L 450 150 Z" fill="#22c55e" opacity="0.7" />
          {/* 澳大利亚 */}
          <path d="M 550 250 L 630 240 L 650 310 L 570 330 L 540 290 Z" fill="#22c55e" opacity="0.7" />

          {/* 洋流 - 暖流（红色） */}
          {/* 墨西哥湾暖流 */}
          <path
            d="M 150 200 Q 200 150 250 100 Q 300 80 350 90"
            fill="none"
            stroke="#ef4444"
            strokeWidth="4"
            markerEnd="url(#arrowRed)"
            className={selectedCurrent === 'gulf-stream' ? 'opacity-100' : 'opacity-70'}
            onClick={() => setSelectedCurrent('gulf-stream')}
            style={{ cursor: 'pointer' }}
          />
          {showLabels && <text x="250" y="70" fill="#ef4444" fontSize="10">墨西哥湾暖流</text>}

          {/* 北大西洋暖流 */}
          <path
            d="M 350 90 Q 380 85 400 100"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
            markerEnd="url(#arrowRed)"
          />

          {/* 日本暖流 */}
          <path
            d="M 550 200 Q 580 150 600 100 Q 620 80 640 70"
            fill="none"
            stroke="#ef4444"
            strokeWidth="4"
            markerEnd="url(#arrowRed)"
            className={selectedCurrent === 'kuroshio' ? 'opacity-100' : 'opacity-70'}
            onClick={() => setSelectedCurrent('kuroshio')}
            style={{ cursor: 'pointer' }}
          />
          {showLabels && <text x="620" y="120" fill="#ef4444" fontSize="10">黑潮</text>}

          {/* 洋流 - 寒流（蓝色） */}
          {/* 拉布拉多寒流 */}
          <path
            d="M 180 60 Q 200 100 220 150"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            markerEnd="url(#arrowBlue)"
            className={selectedCurrent === 'labrador' ? 'opacity-100' : 'opacity-70'}
            onClick={() => setSelectedCurrent('labrador')}
            style={{ cursor: 'pointer' }}
          />
          {showLabels && <text x="190" y="100" fill="#3b82f6" fontSize="10">拉布拉多</text>}

          {/* 秘鲁寒流 */}
          <path
            d="M 100 350 Q 90 300 100 250 Q 110 200 120 180"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            markerEnd="url(#arrowBlue)"
            className={selectedCurrent === 'peru' ? 'opacity-100' : 'opacity-70'}
            onClick={() => setSelectedCurrent('peru')}
            style={{ cursor: 'pointer' }}
          />
          {showLabels && <text x="60" y="270" fill="#3b82f6" fontSize="10">秘鲁寒流</text>}

          {/* 西风漂流 */}
          <path
            d="M 50 350 Q 200 360 350 355 Q 500 350 650 360"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            markerEnd="url(#arrowBlue)"
            className={selectedCurrent === 'west-wind-drift' ? 'opacity-100' : 'opacity-70'}
            onClick={() => setSelectedCurrent('west-wind-drift')}
            style={{ cursor: 'pointer' }}
          />
          {showLabels && <text x="350" y="375" fill="#3b82f6" fontSize="10">西风漂流</text>}

          {/* 赤道 */}
          <line x1="0" y1="200" x2="700" y2="200" stroke="white" strokeWidth="1" strokeDasharray="10,5" opacity="0.5" />
          <text x="10" y="195" fill="white" fontSize="10" opacity="0.7">赤道</text>

          {/* 渔场标记 */}
          <g>
            <circle cx="220" cy="130" r="15" fill="#fbbf24" opacity="0.6" />
            <text x="220" y="135" textAnchor="middle" fill="white" fontSize="10">🐟</text>
            {showLabels && <text x="220" y="160" textAnchor="middle" fill="#fbbf24" fontSize="9">纽芬兰渔场</text>}
          </g>

          {/* 箭头定义 */}
          <defs>
            <marker id="arrowRed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
            </marker>
            <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* 控制面板 */}
      <div className="control-panel flex items-center justify-between">
        <label className="control-label mb-0">显示标签</label>
        <button
          onClick={() => setShowLabels(!showLabels)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            showLabels ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
          }`}
        >
          {showLabels ? '显示' : '隐藏'}
        </button>
      </div>

      {/* 洋流列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {currents.map(current => (
          <button
            key={current.id}
            onClick={() => setSelectedCurrent(current.id)}
            className={`p-3 rounded-lg text-left transition-all ${
              selectedCurrent === current.id ? 'ring-2 ring-[var(--accent)]' : ''
            } ${current.type === 'warm' ? 'bg-red-500/20' : 'bg-blue-500/20'}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-3 h-3 rounded-full ${current.type === 'warm' ? 'bg-red-500' : 'bg-blue-500'}`} />
              <span className="font-medium text-[var(--text-primary)]">{current.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded ${current.type === 'warm' ? 'bg-red-500/30 text-red-400' : 'bg-blue-500/30 text-blue-400'}`}>
                {current.type === 'warm' ? '暖流' : '寒流'}
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{current.effect}</p>
          </button>
        ))}
      </div>

      {/* 图例 */}
      <div className="geo-legend">
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-red-500" />
          <span>暖流</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-blue-500" />
          <span>寒流</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-yellow-400" />
          <span>渔场</span>
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>洋流分布规律：以副热带为中心的大洋环流，北半球顺时针，南半球逆时针</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>暖流：从低纬流向高纬，水温高于流经海区；寒流相反</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>洋流对气候影响：暖流增温增湿，寒流降温减湿</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>渔场形成：寒暖流交汇处（如纽芬兰、北海道）或上升流区域（如秘鲁）</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
