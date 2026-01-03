import { useState } from 'react'

export default function PopulationMigrationSimulation() {
  const [selectedFactor, setSelectedFactor] = useState<'push' | 'pull'>('push')

  const factors = {
    push: {
      name: '推力因素',
      items: ['自然灾害', '战争动乱', '经济落后', '就业困难', '环境恶化'],
      color: '#ef4444',
    },
    pull: {
      name: '拉力因素',
      items: ['经济发达', '就业机会多', '生活条件好', '教育医疗优', '政策优惠'],
      color: '#22c55e',
    },
  }

  return (
    <div className="space-y-6">
      {/* 演示区域 */}
      <div className="relative bg-[var(--bg-primary)] rounded-xl p-6 min-h-[300px]">
        <svg className="w-full h-full" viewBox="0 0 600 280" preserveAspectRatio="xMidYMid meet">
          <text x="300" y="25" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="bold">人口迁移推拉理论</text>

          {/* 迁出地 */}
          <g transform="translate(80, 80)">
            <circle r="70" fill="#fecaca" stroke="#ef4444" strokeWidth="2" />
            <text y="-50" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="bold">迁出地</text>
            <text y="5" textAnchor="middle" fill="#ef4444" fontSize="11">推力</text>
            {/* 人口流出箭头 */}
            <g>
              <circle cx="-20" cy="-20" r="8" fill="#6b7280" />
              <circle cx="10" cy="15" r="8" fill="#6b7280" />
              <circle cx="-15" cy="25" r="8" fill="#6b7280" />
            </g>
          </g>

          {/* 迁入地 */}
          <g transform="translate(520, 80)">
            <circle r="70" fill="#bbf7d0" stroke="#22c55e" strokeWidth="2" />
            <text y="-50" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="bold">迁入地</text>
            <text y="5" textAnchor="middle" fill="#22c55e" fontSize="11">拉力</text>
            {/* 人口流入 */}
            <g>
              <circle cx="-10" cy="-15" r="8" fill="#374151" />
              <circle cx="15" cy="10" r="8" fill="#374151" />
              <circle cx="-5" cy="30" r="8" fill="#374151" />
              <circle cx="20" cy="-25" r="8" fill="#374151" />
            </g>
          </g>

          {/* 迁移箭头 */}
          <g>
            <path d="M 180 80 Q 300 40 420 80" fill="none" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#arrowMig)" />
            <path d="M 180 100 Q 300 140 420 100" fill="none" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#arrowMig)" />
            <text x="300" y="70" textAnchor="middle" fill="var(--accent)" fontSize="11">人口迁移</text>
          </g>

          {/* 中间障碍 */}
          <g transform="translate(300, 180)">
            <rect x="-60" y="0" width="120" height="40" fill="var(--bg-secondary)" stroke="var(--border-color)" rx="5" />
            <text y="25" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">中间障碍因素</text>
          </g>
          <text x="300" y="240" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">距离、政策、文化差异等</text>

          <defs>
            <marker id="arrowMig" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* 因素选择 */}
      <div className="grid grid-cols-2 gap-4">
        {(Object.keys(factors) as Array<keyof typeof factors>).map(key => (
          <button
            key={key}
            onClick={() => setSelectedFactor(key)}
            className={`p-4 rounded-lg text-left transition-all ${
              selectedFactor === key ? 'ring-2 ring-[var(--accent)]' : ''
            }`}
            style={{ backgroundColor: factors[key].color + '20' }}
          >
            <div className="font-medium text-[var(--text-primary)] mb-2">{factors[key].name}</div>
            <ul className="space-y-1">
              {factors[key].items.map((item, i) => (
                <li key={i} className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: factors[key].color }} />
                  {item}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      {/* 迁移类型 */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">人口迁移类型</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-[var(--text-tertiary)] text-sm">按地理范围：</span>
            <p className="text-[var(--text-primary)]">国际迁移、国内迁移</p>
          </div>
          <div>
            <span className="text-[var(--text-tertiary)] text-sm">按迁移方向：</span>
            <p className="text-[var(--text-primary)]">城乡迁移、城城迁移</p>
          </div>
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>经济因素是人口迁移的主要因素</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>我国人口迁移：改革开放前政策主导，改革开放后经济主导</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>人口迁移影响：对迁出地减轻压力，对迁入地提供劳动力</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
