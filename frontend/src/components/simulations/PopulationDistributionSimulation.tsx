import { useState } from 'react'

export default function PopulationDistributionSimulation() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const regions = [
    { id: 'east-asia', name: '东亚', density: '高', reason: '季风气候、平原广阔、农业发达' },
    { id: 'south-asia', name: '南亚', density: '高', reason: '热带季风、恒河平原、历史悠久' },
    { id: 'europe', name: '西欧', density: '高', reason: '温带海洋性气候、工业发达' },
    { id: 'north-america', name: '北美东部', density: '较高', reason: '气候适宜、经济发达' },
    { id: 'sahara', name: '撒哈拉', density: '极低', reason: '热带沙漠、水源匮乏' },
    { id: 'amazon', name: '亚马孙', density: '低', reason: '热带雨林、湿热环境' },
  ]

  return (
    <div className="space-y-6">
      {/* 世界人口分布示意图 */}
      <div className="relative bg-[var(--bg-primary)] rounded-xl p-4 min-h-[300px]">
        <svg className="w-full h-full" viewBox="0 0 700 300" preserveAspectRatio="xMidYMid meet">
          {/* 简化世界地图 */}
          <rect x="50" y="30" width="600" height="240" fill="var(--bg-secondary)" rx="10" />

          {/* 人口稠密区 - 红色 */}
          {/* 东亚 */}
          <ellipse cx="550" cy="120" rx="50" ry="40" fill="#ef4444" opacity="0.6"
            className="cursor-pointer hover:opacity-80" onClick={() => setSelectedRegion('east-asia')} />
          <text x="550" y="125" textAnchor="middle" fill="white" fontSize="10">东亚</text>

          {/* 南亚 */}
          <ellipse cx="480" cy="150" rx="35" ry="30" fill="#ef4444" opacity="0.6"
            className="cursor-pointer hover:opacity-80" onClick={() => setSelectedRegion('south-asia')} />
          <text x="480" y="155" textAnchor="middle" fill="white" fontSize="10">南亚</text>

          {/* 西欧 */}
          <ellipse cx="320" cy="90" rx="40" ry="35" fill="#ef4444" opacity="0.6"
            className="cursor-pointer hover:opacity-80" onClick={() => setSelectedRegion('europe')} />
          <text x="320" y="95" textAnchor="middle" fill="white" fontSize="10">西欧</text>

          {/* 北美东部 */}
          <ellipse cx="150" cy="100" rx="35" ry="30" fill="#f97316" opacity="0.6"
            className="cursor-pointer hover:opacity-80" onClick={() => setSelectedRegion('north-america')} />
          <text x="150" y="105" textAnchor="middle" fill="white" fontSize="9">北美东部</text>

          {/* 人口稀疏区 - 蓝色 */}
          {/* 撒哈拉 */}
          <ellipse cx="320" cy="160" rx="60" ry="30" fill="#3b82f6" opacity="0.4"
            className="cursor-pointer hover:opacity-60" onClick={() => setSelectedRegion('sahara')} />
          <text x="320" y="165" textAnchor="middle" fill="white" fontSize="10">撒哈拉</text>

          {/* 亚马孙 */}
          <ellipse cx="180" cy="190" rx="45" ry="35" fill="#3b82f6" opacity="0.4"
            className="cursor-pointer hover:opacity-60" onClick={() => setSelectedRegion('amazon')} />
          <text x="180" y="195" textAnchor="middle" fill="white" fontSize="10">亚马孙</text>

          {/* 图例 */}
          <g transform="translate(550, 230)">
            <rect x="0" y="0" width="15" height="15" fill="#ef4444" opacity="0.6" />
            <text x="20" y="12" fill="var(--text-secondary)" fontSize="10">人口稠密</text>
            <rect x="80" y="0" width="15" height="15" fill="#3b82f6" opacity="0.4" />
            <text x="100" y="12" fill="var(--text-secondary)" fontSize="10">人口稀疏</text>
          </g>
        </svg>
      </div>

      {/* 区域列表 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {regions.map(region => (
          <button
            key={region.id}
            onClick={() => setSelectedRegion(region.id)}
            className={`p-3 rounded-lg text-left transition-all ${
              selectedRegion === region.id ? 'ring-2 ring-[var(--accent)]' : ''
            } ${region.density === '高' || region.density === '较高' ? 'bg-red-500/20' : 'bg-blue-500/20'}`}
          >
            <div className="font-medium text-[var(--text-primary)]">{region.name}</div>
            <div className="text-xs text-[var(--text-secondary)]">密度：{region.density}</div>
          </button>
        ))}
      </div>

      {/* 选中区域详情 */}
      {selectedRegion && (
        <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
          <h4 className="font-bold text-[var(--text-primary)] mb-2">
            {regions.find(r => r.id === selectedRegion)?.name}
          </h4>
          <p className="text-sm text-[var(--text-secondary)]">
            <span className="text-[var(--text-tertiary)]">分布原因：</span>
            {regions.find(r => r.id === selectedRegion)?.reason}
          </p>
        </div>
      )}

      {/* 影响因素 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
          <h4 className="font-medium text-[var(--text-primary)] mb-2">自然因素</h4>
          <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
            <li>• 气候（温和湿润）</li>
            <li>• 地形（平原盆地）</li>
            <li>• 水源（河流湖泊）</li>
            <li>• 土壤（肥沃）</li>
          </ul>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
          <h4 className="font-medium text-[var(--text-primary)] mb-2">社会经济因素</h4>
          <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
            <li>• 经济发展水平</li>
            <li>• 交通便利程度</li>
            <li>• 历史开发早晚</li>
            <li>• 政策因素</li>
          </ul>
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>世界人口分布不均：90%以上集中在北半球，沿海地区人口密集</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>四大人口稠密区：东亚、南亚、西欧、北美东部</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>人口稀疏区：干旱沙漠、湿热雨林、高寒地区、高山高原</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
