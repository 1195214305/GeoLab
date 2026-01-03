import { useState } from 'react'

export default function UrbanStructureSimulation() {
  const [selectedZone, setSelectedZone] = useState<string | null>('cbd')

  const zones = [
    { id: 'cbd', name: '中心商务区(CBD)', color: '#ef4444', features: '商业、金融、服务业集中，地价最高' },
    { id: 'commercial', name: '商业区', color: '#f97316', features: '零售、餐饮、娱乐，交通便利' },
    { id: 'residential', name: '住宅区', color: '#22c55e', features: '面积最大，分高中低档' },
    { id: 'industrial', name: '工业区', color: '#6b7280', features: '靠近交通线，远离市中心' },
  ]

  const selectedZoneData = zones.find(z => z.id === selectedZone)

  return (
    <div className="space-y-6">
      {/* 城市功能分区示意图 */}
      <div className="relative bg-[var(--bg-primary)] rounded-xl p-6 min-h-[350px]">
        <svg className="w-full h-full" viewBox="0 0 500 320" preserveAspectRatio="xMidYMid meet">
          <text x="250" y="25" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="bold">城市功能分区模式</text>

          {/* 同心圆模式 */}
          <g transform="translate(250, 180)">
            {/* 工业区（外围） */}
            <circle r="130" fill="#6b7280" opacity={selectedZone === 'industrial' ? 0.8 : 0.4}
              className="cursor-pointer" onClick={() => setSelectedZone('industrial')} />

            {/* 住宅区 */}
            <circle r="100" fill="#22c55e" opacity={selectedZone === 'residential' ? 0.8 : 0.5}
              className="cursor-pointer" onClick={() => setSelectedZone('residential')} />

            {/* 商业区 */}
            <circle r="60" fill="#f97316" opacity={selectedZone === 'commercial' ? 0.8 : 0.5}
              className="cursor-pointer" onClick={() => setSelectedZone('commercial')} />

            {/* CBD */}
            <circle r="30" fill="#ef4444" opacity={selectedZone === 'cbd' ? 0.9 : 0.6}
              className="cursor-pointer" onClick={() => setSelectedZone('cbd')} />
            <text y="5" textAnchor="middle" fill="white" fontSize="10">CBD</text>

            {/* 标注 */}
            <text x="0" y="50" textAnchor="middle" fill="white" fontSize="9">商业区</text>
            <text x="0" y="85" textAnchor="middle" fill="white" fontSize="9">住宅区</text>
            <text x="0" y="120" textAnchor="middle" fill="white" fontSize="9">工业区</text>
          </g>

          {/* 交通线 */}
          <g stroke="var(--text-tertiary)" strokeWidth="2" strokeDasharray="5,3">
            <line x1="250" y1="50" x2="250" y2="310" />
            <line x1="120" y1="180" x2="380" y2="180" />
            <line x1="150" y1="100" x2="350" y2="260" />
            <line x1="350" y1="100" x2="150" y2="260" />
          </g>
        </svg>
      </div>

      {/* 功能区选择 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {zones.map(zone => (
          <button
            key={zone.id}
            onClick={() => setSelectedZone(zone.id)}
            className={`p-3 rounded-lg text-center transition-all ${
              selectedZone === zone.id ? 'ring-2 ring-[var(--accent)]' : ''
            }`}
            style={{ backgroundColor: zone.color + '30' }}
          >
            <div className="w-4 h-4 rounded-full mx-auto mb-1" style={{ backgroundColor: zone.color }} />
            <div className="font-medium text-[var(--text-primary)] text-sm">{zone.name}</div>
          </button>
        ))}
      </div>

      {/* 选中区域详情 */}
      {selectedZoneData && (
        <div className="bg-[var(--bg-secondary)] rounded-xl p-4 border-l-4" style={{ borderColor: selectedZoneData.color }}>
          <h4 className="font-bold text-[var(--text-primary)] mb-2">{selectedZoneData.name}</h4>
          <p className="text-sm text-[var(--text-secondary)]">{selectedZoneData.features}</p>
        </div>
      )}

      {/* 区位因素 */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">功能区形成因素</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-[var(--bg-tertiary)] rounded-lg">
            <div className="text-2xl mb-1">💰</div>
            <div className="text-sm text-[var(--text-primary)]">地租</div>
            <div className="text-xs text-[var(--text-tertiary)]">最主要因素</div>
          </div>
          <div className="p-3 bg-[var(--bg-tertiary)] rounded-lg">
            <div className="text-2xl mb-1">🚗</div>
            <div className="text-sm text-[var(--text-primary)]">交通</div>
            <div className="text-xs text-[var(--text-tertiary)]">通达度</div>
          </div>
          <div className="p-3 bg-[var(--bg-tertiary)] rounded-lg">
            <div className="text-2xl mb-1">📜</div>
            <div className="text-sm text-[var(--text-primary)]">历史</div>
            <div className="text-xs text-[var(--text-tertiary)]">发展惯性</div>
          </div>
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>CBD特点：建筑密集、高层建筑多、人口昼夜差异大</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>住宅区面积最大，分为高级住宅区和低级住宅区</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>工业区布局原则：靠近交通线、远离居民区、考虑风向</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
