import { useState } from 'react'

export default function RiverLandformsSimulation() {
  const [selectedLandform, setSelectedLandform] = useState<'v-valley' | 'fan' | 'delta' | 'floodplain'>('v-valley')

  const landforms = {
    'v-valley': { name: 'V形谷', location: '上游', process: '侵蚀', description: '河流下切侵蚀形成' },
    'fan': { name: '冲积扇', location: '山口', process: '沉积', description: '河流出山口流速减慢沉积' },
    'floodplain': { name: '河漫滩', location: '中下游', process: '沉积', description: '洪水期泥沙沉积形成' },
    'delta': { name: '三角洲', location: '入海口', process: '沉积', description: '河流入海流速骤减沉积' },
  }

  const current = landforms[selectedLandform]

  return (
    <div className="space-y-6">
      {/* 演示区域 - 河流地貌分布 */}
      <div className="relative bg-gradient-to-b from-amber-100 to-blue-200 rounded-xl p-6 min-h-[350px]">
        <svg className="w-full h-full" viewBox="0 0 700 320" preserveAspectRatio="xMidYMid meet">
          {/* 山地 */}
          <path d="M 0 150 L 100 50 L 200 120 L 150 150" fill="#6b7280" />
          <path d="M 50 150 L 120 80 L 180 130" fill="#9ca3af" />

          {/* V形谷 */}
          <g className={selectedLandform === 'v-valley' ? 'opacity-100' : 'opacity-50'}>
            <path d="M 100 100 L 130 150 L 160 100" fill="#854d0e" stroke="#6b7280" strokeWidth="2" />
            <path d="M 115 100 L 130 130 L 145 100" fill="#0ea5e9" />
            <text x="130" y="170" textAnchor="middle" fill="var(--text-primary)" fontSize="10">V形谷</text>
          </g>

          {/* 冲积扇 */}
          <g className={selectedLandform === 'fan' ? 'opacity-100' : 'opacity-50'}>
            <path d="M 180 150 L 150 250 L 250 250 Z" fill="#d4a574" />
            <path d="M 180 150 L 200 200" stroke="#0ea5e9" strokeWidth="2" />
            <text x="200" y="270" textAnchor="middle" fill="var(--text-primary)" fontSize="10">冲积扇</text>
          </g>

          {/* 河流 */}
          <path d="M 200 200 Q 300 220 400 200 Q 500 180 600 200" fill="none" stroke="#0ea5e9" strokeWidth="8" />

          {/* 河漫滩 */}
          <g className={selectedLandform === 'floodplain' ? 'opacity-100' : 'opacity-50'}>
            <ellipse cx="350" cy="200" rx="80" ry="30" fill="#86efac" opacity="0.7" />
            <ellipse cx="450" cy="190" rx="60" ry="25" fill="#86efac" opacity="0.7" />
            <text x="400" y="250" textAnchor="middle" fill="var(--text-primary)" fontSize="10">河漫滩</text>
          </g>

          {/* 三角洲 */}
          <g className={selectedLandform === 'delta' ? 'opacity-100' : 'opacity-50'}>
            <path d="M 580 180 L 550 280 L 680 280 L 650 180 Z" fill="#d4a574" />
            <path d="M 600 200 L 580 250 M 600 200 L 620 250 M 600 200 L 600 250" stroke="#0ea5e9" strokeWidth="2" />
            <rect x="550" y="260" width="150" height="40" fill="#0ea5e9" opacity="0.5" />
            <text x="615" y="310" textAnchor="middle" fill="var(--text-primary)" fontSize="10">三角洲</text>
            <text x="625" y="290" fill="white" fontSize="10">海洋</text>
          </g>

          {/* 河段标注 */}
          <g fill="var(--text-secondary)" fontSize="11">
            <text x="130" y="40">上游</text>
            <text x="350" y="160">中游</text>
            <text x="550" y="160">下游</text>
          </g>

          {/* 流向箭头 */}
          <path d="M 250 210 L 350 200" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrowTeal)" />
        </svg>
      </div>

      {/* 地貌选择 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {(Object.keys(landforms) as Array<keyof typeof landforms>).map(key => (
          <button
            key={key}
            onClick={() => setSelectedLandform(key)}
            className={`p-3 rounded-lg text-center transition-colors ${
              selectedLandform === key
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <div className="font-medium">{landforms[key].name}</div>
            <div className="text-xs opacity-80">{landforms[key].location}</div>
          </button>
        ))}
      </div>

      {/* 当前地貌详情 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="info-card">
          <div className="info-card-title">地貌名称</div>
          <div className="text-lg font-bold text-[var(--accent)]">{current.name}</div>
        </div>
        <div className="info-card">
          <div className="info-card-title">分布位置</div>
          <div className="text-lg font-bold text-[var(--text-primary)]">{current.location}</div>
        </div>
        <div className="info-card">
          <div className="info-card-title">形成过程</div>
          <div className="text-lg font-bold text-[var(--text-primary)]">{current.process}</div>
        </div>
        <div className="info-card">
          <div className="info-card-title">形成原因</div>
          <div className="text-sm text-[var(--text-secondary)]">{current.description}</div>
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>上游：以侵蚀为主，形成V形谷、峡谷</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>中下游：以沉积为主，形成冲积平原、河漫滩</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>冲积扇：扇顶颗粒粗，扇缘颗粒细</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>三角洲：土壤肥沃，但地势低洼易涝</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
