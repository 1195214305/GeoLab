import { useState } from 'react'

export default function AgricultureLocationSimulation() {
  const [selectedFactor, setSelectedFactor] = useState<'natural' | 'social'>('natural')

  const factors = {
    natural: {
      name: '自然因素',
      items: [
        { name: '气候', desc: '光照、热量、降水', icon: '☀️' },
        { name: '地形', desc: '平原、山地、坡度', icon: '⛰️' },
        { name: '土壤', desc: '肥力、酸碱度', icon: '🌱' },
        { name: '水源', desc: '灌溉条件', icon: '💧' },
      ],
    },
    social: {
      name: '社会经济因素',
      items: [
        { name: '市场', desc: '需求量、距离', icon: '🏪' },
        { name: '交通', desc: '运输条件', icon: '🚛' },
        { name: '劳动力', desc: '数量、素质', icon: '👷' },
        { name: '政策', desc: '补贴、限制', icon: '📋' },
        { name: '技术', desc: '机械化、良种', icon: '🔬' },
      ],
    },
  }

  const current = factors[selectedFactor]

  return (
    <div className="space-y-6">
      {/* 农业区位因素示意图 */}
      <div className="relative bg-gradient-to-b from-sky-200 to-green-200 rounded-xl p-6 min-h-[280px]">
        <svg className="w-full h-full" viewBox="0 0 600 250" preserveAspectRatio="xMidYMid meet">
          {/* 农田 */}
          <rect x="200" y="100" width="200" height="120" fill="#22c55e" rx="10" />
          <text x="300" y="165" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">农业生产</text>

          {/* 自然因素 */}
          <g transform="translate(50, 50)">
            <circle r="30" fill="#fbbf24" opacity="0.8" />
            <text y="5" textAnchor="middle" fill="white" fontSize="10">气候</text>
          </g>
          <line x1="80" y1="50" x2="200" y2="130" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5,3" />

          <g transform="translate(50, 150)">
            <circle r="25" fill="#6b7280" opacity="0.8" />
            <text y="5" textAnchor="middle" fill="white" fontSize="10">地形</text>
          </g>
          <line x1="75" y1="150" x2="200" y2="160" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,3" />

          <g transform="translate(100, 220)">
            <circle r="25" fill="#854d0e" opacity="0.8" />
            <text y="5" textAnchor="middle" fill="white" fontSize="10">土壤</text>
          </g>
          <line x1="125" y1="220" x2="200" y2="200" stroke="#854d0e" strokeWidth="2" strokeDasharray="5,3" />

          {/* 社会经济因素 */}
          <g transform="translate(550, 50)">
            <circle r="30" fill="#3b82f6" opacity="0.8" />
            <text y="5" textAnchor="middle" fill="white" fontSize="10">市场</text>
          </g>
          <line x1="520" y1="50" x2="400" y2="130" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,3" />

          <g transform="translate(550, 130)">
            <circle r="25" fill="#ef4444" opacity="0.8" />
            <text y="5" textAnchor="middle" fill="white" fontSize="10">交通</text>
          </g>
          <line x1="525" y1="130" x2="400" y2="160" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,3" />

          <g transform="translate(520, 210)">
            <circle r="25" fill="#8b5cf6" opacity="0.8" />
            <text y="5" textAnchor="middle" fill="white" fontSize="10">技术</text>
          </g>
          <line x1="495" y1="210" x2="400" y2="190" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,3" />
        </svg>
      </div>

      {/* 因素类型选择 */}
      <div className="grid grid-cols-2 gap-4">
        {(Object.keys(factors) as Array<keyof typeof factors>).map(key => (
          <button
            key={key}
            onClick={() => setSelectedFactor(key)}
            className={`p-4 rounded-lg text-center transition-colors ${
              selectedFactor === key
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <div className="font-medium">{factors[key].name}</div>
          </button>
        ))}
      </div>

      {/* 因素详情 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {current.items.map(item => (
          <div key={item.name} className="p-4 bg-[var(--bg-secondary)] rounded-lg text-center">
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="font-medium text-[var(--text-primary)]">{item.name}</div>
            <div className="text-xs text-[var(--text-tertiary)]">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* 农业地域类型 */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">主要农业地域类型</h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: '水稻种植业', region: '东亚、东南亚、南亚', feature: '劳动密集、单产高' },
            { name: '商品谷物农业', region: '美国、加拿大、澳大利亚', feature: '机械化、商品率高' },
            { name: '混合农业', region: '西欧、澳大利亚', feature: '种植业+畜牧业' },
            { name: '乳畜业', region: '北美五大湖、西欧', feature: '靠近市场、集约化' },
          ].map(type => (
            <div key={type.name} className="p-3 bg-[var(--bg-tertiary)] rounded-lg">
              <div className="font-medium text-[var(--text-primary)]">{type.name}</div>
              <div className="text-xs text-[var(--text-tertiary)]">{type.region}</div>
              <div className="text-xs text-[var(--accent)]">{type.feature}</div>
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
            <span>自然因素是农业生产的基础，社会经济因素影响农业类型和规模</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>市场需求决定农业生产的类型和规模，是最主要的社会经济因素</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>技术进步可以改变自然条件的限制，扩大农业生产范围</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
