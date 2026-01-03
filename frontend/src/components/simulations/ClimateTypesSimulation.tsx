import { useState } from 'react'

export default function ClimateTypesSimulation() {
  const [selectedClimate, setSelectedClimate] = useState('tropical-rainforest')

  const climates = [
    { id: 'tropical-rainforest', name: '热带雨林', zone: '热带', color: '#22c55e' },
    { id: 'tropical-monsoon', name: '热带季风', zone: '热带', color: '#16a34a' },
    { id: 'tropical-savanna', name: '热带草原', zone: '热带', color: '#84cc16' },
    { id: 'tropical-desert', name: '热带沙漠', zone: '热带', color: '#eab308' },
    { id: 'subtropical-monsoon', name: '亚热带季风', zone: '亚热带', color: '#06b6d4' },
    { id: 'mediterranean', name: '地中海', zone: '亚热带', color: '#0ea5e9' },
    { id: 'temperate-oceanic', name: '温带海洋性', zone: '温带', color: '#3b82f6' },
    { id: 'temperate-monsoon', name: '温带季风', zone: '温带', color: '#6366f1' },
    { id: 'temperate-continental', name: '温带大陆性', zone: '温带', color: '#8b5cf6' },
    { id: 'subarctic', name: '亚寒带针叶林', zone: '寒带', color: '#a855f7' },
    { id: 'tundra', name: '苔原', zone: '寒带', color: '#d946ef' },
    { id: 'ice-cap', name: '冰原', zone: '寒带', color: '#f0abfc' },
  ]

  const climateDetails: Record<string, { temp: string; precip: string; distribution: string; features: string }> = {
    'tropical-rainforest': {
      temp: '全年高温，年均温>25°C',
      precip: '全年多雨，年降水量>2000mm',
      distribution: '赤道附近，如亚马孙、刚果盆地',
      features: '终年受赤道低压控制，对流雨为主',
    },
    'tropical-monsoon': {
      temp: '全年高温，年均温>20°C',
      precip: '分旱雨两季，年降水量1500-2000mm',
      distribution: '南亚、东南亚、澳大利亚北部',
      features: '受季风影响，雨季降水集中',
    },
    'tropical-savanna': {
      temp: '全年高温，年均温>20°C',
      precip: '干湿季分明，年降水量750-1000mm',
      distribution: '热带雨林两侧，非洲、南美',
      features: '受赤道低压和信风交替控制',
    },
    'tropical-desert': {
      temp: '全年炎热，日温差大',
      precip: '极少降水，年降水量<250mm',
      distribution: '回归线附近大陆西岸和内部',
      features: '受副热带高压或信风控制',
    },
    'subtropical-monsoon': {
      temp: '夏热冬温，年均温15-20°C',
      precip: '夏季多雨，年降水量1000-1500mm',
      distribution: '大陆东岸25°-35°，如中国东南',
      features: '受季风影响，雨热同期',
    },
    'mediterranean': {
      temp: '夏热冬温，年均温15-20°C',
      precip: '冬雨夏干，年降水量300-1000mm',
      distribution: '大陆西岸30°-40°，地中海沿岸',
      features: '夏受副高控制，冬受西风影响',
    },
    'temperate-oceanic': {
      temp: '冬暖夏凉，年温差小',
      precip: '全年湿润，年降水量700-1000mm',
      distribution: '大陆西岸40°-60°，西欧',
      features: '终年受西风和暖流影响',
    },
    'temperate-monsoon': {
      temp: '夏热冬冷，年温差大',
      precip: '夏季多雨，年降水量500-1000mm',
      distribution: '大陆东岸35°-55°，中国华北',
      features: '受季风影响，雨热同期',
    },
    'temperate-continental': {
      temp: '冬冷夏热，年温差很大',
      precip: '降水少，年降水量<400mm',
      distribution: '大陆内部，中亚、蒙古',
      features: '远离海洋，大陆性强',
    },
    'subarctic': {
      temp: '冬长严寒，夏短温暖',
      precip: '降水较少，年降水量300-600mm',
      distribution: '50°-70°N，俄罗斯、加拿大',
      features: '针叶林广布，冻土发育',
    },
    'tundra': {
      temp: '全年严寒，最热月<10°C',
      precip: '降水少，年降水量<250mm',
      distribution: '北冰洋沿岸',
      features: '永久冻土，苔藓地衣为主',
    },
    'ice-cap': {
      temp: '全年酷寒，年均温<-10°C',
      precip: '降水极少，以固态为主',
      distribution: '南极、格陵兰',
      features: '终年冰雪覆盖',
    },
  }

  const current = climateDetails[selectedClimate]
  const currentClimate = climates.find(c => c.id === selectedClimate)

  return (
    <div className="space-y-6">
      {/* 世界气候分布图 */}
      <div className="relative bg-[var(--bg-primary)] rounded-xl p-4 min-h-[300px]">
        <svg className="w-full h-full" viewBox="0 0 700 350" preserveAspectRatio="xMidYMid meet">
          {/* 简化的世界地图轮廓 */}
          <rect x="50" y="50" width="600" height="250" fill="var(--bg-secondary)" rx="10" />

          {/* 纬度带 */}
          <g fontSize="10" fill="var(--text-tertiary)">
            <line x1="50" y1="80" x2="650" y2="80" stroke="var(--border-color)" strokeDasharray="3,3" />
            <text x="660" y="85">66.5°N</text>

            <line x1="50" y1="120" x2="650" y2="120" stroke="var(--border-color)" strokeDasharray="3,3" />
            <text x="660" y="125">40°N</text>

            <line x1="50" y1="160" x2="650" y2="160" stroke="var(--border-color)" strokeDasharray="3,3" />
            <text x="660" y="165">23.5°N</text>

            <line x1="50" y1="175" x2="650" y2="175" stroke="var(--border-color)" strokeWidth="2" />
            <text x="660" y="180">赤道</text>

            <line x1="50" y1="190" x2="650" y2="190" stroke="var(--border-color)" strokeDasharray="3,3" />
            <text x="660" y="195">23.5°S</text>

            <line x1="50" y1="230" x2="650" y2="230" stroke="var(--border-color)" strokeDasharray="3,3" />
            <text x="660" y="235">40°S</text>

            <line x1="50" y1="270" x2="650" y2="270" stroke="var(--border-color)" strokeDasharray="3,3" />
            <text x="660" y="275">66.5°S</text>
          </g>

          {/* 气候带示意 */}
          {/* 热带 */}
          <rect x="200" y="160" width="200" height="30" fill="#22c55e" opacity="0.6" />
          <text x="300" y="180" textAnchor="middle" fill="white" fontSize="11">热带雨林</text>

          {/* 热带草原 */}
          <rect x="100" y="145" width="80" height="20" fill="#84cc16" opacity="0.6" />
          <rect x="420" y="145" width="80" height="20" fill="#84cc16" opacity="0.6" />

          {/* 热带沙漠 */}
          <rect x="80" y="160" width="40" height="30" fill="#eab308" opacity="0.6" />
          <rect x="480" y="160" width="40" height="30" fill="#eab308" opacity="0.6" />

          {/* 亚热带季风 */}
          <rect x="500" y="130" width="60" height="30" fill="#06b6d4" opacity="0.6" />

          {/* 地中海 */}
          <rect x="80" y="120" width="50" height="25" fill="#0ea5e9" opacity="0.6" />

          {/* 温带海洋性 */}
          <rect x="80" y="95" width="50" height="25" fill="#3b82f6" opacity="0.6" />

          {/* 温带季风 */}
          <rect x="520" y="100" width="60" height="30" fill="#6366f1" opacity="0.6" />

          {/* 温带大陆性 */}
          <rect x="300" y="90" width="150" height="40" fill="#8b5cf6" opacity="0.6" />

          {/* 亚寒带 */}
          <rect x="150" y="60" width="400" height="30" fill="#a855f7" opacity="0.6" />

          {/* 图例 */}
          <g transform="translate(60, 310)">
            <text fill="var(--text-secondary)" fontSize="10">点击下方按钮查看各气候类型详情</text>
          </g>
        </svg>
      </div>

      {/* 气候类型选择 */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {climates.map(climate => (
          <button
            key={climate.id}
            onClick={() => setSelectedClimate(climate.id)}
            className={`p-2 rounded-lg text-xs text-center transition-all ${
              selectedClimate === climate.id
                ? 'ring-2 ring-[var(--accent)] text-white'
                : 'text-[var(--text-secondary)] hover:opacity-80'
            }`}
            style={{ backgroundColor: selectedClimate === climate.id ? climate.color : climate.color + '40' }}
          >
            {climate.name}
          </button>
        ))}
      </div>

      {/* 当前气候详情 */}
      {current && currentClimate && (
        <div className="bg-[var(--bg-secondary)] rounded-xl p-4 border-l-4" style={{ borderColor: currentClimate.color }}>
          <h4 className="font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: currentClimate.color }} />
            {currentClimate.name}气候
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-[var(--text-tertiary)] text-sm">气温特征：</span>
              <p className="text-[var(--text-primary)]">{current.temp}</p>
            </div>
            <div>
              <span className="text-[var(--text-tertiary)] text-sm">降水特征：</span>
              <p className="text-[var(--text-primary)]">{current.precip}</p>
            </div>
            <div>
              <span className="text-[var(--text-tertiary)] text-sm">分布地区：</span>
              <p className="text-[var(--text-primary)]">{current.distribution}</p>
            </div>
            <div>
              <span className="text-[var(--text-tertiary)] text-sm">成因特点：</span>
              <p className="text-[var(--text-primary)]">{current.features}</p>
            </div>
          </div>
        </div>
      )}

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>气候类型判断：先判断温度带（热带/亚热带/温带/寒带），再判断降水类型</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>大陆东岸：季风气候为主（热带季风、亚热带季风、温带季风）</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>大陆西岸：地中海气候（30°-40°）、温带海洋性气候（40°-60°）</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>大陆内部：温带大陆性气候，降水少，温差大</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
