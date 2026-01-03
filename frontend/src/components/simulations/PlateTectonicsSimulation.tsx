import { useState } from 'react'

export default function PlateTectonicsSimulation() {
  const [selectedBoundary, setSelectedBoundary] = useState<'divergent' | 'convergent' | 'transform'>('divergent')

  const boundaries = {
    divergent: {
      name: '生长边界（张裂）',
      description: '板块相互分离，岩浆上涌形成新地壳',
      examples: '大西洋中脊、东非大裂谷',
      landforms: '裂谷、海岭、火山',
    },
    convergent: {
      name: '消亡边界（碰撞）',
      description: '板块相互挤压，一个板块俯冲到另一个下面',
      examples: '喜马拉雅山脉、日本海沟',
      landforms: '山脉、海沟、岛弧',
    },
    transform: {
      name: '转换边界（错动）',
      description: '板块相互水平错动',
      examples: '圣安德烈斯断层',
      landforms: '断层、地震带',
    },
  }

  const current = boundaries[selectedBoundary]

  return (
    <div className="space-y-6">
      {/* 演示区域 */}
      <div className="relative bg-[var(--bg-primary)] rounded-xl p-6 min-h-[350px]">
        <svg className="w-full h-full" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
          {selectedBoundary === 'divergent' && (
            <g>
              {/* 地幔 */}
              <rect x="0" y="200" width="600" height="100" fill="#dc2626" opacity="0.3" />
              <text x="300" y="260" textAnchor="middle" fill="#dc2626" fontSize="14">地幔（软流层）</text>

              {/* 左侧板块 */}
              <rect x="50" y="120" width="200" height="80" fill="#6b7280" />
              <text x="150" y="165" textAnchor="middle" fill="white" fontSize="12">板块A</text>

              {/* 右侧板块 */}
              <rect x="350" y="120" width="200" height="80" fill="#6b7280" />
              <text x="450" y="165" textAnchor="middle" fill="white" fontSize="12">板块B</text>

              {/* 裂谷/海岭 */}
              <path d="M 250 120 L 300 80 L 350 120" fill="#ef4444" />
              <text x="300" y="70" textAnchor="middle" fill="#ef4444" fontSize="11">海岭/裂谷</text>

              {/* 岩浆上涌 */}
              <path d="M 280 250 Q 300 180 320 250" fill="none" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowRed)" />
              <path d="M 260 250 Q 300 200 340 250" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.5" />
              <text x="300" y="230" textAnchor="middle" fill="#ef4444" fontSize="10">岩浆上涌</text>

              {/* 移动方向 */}
              <path d="M 200 160 L 100 160" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#arrowTeal)" />
              <path d="M 400 160 L 500 160" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#arrowTeal)" />
              <text x="150" y="145" fill="var(--accent)" fontSize="10">← 分离</text>
              <text x="450" y="145" fill="var(--accent)" fontSize="10">分离 →</text>
            </g>
          )}

          {selectedBoundary === 'convergent' && (
            <g>
              {/* 地幔 */}
              <rect x="0" y="220" width="600" height="80" fill="#dc2626" opacity="0.3" />

              {/* 大陆板块 */}
              <path d="M 50 150 L 280 150 L 300 100 L 320 150 L 350 150 L 350 220 L 50 220 Z" fill="#22c55e" />
              <text x="180" y="190" fill="white" fontSize="12">大陆板块</text>

              {/* 大洋板块（俯冲） */}
              <path d="M 350 150 L 550 150 L 550 180 L 400 180 Q 350 200 320 280" fill="#3b82f6" />
              <text x="480" y="170" fill="white" fontSize="12">大洋板块</text>

              {/* 海沟 */}
              <path d="M 340 150 L 360 180 L 340 180 Z" fill="#1e3a5f" />
              <text x="380" y="145" fill="#1e3a5f" fontSize="10">海沟</text>

              {/* 山脉 */}
              <path d="M 280 150 L 300 100 L 320 150" fill="#854d0e" />
              <text x="300" y="90" textAnchor="middle" fill="#854d0e" fontSize="10">山脉</text>

              {/* 火山 */}
              <path d="M 240 150 L 250 130 L 260 150" fill="#ef4444" />
              <circle cx="250" cy="125" r="5" fill="#fbbf24" />
              <text x="250" y="115" textAnchor="middle" fill="#ef4444" fontSize="9">火山</text>

              {/* 移动方向 */}
              <path d="M 500 165 L 380 165" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#arrowTeal)" />
              <text x="440" y="155" fill="var(--accent)" fontSize="10">俯冲 →</text>
            </g>
          )}

          {selectedBoundary === 'transform' && (
            <g>
              {/* 地幔 */}
              <rect x="0" y="220" width="600" height="80" fill="#dc2626" opacity="0.3" />

              {/* 左侧板块 */}
              <rect x="50" y="100" width="230" height="120" fill="#6b7280" />
              <text x="165" y="165" textAnchor="middle" fill="white" fontSize="12">板块A</text>

              {/* 右侧板块 */}
              <rect x="320" y="100" width="230" height="120" fill="#9ca3af" />
              <text x="435" y="165" textAnchor="middle" fill="white" fontSize="12">板块B</text>

              {/* 断层线 */}
              <line x1="280" y1="80" x2="320" y2="240" stroke="#ef4444" strokeWidth="4" />
              <text x="340" y="160" fill="#ef4444" fontSize="11">转换断层</text>

              {/* 错动方向 */}
              <path d="M 200 130 L 200 100" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#arrowTeal)" />
              <path d="M 400 190 L 400 220" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#arrowTeal)" />
              <text x="160" y="115" fill="var(--accent)" fontSize="10">↑</text>
              <text x="420" y="210" fill="var(--accent)" fontSize="10">↓</text>

              {/* 地震标记 */}
              <g transform="translate(300, 160)">
                <circle r="15" fill="#fbbf24" opacity="0.5">
                  <animate attributeName="r" values="15;25;15" dur="1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="1s" repeatCount="indefinite" />
                </circle>
                <text y="5" textAnchor="middle" fontSize="12">⚡</text>
              </g>
              <text x="300" y="130" textAnchor="middle" fill="#fbbf24" fontSize="10">地震多发</text>
            </g>
          )}

          {/* 箭头定义 */}
          <defs>
            <marker id="arrowRed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
            </marker>
            <marker id="arrowTeal" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* 边界类型选择 */}
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(boundaries) as Array<keyof typeof boundaries>).map(key => (
          <button
            key={key}
            onClick={() => setSelectedBoundary(key)}
            className={`p-3 rounded-lg text-center transition-colors ${
              selectedBoundary === key
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <div className="font-medium text-sm">{boundaries[key].name}</div>
          </button>
        ))}
      </div>

      {/* 当前边界详情 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="info-card col-span-2">
          <div className="info-card-title">运动特征</div>
          <div className="text-sm text-[var(--text-primary)]">{current.description}</div>
        </div>
        <div className="info-card">
          <div className="info-card-title">典型实例</div>
          <div className="text-sm text-[var(--text-primary)]">{current.examples}</div>
        </div>
        <div className="info-card">
          <div className="info-card-title">形成地貌</div>
          <div className="text-sm text-[var(--text-primary)]">{current.landforms}</div>
        </div>
      </div>

      {/* 六大板块 */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">六大板块</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {['亚欧板块', '非洲板块', '印度洋板块', '太平洋板块', '美洲板块', '南极洲板块'].map(plate => (
            <div key={plate} className="px-3 py-2 bg-[var(--bg-tertiary)] rounded-lg text-sm text-[var(--text-primary)] text-center">
              {plate}
            </div>
          ))}
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>板块构造学说：岩石圈分为六大板块，漂浮在软流层上运动</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>板块边界是地震、火山活动集中的地带</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>生长边界：形成海岭、裂谷；消亡边界：形成山脉、海沟</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>环太平洋地震带和地中海-喜马拉雅地震带是主要地震带</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
