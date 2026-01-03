import { useState } from 'react'

export default function SeasonsSimulation() {
  const [selectedSeason, setSelectedSeason] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('summer')
  const [hemisphere, setHemisphere] = useState<'north' | 'south'>('north')

  const seasons = {
    spring: {
      name: '春分',
      date: '3月21日前后',
      directPoint: '赤道',
      northDayLength: '12小时',
      southDayLength: '12小时',
      description: '太阳直射赤道，全球昼夜等长',
      sunAngle: 0,
    },
    summer: {
      name: '夏至',
      date: '6月22日前后',
      directPoint: '北回归线(23°26′N)',
      northDayLength: '最长',
      southDayLength: '最短',
      description: '太阳直射北回归线，北半球白昼最长',
      sunAngle: 23.5,
    },
    autumn: {
      name: '秋分',
      date: '9月23日前后',
      directPoint: '赤道',
      northDayLength: '12小时',
      southDayLength: '12小时',
      description: '太阳直射赤道，全球昼夜等长',
      sunAngle: 0,
    },
    winter: {
      name: '冬至',
      date: '12月22日前后',
      directPoint: '南回归线(23°26′S)',
      northDayLength: '最短',
      southDayLength: '最长',
      description: '太阳直射南回归线，北半球白昼最短',
      sunAngle: -23.5,
    },
  }

  const currentSeason = seasons[selectedSeason]

  // 计算不同纬度的昼长
  const getDayLength = (latitude: number, sunAngle: number) => {
    if (Math.abs(latitude) + Math.abs(sunAngle) >= 90) {
      if ((latitude > 0 && sunAngle > 0) || (latitude < 0 && sunAngle < 0)) {
        return 24 // 极昼
      }
      return 0 // 极夜
    }
    const tanLat = Math.tan((latitude * Math.PI) / 180)
    const tanDec = Math.tan((sunAngle * Math.PI) / 180)
    const cosH = -tanLat * tanDec
    if (cosH > 1) return 0
    if (cosH < -1) return 24
    const H = Math.acos(cosH) * (180 / Math.PI)
    return Math.round((H / 15) * 2 * 10) / 10
  }

  return (
    <div className="space-y-6">
      {/* 演示区域 */}
      <div className="relative bg-[var(--bg-primary)] rounded-xl p-6 min-h-[400px]">
        <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
          {/* 太阳 */}
          <g transform="translate(100, 200)">
            <circle r="40" fill="#fbbf24">
              <animate attributeName="r" values="40;42;40" dur="2s" repeatCount="indefinite" />
            </circle>
            <text y="60" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">太阳</text>
          </g>

          {/* 太阳光线 */}
          {[...Array(5)].map((_, i) => {
            const y = 80 + i * 60
            return (
              <line
                key={i}
                x1="150"
                y1={200}
                x2="250"
                y2={y + currentSeason.sunAngle * 2}
                stroke="#fbbf24"
                strokeWidth="2"
                opacity="0.5"
                strokeDasharray="5,5"
              />
            )
          })}

          {/* 地球 */}
          <g transform="translate(400, 200)">
            {/* 地球本体 */}
            <circle r="150" fill="#1e3a5f" stroke="var(--border-color)" strokeWidth="2" />

            {/* 纬线和区域 */}
            {/* 北极圈 */}
            <line x1="-60" y1="-100" x2="60" y2="-100" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="3,3" />
            <text x="70" y="-96" fill="var(--text-tertiary)" fontSize="9">66.5°N</text>

            {/* 北回归线 */}
            <line x1="-120" y1="-55" x2="120" y2="-55" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="3,3" />
            <text x="125" y="-51" fill="var(--text-tertiary)" fontSize="9">23.5°N</text>

            {/* 赤道 */}
            <line x1="-150" y1="0" x2="150" y2="0" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
            <text x="155" y="4" fill="var(--text-tertiary)" fontSize="9">赤道</text>

            {/* 南回归线 */}
            <line x1="-120" y1="55" x2="120" y2="55" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="3,3" />
            <text x="125" y="59" fill="var(--text-tertiary)" fontSize="9">23.5°S</text>

            {/* 南极圈 */}
            <line x1="-60" y1="100" x2="60" y2="100" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="3,3" />
            <text x="70" y="104" fill="var(--text-tertiary)" fontSize="9">66.5°S</text>

            {/* 太阳直射点 */}
            <circle
              cx="0"
              cy={-currentSeason.sunAngle * 2.35}
              r="8"
              fill="#ef4444"
              stroke="white"
              strokeWidth="2"
            >
              <animate attributeName="r" values="8;10;8" dur="1s" repeatCount="indefinite" />
            </circle>
            <text
              x="15"
              y={-currentSeason.sunAngle * 2.35 + 4}
              fill="#ef4444"
              fontSize="10"
            >
              直射点
            </text>

            {/* 地轴 */}
            <line
              x1="0"
              y1="-170"
              x2="0"
              y2="170"
              stroke="white"
              strokeWidth="2"
              transform="rotate(-23.5)"
            />
            <text x="-30" y="-155" fill="var(--text-tertiary)" fontSize="10" transform="rotate(-23.5)">N</text>

            {/* 晨昏线 */}
            <ellipse
              cx="0"
              cy="0"
              rx="20"
              ry="150"
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
              transform={`rotate(${currentSeason.sunAngle})`}
            />

            {/* 昼夜区域标注 */}
            <text x="-80" y="0" fill="var(--text-secondary)" fontSize="11" textAnchor="middle">夜</text>
            <text x="80" y="0" fill="var(--text-secondary)" fontSize="11" textAnchor="middle">昼</text>
          </g>
        </svg>
      </div>

      {/* 季节选择 */}
      <div className="grid grid-cols-4 gap-2">
        {(Object.keys(seasons) as Array<keyof typeof seasons>).map(key => (
          <button
            key={key}
            onClick={() => setSelectedSeason(key)}
            className={`p-3 rounded-lg text-center transition-colors ${
              selectedSeason === key
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <div className="font-medium">{seasons[key].name}</div>
            <div className="text-xs opacity-80">{seasons[key].date}</div>
          </button>
        ))}
      </div>

      {/* 当前季节信息 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="info-card">
          <div className="info-card-title">太阳直射点</div>
          <div className="text-lg font-bold text-[var(--accent)]">{currentSeason.directPoint}</div>
        </div>
        <div className="info-card">
          <div className="info-card-title">北半球昼长</div>
          <div className="text-lg font-bold text-[var(--accent)]">{currentSeason.northDayLength}</div>
        </div>
        <div className="info-card">
          <div className="info-card-title">南半球昼长</div>
          <div className="text-lg font-bold text-[var(--accent)]">{currentSeason.southDayLength}</div>
        </div>
        <div className="info-card">
          <div className="info-card-title">特点</div>
          <div className="text-sm text-[var(--text-secondary)]">{currentSeason.description}</div>
        </div>
      </div>

      {/* 不同纬度昼长表 */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">不同纬度昼长（{currentSeason.name}）</h4>
        <div className="grid grid-cols-5 gap-2 text-center text-sm">
          {[66.5, 40, 0, -40, -66.5].map(lat => (
            <div key={lat} className="p-2 bg-[var(--bg-primary)] rounded-lg">
              <div className="text-[var(--text-tertiary)]">
                {lat > 0 ? `${lat}°N` : lat < 0 ? `${Math.abs(lat)}°S` : '赤道'}
              </div>
              <div className="font-bold text-[var(--accent)]">
                {getDayLength(lat, currentSeason.sunAngle)}h
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 图例 */}
      <div className="geo-legend">
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-red-500" />
          <span>太阳直射点</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-orange-500" />
          <span>晨昏线</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-white border border-[var(--border-color)]" />
          <span>地轴</span>
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>太阳直射点在南北回归线之间往返移动，周期为一年</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>夏至日北半球昼最长夜最短，冬至日相反</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>春分秋分全球昼夜等长，各为12小时</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>极圈内有极昼极夜现象，赤道上全年昼夜等长</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
