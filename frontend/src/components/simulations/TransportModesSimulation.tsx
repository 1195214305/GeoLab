import { useState } from 'react'

export default function TransportModesSimulation() {
  const [selectedMode, setSelectedMode] = useState<'rail' | 'road' | 'water' | 'air' | 'pipe'>('rail')

  const modes = {
    rail: {
      name: '铁路运输',
      icon: '🚂',
      advantages: '运量大、速度快、连续性强、成本较低',
      disadvantages: '建设周期长、投资大、灵活性差',
      suitable: '大宗货物、长距离运输',
      color: '#ef4444',
    },
    road: {
      name: '公路运输',
      icon: '🚛',
      advantages: '灵活性强、门到门、适应性好',
      disadvantages: '运量小、能耗高、污染大',
      suitable: '短途、小批量、鲜活货物',
      color: '#22c55e',
    },
    water: {
      name: '水路运输',
      icon: '🚢',
      advantages: '运量最大、成本最低',
      disadvantages: '速度慢、受自然条件限制',
      suitable: '大宗笨重货物、远洋运输',
      color: '#3b82f6',
    },
    air: {
      name: '航空运输',
      icon: '✈️',
      advantages: '速度最快、效率高',
      disadvantages: '运量小、成本最高、受天气影响',
      suitable: '贵重、急需、鲜活货物',
      color: '#8b5cf6',
    },
    pipe: {
      name: '管道运输',
      icon: '🔧',
      advantages: '连续性强、损耗小、安全',
      disadvantages: '灵活性差、只能运输特定货物',
      suitable: '石油、天然气、水',
      color: '#f97316',
    },
  }

  const current = modes[selectedMode]

  return (
    <div className="space-y-6">
      {/* 运输方式对比图 */}
      <div className="relative bg-[var(--bg-primary)] rounded-xl p-6 min-h-[250px]">
        <svg className="w-full h-full" viewBox="0 0 600 220" preserveAspectRatio="xMidYMid meet">
          <text x="300" y="25" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="bold">五种交通运输方式</text>

          {/* 运输方式图标 */}
          {Object.entries(modes).map(([key, mode], index) => {
            const x = 80 + index * 110
            const isSelected = selectedMode === key
            return (
              <g
                key={key}
                transform={`translate(${x}, 100)`}
                className="cursor-pointer"
                onClick={() => setSelectedMode(key as keyof typeof modes)}
              >
                <circle
                  r={isSelected ? 45 : 40}
                  fill={mode.color}
                  opacity={isSelected ? 1 : 0.5}
                  stroke={isSelected ? 'var(--text-primary)' : 'none'}
                  strokeWidth="3"
                />
                <text y="8" textAnchor="middle" fontSize="28">{mode.icon}</text>
                <text y="70" textAnchor="middle" fill="var(--text-primary)" fontSize="11">{mode.name}</text>
              </g>
            )
          })}

          {/* 特点对比 */}
          <g transform="translate(50, 180)">
            <text fill="var(--text-tertiary)" fontSize="10">
              运量: 水运 {'>'} 铁路 {'>'} 公路 {'>'} 管道 {'>'} 航空
            </text>
          </g>
          <g transform="translate(350, 180)">
            <text fill="var(--text-tertiary)" fontSize="10">
              速度: 航空 {'>'} 铁路 {'>'} 公路 {'>'} 水运 {'>'} 管道
            </text>
          </g>
        </svg>
      </div>

      {/* 当前运输方式详情 */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4 border-l-4" style={{ borderColor: current.color }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{current.icon}</span>
          <div>
            <h4 className="font-bold text-[var(--text-primary)]">{current.name}</h4>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="text-[var(--text-tertiary)] text-sm">优点：</span>
            <p className="text-sm text-[var(--text-primary)]">{current.advantages}</p>
          </div>
          <div>
            <span className="text-[var(--text-tertiary)] text-sm">缺点：</span>
            <p className="text-sm text-[var(--text-primary)]">{current.disadvantages}</p>
          </div>
          <div>
            <span className="text-[var(--text-tertiary)] text-sm">适用：</span>
            <p className="text-sm text-[var(--text-primary)]">{current.suitable}</p>
          </div>
        </div>
      </div>

      {/* 运输方式选择原则 */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">运输方式选择原则</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { factor: '货物性质', desc: '贵重→航空，大宗→水运' },
            { factor: '运输距离', desc: '短途→公路，长途→铁路/水运' },
            { factor: '运输时效', desc: '急需→航空，一般→铁路' },
            { factor: '运输成本', desc: '低成本→水运，高价值→航空' },
          ].map(item => (
            <div key={item.factor} className="p-3 bg-[var(--bg-tertiary)] rounded-lg">
              <div className="font-medium text-[var(--text-primary)] text-sm">{item.factor}</div>
              <div className="text-xs text-[var(--text-tertiary)]">{item.desc}</div>
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
            <span>现代交通运输发展趋势：高速化、大型化、专业化、网络化</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>交通运输布局影响因素：经济、社会、技术、自然条件</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>交通枢纽：多种运输方式交汇的地点，如港口、铁路枢纽</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
