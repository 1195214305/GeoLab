import { useState } from 'react'

export default function IndustryLocationSimulation() {
  const [selectedType, setSelectedType] = useState<'raw' | 'market' | 'labor' | 'tech'>('raw')

  const types = {
    raw: { name: '原料导向型', factor: '原料', examples: '钢铁、制糖、水产加工', reason: '原料不便运输或运输成本高' },
    market: { name: '市场导向型', factor: '市场', examples: '啤酒、家具、印刷', reason: '产品不便运输或需要快速响应市场' },
    labor: { name: '劳动力导向型', factor: '劳动力', examples: '服装、电子装配', reason: '需要大量廉价劳动力' },
    tech: { name: '技术导向型', factor: '技术', examples: '航空航天、集成电路', reason: '需要高技术人才和研发能力' },
  }

  const current = types[selectedType]

  return (
    <div className="space-y-6">
      {/* 工业区位因素示意图 */}
      <div className="relative bg-[var(--bg-primary)] rounded-xl p-6 min-h-[280px]">
        <svg className="w-full h-full" viewBox="0 0 600 250" preserveAspectRatio="xMidYMid meet">
          {/* 工厂 */}
          <g transform="translate(300, 125)">
            <rect x="-60" y="-40" width="120" height="80" fill="#6b7280" rx="5" />
            <rect x="-40" y="-60" width="20" height="20" fill="#9ca3af" />
            <rect x="20" y="-70" width="15" height="30" fill="#9ca3af" />
            <text y="60" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="bold">工业生产</text>
          </g>

          {/* 原料 */}
          <g transform="translate(80, 60)" className={selectedType === 'raw' ? 'opacity-100' : 'opacity-40'}>
            <circle r="35" fill="#854d0e" />
            <text y="5" textAnchor="middle" fill="white" fontSize="11">原料</text>
          </g>
          <line x1="115" y1="60" x2="240" y2="100" stroke="#854d0e" strokeWidth={selectedType === 'raw' ? 4 : 2} />

          {/* 市场 */}
          <g transform="translate(520, 60)" className={selectedType === 'market' ? 'opacity-100' : 'opacity-40'}>
            <circle r="35" fill="#3b82f6" />
            <text y="5" textAnchor="middle" fill="white" fontSize="11">市场</text>
          </g>
          <line x1="485" y1="60" x2="360" y2="100" stroke="#3b82f6" strokeWidth={selectedType === 'market' ? 4 : 2} />

          {/* 劳动力 */}
          <g transform="translate(80, 190)" className={selectedType === 'labor' ? 'opacity-100' : 'opacity-40'}>
            <circle r="35" fill="#22c55e" />
            <text y="5" textAnchor="middle" fill="white" fontSize="11">劳动力</text>
          </g>
          <line x1="115" y1="190" x2="240" y2="150" stroke="#22c55e" strokeWidth={selectedType === 'labor' ? 4 : 2} />

          {/* 技术 */}
          <g transform="translate(520, 190)" className={selectedType === 'tech' ? 'opacity-100' : 'opacity-40'}>
            <circle r="35" fill="#8b5cf6" />
            <text y="5" textAnchor="middle" fill="white" fontSize="11">技术</text>
          </g>
          <line x1="485" y1="190" x2="360" y2="150" stroke="#8b5cf6" strokeWidth={selectedType === 'tech' ? 4 : 2} />

          {/* 其他因素 */}
          <g transform="translate(300, 30)" opacity="0.5">
            <text textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">交通、能源、政策、环境...</text>
          </g>
        </svg>
      </div>

      {/* 工业类型选择 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {(Object.keys(types) as Array<keyof typeof types>).map(key => (
          <button
            key={key}
            onClick={() => setSelectedType(key)}
            className={`p-3 rounded-lg text-center transition-colors ${
              selectedType === key
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <div className="font-medium text-sm">{types[key].name}</div>
          </button>
        ))}
      </div>

      {/* 当前类型详情 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="info-card">
          <div className="info-card-title">工业类型</div>
          <div className="text-lg font-bold text-[var(--accent)]">{current.name}</div>
        </div>
        <div className="info-card">
          <div className="info-card-title">主导因素</div>
          <div className="text-lg font-bold text-[var(--text-primary)]">{current.factor}</div>
        </div>
        <div className="info-card">
          <div className="info-card-title">典型工业</div>
          <div className="text-sm text-[var(--text-secondary)]">{current.examples}</div>
        </div>
        <div className="info-card">
          <div className="info-card-title">布局原因</div>
          <div className="text-sm text-[var(--text-secondary)]">{current.reason}</div>
        </div>
      </div>

      {/* 工业布局原则 */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">工业布局原则</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-[var(--text-tertiary)] text-sm">经济原则：</span>
            <p className="text-sm text-[var(--text-primary)]">降低成本、提高效益</p>
          </div>
          <div>
            <span className="text-[var(--text-tertiary)] text-sm">环境原则：</span>
            <p className="text-sm text-[var(--text-primary)]">污染企业远离居民区、考虑风向水源</p>
          </div>
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>工业区位因素：原料、市场、劳动力、技术、交通、能源、政策等</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>主导因素决定工业布局的主要方向</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>产业转移：从发达地区向欠发达地区转移，追求更低成本</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
