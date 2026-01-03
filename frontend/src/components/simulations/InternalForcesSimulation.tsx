import { useState } from 'react'

export default function InternalForcesSimulation() {
  const [selectedForce, setSelectedForce] = useState<'fold' | 'fault' | 'volcano' | 'earthquake'>('fold')

  return (
    <div className="space-y-6">
      {/* 演示区域 */}
      <div className="relative bg-[var(--bg-primary)] rounded-xl p-6 min-h-[300px]">
        <svg className="w-full h-full" viewBox="0 0 600 280" preserveAspectRatio="xMidYMid meet">
          {selectedForce === 'fold' && (
            <g>
              {/* 褶皱示意 */}
              <text x="300" y="30" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="bold">褶皱构造</text>

              {/* 背斜 */}
              <g transform="translate(150, 80)">
                <path d="M 0 120 Q 50 60 100 120" fill="none" stroke="#6b7280" strokeWidth="3" />
                <path d="M 0 140 Q 50 80 100 140" fill="none" stroke="#9ca3af" strokeWidth="3" />
                <path d="M 0 160 Q 50 100 100 160" fill="none" stroke="#d1d5db" strokeWidth="3" />
                <text x="50" y="50" textAnchor="middle" fill="var(--text-primary)" fontSize="12">背斜</text>
                <text x="50" y="190" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">岩层向上弯曲</text>
                {/* 箭头表示挤压 */}
                <path d="M -20 120 L 10 120" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrowTeal)" />
                <path d="M 120 120 L 90 120" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrowTeal)" />
              </g>

              {/* 向斜 */}
              <g transform="translate(350, 80)">
                <path d="M 0 80 Q 50 140 100 80" fill="none" stroke="#6b7280" strokeWidth="3" />
                <path d="M 0 60 Q 50 120 100 60" fill="none" stroke="#9ca3af" strokeWidth="3" />
                <path d="M 0 40 Q 50 100 100 40" fill="none" stroke="#d1d5db" strokeWidth="3" />
                <text x="50" y="170" textAnchor="middle" fill="var(--text-primary)" fontSize="12">向斜</text>
                <text x="50" y="190" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">岩层向下弯曲</text>
              </g>
            </g>
          )}

          {selectedForce === 'fault' && (
            <g>
              <text x="300" y="30" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="bold">断层构造</text>

              {/* 地垒 */}
              <g transform="translate(100, 60)">
                <rect x="0" y="80" width="60" height="120" fill="#9ca3af" />
                <rect x="60" y="40" width="80" height="160" fill="#6b7280" />
                <rect x="140" y="80" width="60" height="120" fill="#9ca3af" />
                <line x1="60" y1="40" x2="60" y2="200" stroke="#ef4444" strokeWidth="3" />
                <line x1="140" y1="40" x2="140" y2="200" stroke="#ef4444" strokeWidth="3" />
                <text x="100" y="30" textAnchor="middle" fill="var(--text-primary)" fontSize="12">地垒（上升）</text>
                <text x="100" y="230" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">如：华山、庐山</text>
              </g>

              {/* 地堑 */}
              <g transform="translate(350, 60)">
                <rect x="0" y="40" width="60" height="160" fill="#6b7280" />
                <rect x="60" y="80" width="80" height="120" fill="#9ca3af" />
                <rect x="140" y="40" width="60" height="160" fill="#6b7280" />
                <line x1="60" y1="40" x2="60" y2="200" stroke="#ef4444" strokeWidth="3" />
                <line x1="140" y1="40" x2="140" y2="200" stroke="#ef4444" strokeWidth="3" />
                <text x="100" y="30" textAnchor="middle" fill="var(--text-primary)" fontSize="12">地堑（下降）</text>
                <text x="100" y="230" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">如：渭河平原、汾河谷地</text>
              </g>
            </g>
          )}

          {selectedForce === 'volcano' && (
            <g>
              <text x="300" y="30" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="bold">火山活动</text>

              {/* 火山剖面 */}
              <g transform="translate(150, 50)">
                {/* 地壳 */}
                <rect x="0" y="180" width="300" height="50" fill="#6b7280" />

                {/* 岩浆房 */}
                <ellipse cx="150" cy="200" rx="60" ry="30" fill="#ef4444" opacity="0.7" />
                <text x="150" y="205" textAnchor="middle" fill="white" fontSize="10">岩浆房</text>

                {/* 火山通道 */}
                <path d="M 130 170 L 140 100 L 160 100 L 170 170" fill="#ef4444" opacity="0.5" />

                {/* 火山锥 */}
                <path d="M 50 180 L 150 60 L 250 180 Z" fill="#854d0e" />

                {/* 火山口 */}
                <ellipse cx="150" cy="70" rx="20" ry="10" fill="#dc2626" />

                {/* 喷发物 */}
                <circle cx="150" cy="40" r="15" fill="#fbbf24" opacity="0.8">
                  <animate attributeName="cy" values="40;20;40" dur="1s" repeatCount="indefinite" />
                </circle>
                <text x="150" y="15" textAnchor="middle" fill="#fbbf24" fontSize="10">喷发</text>

                {/* 标注 */}
                <text x="80" y="140" fill="white" fontSize="10">火山锥</text>
                <text x="200" y="100" fill="var(--text-secondary)" fontSize="10">火山口</text>
              </g>
            </g>
          )}

          {selectedForce === 'earthquake' && (
            <g>
              <text x="300" y="30" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="bold">地震</text>

              <g transform="translate(100, 60)">
                {/* 地层 */}
                <rect x="0" y="100" width="400" height="120" fill="#6b7280" />

                {/* 震源 */}
                <circle cx="200" cy="160" r="20" fill="#ef4444">
                  <animate attributeName="r" values="20;30;20" dur="0.5s" repeatCount="indefinite" />
                </circle>
                <text x="200" y="165" textAnchor="middle" fill="white" fontSize="10">震源</text>

                {/* 震中 */}
                <circle cx="200" cy="100" r="10" fill="#fbbf24" />
                <text x="200" y="90" textAnchor="middle" fill="#fbbf24" fontSize="10">震中</text>

                {/* 震源深度 */}
                <line x1="200" y1="100" x2="200" y2="160" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5,3" />
                <text x="220" y="130" fill="var(--accent)" fontSize="10">震源深度</text>

                {/* 地震波 */}
                {[1, 2, 3].map(i => (
                  <circle
                    key={i}
                    cx="200"
                    cy="160"
                    r={30 + i * 30}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="1"
                    opacity={0.5 - i * 0.1}
                  >
                    <animate attributeName="r" values={`${30 + i * 30};${50 + i * 30};${30 + i * 30}`} dur="1s" repeatCount="indefinite" />
                  </circle>
                ))}

                {/* 地表建筑 */}
                <rect x="280" y="70" width="30" height="30" fill="#3b82f6" />
                <rect x="100" y="75" width="25" height="25" fill="#3b82f6" />
              </g>
            </g>
          )}

          <defs>
            <marker id="arrowTeal" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* 内力作用选择 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          { id: 'fold', name: '褶皱', icon: '🏔️' },
          { id: 'fault', name: '断层', icon: '⛰️' },
          { id: 'volcano', name: '火山', icon: '🌋' },
          { id: 'earthquake', name: '地震', icon: '⚡' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setSelectedForce(item.id as typeof selectedForce)}
            className={`p-3 rounded-lg text-center transition-colors ${
              selectedForce === item.id
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <div className="text-2xl mb-1">{item.icon}</div>
            <div className="font-medium">{item.name}</div>
          </button>
        ))}
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>内力作用能量来源：地球内部的热能、重力能等</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>褶皱：背斜成山向斜成谷（初期），背斜成谷向斜成山（后期地形倒置）</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>断层：地垒形成块状山地，地堑形成谷地或盆地</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>内力作用总体使地表变得高低不平，外力作用使地表趋于平坦</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
