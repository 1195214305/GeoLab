import { useState } from 'react'

export default function RiverFeaturesSimulation() {
  const [selectedFeature, setSelectedFeature] = useState<'flow' | 'level' | 'sediment' | 'ice'>('flow')

  const features = {
    flow: { name: '流量', unit: 'm³/s', description: '单位时间内通过河流某断面的水量' },
    level: { name: '水位', unit: 'm', description: '河流水面相对于某一基准面的高度' },
    sediment: { name: '含沙量', unit: 'kg/m³', description: '单位体积水中所含泥沙的重量' },
    ice: { name: '结冰期', unit: '月', description: '河流封冻的时间长度' },
  }

  const rivers = [
    { name: '长江', flow: '大', level: '夏高冬低', sediment: '较小', ice: '无', type: '亚热带季风' },
    { name: '黄河', flow: '较小', level: '夏高冬低', sediment: '大', ice: '有', type: '温带季风' },
    { name: '珠江', flow: '大', level: '夏高冬低', sediment: '小', ice: '无', type: '亚热带季风' },
    { name: '松花江', flow: '较小', level: '夏高冬低', sediment: '较小', ice: '长', type: '温带季风' },
  ]

  return (
    <div className="space-y-6">
      {/* 演示区域 - 河流水文特征示意 */}
      <div className="relative bg-gradient-to-b from-sky-200 to-blue-400 rounded-xl p-6 min-h-[300px]">
        <svg className="w-full h-full" viewBox="0 0 600 250" preserveAspectRatio="xMidYMid meet">
          {/* 河岸 */}
          <path d="M 0 100 Q 150 80 300 100 Q 450 120 600 100 L 600 250 L 0 250 Z" fill="#22c55e" opacity="0.7" />
          <path d="M 0 150 Q 150 170 300 150 Q 450 130 600 150 L 600 250 L 0 250 Z" fill="#22c55e" opacity="0.7" />

          {/* 河流 */}
          <path d="M 0 100 Q 150 80 300 100 Q 450 120 600 100 L 600 150 Q 450 130 300 150 Q 150 170 0 150 Z" fill="#0ea5e9" />

          {/* 水流方向 */}
          <path d="M 100 125 L 200 125" stroke="white" strokeWidth="2" markerEnd="url(#arrowWhite)" />
          <path d="M 300 125 L 400 125" stroke="white" strokeWidth="2" markerEnd="url(#arrowWhite)" />
          <path d="M 500 125 L 580 125" stroke="white" strokeWidth="2" markerEnd="url(#arrowWhite)" />
          <text x="300" y="145" textAnchor="middle" fill="white" fontSize="12">水流方向 →</text>

          {/* 水位标尺 */}
          <g transform="translate(50, 80)">
            <line x1="0" y1="0" x2="0" y2="90" stroke="var(--text-primary)" strokeWidth="2" />
            {[0, 1, 2, 3].map(i => (
              <g key={i}>
                <line x1="-5" y1={i * 30} x2="5" y2={i * 30} stroke="var(--text-primary)" strokeWidth="2" />
                <text x="-15" y={i * 30 + 4} fill="var(--text-primary)" fontSize="10" textAnchor="end">{3 - i}m</text>
              </g>
            ))}
            <text x="0" y="-10" textAnchor="middle" fill="var(--text-primary)" fontSize="10">水位</text>
          </g>

          {/* 泥沙示意 */}
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx={100 + Math.random() * 400}
              cy={110 + Math.random() * 30}
              r={1 + Math.random() * 2}
              fill="#92400e"
              opacity="0.6"
            />
          ))}

          {/* 箭头定义 */}
          <defs>
            <marker id="arrowWhite" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="white" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* 水文特征选择 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {(Object.keys(features) as Array<keyof typeof features>).map(key => (
          <button
            key={key}
            onClick={() => setSelectedFeature(key)}
            className={`p-3 rounded-lg text-center transition-colors ${
              selectedFeature === key
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <div className="font-medium">{features[key].name}</div>
            <div className="text-xs opacity-80">{features[key].unit}</div>
          </button>
        ))}
      </div>

      {/* 特征说明 */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-2">{features[selectedFeature].name}</h4>
        <p className="text-sm text-[var(--text-secondary)]">{features[selectedFeature].description}</p>
      </div>

      {/* 中国主要河流对比 */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--bg-secondary)]">
              <th className="p-3 text-left text-[var(--text-primary)]">河流</th>
              <th className="p-3 text-left text-[var(--text-primary)]">流量</th>
              <th className="p-3 text-left text-[var(--text-primary)]">水位变化</th>
              <th className="p-3 text-left text-[var(--text-primary)]">含沙量</th>
              <th className="p-3 text-left text-[var(--text-primary)]">结冰期</th>
            </tr>
          </thead>
          <tbody className="text-[var(--text-secondary)]">
            {rivers.map(river => (
              <tr key={river.name} className="border-b border-[var(--border-color)]">
                <td className="p-3 font-medium text-[var(--text-primary)]">{river.name}</td>
                <td className="p-3">{river.flow}</td>
                <td className="p-3">{river.level}</td>
                <td className="p-3">{river.sediment}</td>
                <td className="p-3">{river.ice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>流量大小取决于：流域面积、降水量、蒸发量、下渗量</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>水位变化反映河流的补给类型：雨水补给型夏季水位高，冰雪融水补给型春夏水位高</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>含沙量与流域植被覆盖率、土质、地形坡度有关</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>结冰期与纬度、气温有关，秦岭-淮河以北河流有结冰期</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
