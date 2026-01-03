import { useState } from 'react'

export default function ExternalForcesSimulation() {
  const [selectedForce, setSelectedForce] = useState<'weathering' | 'erosion' | 'transport' | 'deposition'>('weathering')

  const forces = {
    weathering: {
      name: '风化作用',
      description: '岩石在温度变化、水、生物等作用下破碎分解',
      types: ['物理风化（温差、冰劈）', '化学风化（溶解、氧化）', '生物风化（根劈）'],
      examples: '花岗岩球状风化、石灰岩溶蚀',
    },
    erosion: {
      name: '侵蚀作用',
      description: '流水、风、冰川、海浪等对地表的破坏作用',
      types: ['流水侵蚀', '风力侵蚀', '冰川侵蚀', '海浪侵蚀'],
      examples: 'V形谷、风蚀蘑菇、U形谷、海蚀崖',
    },
    transport: {
      name: '搬运作用',
      description: '风化、侵蚀产物被流水、风等搬运到其他地方',
      types: ['流水搬运', '风力搬运', '冰川搬运'],
      examples: '河流携带泥沙、风沙移动',
    },
    deposition: {
      name: '沉积作用',
      description: '搬运物质在条件改变时沉积下来',
      types: ['流水沉积', '风力沉积', '冰川沉积'],
      examples: '冲积扇、三角洲、沙丘、黄土高原',
    },
  }

  const current = forces[selectedForce]

  return (
    <div className="space-y-6">
      {/* 演示区域 */}
      <div className="relative bg-gradient-to-b from-sky-300 to-amber-200 rounded-xl p-6 min-h-[300px]">
        <svg className="w-full h-full" viewBox="0 0 600 280" preserveAspectRatio="xMidYMid meet">
          {selectedForce === 'weathering' && (
            <g>
              {/* 岩石风化过程 */}
              <g transform="translate(100, 80)">
                <rect x="0" y="0" width="100" height="100" fill="#6b7280" rx="5" />
                <text x="50" y="120" textAnchor="middle" fill="var(--text-primary)" fontSize="11">完整岩石</text>
              </g>

              <text x="280" y="130" textAnchor="middle" fill="var(--text-secondary)" fontSize="20">→</text>

              <g transform="translate(350, 80)">
                <rect x="0" y="0" width="45" height="45" fill="#9ca3af" rx="3" />
                <rect x="50" y="0" width="40" height="40" fill="#9ca3af" rx="3" />
                <rect x="0" y="50" width="35" height="35" fill="#9ca3af" rx="3" />
                <rect x="40" y="45" width="50" height="50" fill="#9ca3af" rx="3" />
                <text x="50" y="120" textAnchor="middle" fill="var(--text-primary)" fontSize="11">风化碎屑</text>
              </g>

              {/* 风化因素 */}
              <g transform="translate(200, 30)">
                <text fontSize="12" fill="var(--text-secondary)">☀️ 温度变化</text>
              </g>
              <g transform="translate(200, 180)">
                <text fontSize="12" fill="var(--text-secondary)">💧 水的作用</text>
              </g>
              <g transform="translate(200, 200)">
                <text fontSize="12" fill="var(--text-secondary)">🌱 生物作用</text>
              </g>
            </g>
          )}

          {selectedForce === 'erosion' && (
            <g>
              {/* 流水侵蚀 - V形谷 */}
              <g transform="translate(50, 50)">
                <path d="M 0 0 L 60 150 L 120 0" fill="#854d0e" />
                <path d="M 40 0 L 60 100 L 80 0" fill="#0ea5e9" opacity="0.7" />
                <text x="60" y="170" textAnchor="middle" fill="var(--text-primary)" fontSize="10">V形谷</text>
                <text x="60" y="185" textAnchor="middle" fill="var(--text-secondary)" fontSize="9">流水侵蚀</text>
              </g>

              {/* 风蚀蘑菇 */}
              <g transform="translate(200, 80)">
                <ellipse cx="50" cy="20" rx="45" ry="25" fill="#9ca3af" />
                <rect x="35" y="20" width="30" height="80" fill="#6b7280" />
                <text x="50" y="120" textAnchor="middle" fill="var(--text-primary)" fontSize="10">风蚀蘑菇</text>
                <text x="50" y="135" textAnchor="middle" fill="var(--text-secondary)" fontSize="9">风力侵蚀</text>
                {/* 风 */}
                <path d="M -20 50 L 20 50" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrowTeal)" />
              </g>

              {/* U形谷 */}
              <g transform="translate(350, 50)">
                <path d="M 0 0 L 0 100 Q 60 150 120 100 L 120 0" fill="#854d0e" />
                <path d="M 20 0 L 20 80 Q 60 110 100 80 L 100 0" fill="#e0f2fe" />
                <text x="60" y="170" textAnchor="middle" fill="var(--text-primary)" fontSize="10">U形谷</text>
                <text x="60" y="185" textAnchor="middle" fill="var(--text-secondary)" fontSize="9">冰川侵蚀</text>
              </g>

              {/* 海蚀崖 */}
              <g transform="translate(500, 80)">
                <path d="M 0 100 L 0 20 L 60 20 L 60 100" fill="#854d0e" />
                <rect x="0" y="60" width="80" height="40" fill="#0ea5e9" opacity="0.7" />
                <text x="40" y="120" textAnchor="middle" fill="var(--text-primary)" fontSize="10">海蚀崖</text>
                <text x="40" y="135" textAnchor="middle" fill="var(--text-secondary)" fontSize="9">海浪侵蚀</text>
              </g>
            </g>
          )}

          {selectedForce === 'transport' && (
            <g>
              {/* 河流搬运 */}
              <path d="M 50 140 Q 200 100 350 140 Q 500 180 600 140" fill="none" stroke="#0ea5e9" strokeWidth="20" opacity="0.5" />
              <path d="M 50 140 Q 200 100 350 140 Q 500 180 600 140" fill="none" stroke="#0ea5e9" strokeWidth="3" />

              {/* 泥沙颗粒 */}
              {[...Array(15)].map((_, i) => (
                <circle
                  key={i}
                  cx={100 + i * 30 + Math.random() * 20}
                  cy={130 + Math.random() * 20}
                  r={2 + Math.random() * 3}
                  fill="#92400e"
                >
                  <animate
                    attributeName="cx"
                    values={`${100 + i * 30};${150 + i * 30};${100 + i * 30}`}
                    dur={`${2 + Math.random()}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}

              <text x="300" y="80" textAnchor="middle" fill="var(--text-primary)" fontSize="14">河流搬运泥沙</text>
              <text x="300" y="200" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">流速快→搬运能力强→颗粒大</text>
              <text x="300" y="220" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">流速慢→搬运能力弱→颗粒小</text>
            </g>
          )}

          {selectedForce === 'deposition' && (
            <g>
              {/* 冲积扇 */}
              <g transform="translate(50, 50)">
                <path d="M 60 0 L 0 150 L 120 150 Z" fill="#d4a574" />
                <path d="M 60 0 L 60 50" stroke="#0ea5e9" strokeWidth="3" />
                <text x="60" y="170" textAnchor="middle" fill="var(--text-primary)" fontSize="10">冲积扇</text>
                <text x="60" y="185" textAnchor="middle" fill="var(--text-secondary)" fontSize="9">山口处</text>
              </g>

              {/* 三角洲 */}
              <g transform="translate(200, 80)">
                <path d="M 50 0 L 0 100 L 100 100 Z" fill="#d4a574" />
                <rect x="0" y="100" width="100" height="30" fill="#0ea5e9" opacity="0.5" />
                <path d="M 50 0 L 50 50" stroke="#0ea5e9" strokeWidth="3" />
                <text x="50" y="150" textAnchor="middle" fill="var(--text-primary)" fontSize="10">三角洲</text>
                <text x="50" y="165" textAnchor="middle" fill="var(--text-secondary)" fontSize="9">河流入海口</text>
              </g>

              {/* 沙丘 */}
              <g transform="translate(350, 100)">
                <path d="M 0 80 Q 30 30 60 80 Q 90 30 120 80" fill="#eab308" />
                <text x="60" y="100" textAnchor="middle" fill="var(--text-primary)" fontSize="10">沙丘</text>
                <text x="60" y="115" textAnchor="middle" fill="var(--text-secondary)" fontSize="9">风力沉积</text>
              </g>

              {/* 黄土高原 */}
              <g transform="translate(500, 60)">
                <rect x="0" y="50" width="80" height="80" fill="#d4a574" />
                <path d="M 0 50 Q 20 30 40 50 Q 60 30 80 50" fill="#d4a574" />
                <text x="40" y="150" textAnchor="middle" fill="var(--text-primary)" fontSize="10">黄土高原</text>
                <text x="40" y="165" textAnchor="middle" fill="var(--text-secondary)" fontSize="9">风力沉积</text>
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

      {/* 外力作用选择 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {(Object.keys(forces) as Array<keyof typeof forces>).map(key => (
          <button
            key={key}
            onClick={() => setSelectedForce(key)}
            className={`p-3 rounded-lg text-center transition-colors ${
              selectedForce === key
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <div className="font-medium">{forces[key].name}</div>
          </button>
        ))}
      </div>

      {/* 当前作用详情 */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
        <h4 className="font-bold text-[var(--text-primary)] mb-2">{current.name}</h4>
        <p className="text-sm text-[var(--text-secondary)] mb-3">{current.description}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-[var(--text-tertiary)] text-sm">类型：</span>
            <ul className="mt-1 space-y-1">
              {current.types.map((t, i) => (
                <li key={i} className="text-sm text-[var(--text-primary)]">• {t}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-[var(--text-tertiary)] text-sm">实例：</span>
            <p className="text-sm text-[var(--text-primary)] mt-1">{current.examples}</p>
          </div>
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>外力作用能量来源：太阳辐射能、重力能</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>外力作用过程：风化→侵蚀→搬运→沉积→固结成岩</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>外力作用总体使地表趋于平坦</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
