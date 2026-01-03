import { useState } from 'react'

export default function WeatherSystemsSimulation() {
  const [selectedSystem, setSelectedSystem] = useState<'cyclone' | 'anticyclone' | 'cold-front' | 'warm-front'>('cyclone')

  const systems = {
    cyclone: {
      name: '气旋（低压）',
      pressure: '中心气压低',
      airflow: '气流辐合上升',
      weather: '多阴雨天气',
      rotation: '北半球逆时针，南半球顺时针',
    },
    anticyclone: {
      name: '反气旋（高压）',
      pressure: '中心气压高',
      airflow: '气流下沉辐散',
      weather: '晴朗干燥天气',
      rotation: '北半球顺时针，南半球逆时针',
    },
    'cold-front': {
      name: '冷锋',
      pressure: '冷气团主动推进',
      airflow: '暖气团被迫抬升',
      weather: '锋后降水，过境后气温下降',
      rotation: '移动速度快，降水时间短',
    },
    'warm-front': {
      name: '暖锋',
      pressure: '暖气团主动推进',
      airflow: '暖气团沿冷气团爬升',
      weather: '锋前降水，过境后气温上升',
      rotation: '移动速度慢，降水时间长',
    },
  }

  const current = systems[selectedSystem]

  return (
    <div className="space-y-6">
      {/* 演示区域 */}
      <div className="relative bg-gradient-to-b from-blue-900 to-slate-800 rounded-xl p-6 min-h-[400px]">
        <svg className="w-full h-full" viewBox="0 0 600 350" preserveAspectRatio="xMidYMid meet">
          {selectedSystem === 'cyclone' && (
            <g>
              {/* 气旋示意图 */}
              <circle cx="300" cy="175" r="100" fill="none" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="10,5" />
              <circle cx="300" cy="175" r="60" fill="none" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="10,5" />

              {/* 中心低压 */}
              <text x="300" y="180" textAnchor="middle" fill="#ef4444" fontSize="24" fontWeight="bold">L</text>
              <text x="300" y="200" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">低压中心</text>

              {/* 气流方向（北半球逆时针） */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180
                const x1 = 300 + Math.cos(rad) * 120
                const y1 = 175 + Math.sin(rad) * 120
                const x2 = 300 + Math.cos(rad + 0.3) * 80
                const y2 = 175 + Math.sin(rad + 0.3) * 80
                return (
                  <g key={i}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrowBlue)" />
                  </g>
                )
              })}

              {/* 上升气流 */}
              <path d="M 300 175 L 300 80" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrowGreen)" />
              <text x="320" y="100" fill="#22c55e" fontSize="11">气流上升</text>

              {/* 云和降水 */}
              <text x="250" y="60" fontSize="30">☁️</text>
              <text x="320" y="70" fontSize="20">🌧️</text>
            </g>
          )}

          {selectedSystem === 'anticyclone' && (
            <g>
              {/* 反气旋示意图 */}
              <circle cx="300" cy="175" r="100" fill="none" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="10,5" />
              <circle cx="300" cy="175" r="60" fill="none" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="10,5" />

              {/* 中心高压 */}
              <text x="300" y="180" textAnchor="middle" fill="#3b82f6" fontSize="24" fontWeight="bold">H</text>
              <text x="300" y="200" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">高压中心</text>

              {/* 气流方向（北半球顺时针） */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180
                const x1 = 300 + Math.cos(rad) * 80
                const y1 = 175 + Math.sin(rad) * 80
                const x2 = 300 + Math.cos(rad - 0.3) * 120
                const y2 = 175 + Math.sin(rad - 0.3) * 120
                return (
                  <g key={i}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowOrange)" />
                  </g>
                )
              })}

              {/* 下沉气流 */}
              <path d="M 300 80 L 300 150" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowRed)" />
              <text x="320" y="100" fill="#ef4444" fontSize="11">气流下沉</text>

              {/* 晴天 */}
              <text x="280" y="60" fontSize="30">☀️</text>
            </g>
          )}

          {selectedSystem === 'cold-front' && (
            <g>
              {/* 地面 */}
              <rect x="50" y="280" width="500" height="50" fill="#22c55e" opacity="0.5" />

              {/* 冷气团 */}
              <path d="M 50 280 L 250 280 L 300 150 L 50 150 Z" fill="#60a5fa" opacity="0.4" />
              <text x="120" y="220" fill="#60a5fa" fontSize="14" fontWeight="bold">冷气团</text>

              {/* 暖气团 */}
              <path d="M 300 150 L 250 280 L 550 280 L 550 100 L 300 100 Z" fill="#ef4444" opacity="0.3" />
              <text x="420" y="180" fill="#ef4444" fontSize="14" fontWeight="bold">暖气团</text>

              {/* 锋面 */}
              <line x1="250" y1="280" x2="300" y2="150" stroke="#1e40af" strokeWidth="4" />
              <text x="230" y="200" fill="#1e40af" fontSize="12" fontWeight="bold">冷锋</text>

              {/* 锋面符号 */}
              {[0, 1, 2, 3].map(i => (
                <polygon
                  key={i}
                  points="0,-8 8,0 0,8"
                  fill="#1e40af"
                  transform={`translate(${260 + i * 12}, ${260 - i * 30}) rotate(-60)`}
                />
              ))}

              {/* 移动方向 */}
              <path d="M 200 300 L 350 300" stroke="var(--text-secondary)" strokeWidth="2" markerEnd="url(#arrowGray)" />
              <text x="270" y="320" fill="var(--text-secondary)" fontSize="11">移动方向</text>

              {/* 降水区 */}
              <text x="200" y="130" fontSize="24">🌧️</text>
              <text x="240" y="100" fontSize="20">⛈️</text>
              <text x="180" y="90" fill="var(--text-secondary)" fontSize="10">锋后降水</text>
            </g>
          )}

          {selectedSystem === 'warm-front' && (
            <g>
              {/* 地面 */}
              <rect x="50" y="280" width="500" height="50" fill="#22c55e" opacity="0.5" />

              {/* 冷气团 */}
              <path d="M 50 280 L 300 280 L 300 150 L 50 150 Z" fill="#60a5fa" opacity="0.4" />
              <text x="120" y="220" fill="#60a5fa" fontSize="14" fontWeight="bold">冷气团</text>

              {/* 暖气团 */}
              <path d="M 300 280 L 550 280 L 550 100 L 200 100 L 300 150 Z" fill="#ef4444" opacity="0.3" />
              <text x="420" y="180" fill="#ef4444" fontSize="14" fontWeight="bold">暖气团</text>

              {/* 锋面 */}
              <path d="M 300 280 Q 250 200 200 100" fill="none" stroke="#dc2626" strokeWidth="4" />
              <text x="320" y="200" fill="#dc2626" fontSize="12" fontWeight="bold">暖锋</text>

              {/* 锋面符号 */}
              {[0, 1, 2, 3].map(i => (
                <circle
                  key={i}
                  cx={280 - i * 15}
                  cy={240 - i * 35}
                  r="6"
                  fill="#dc2626"
                />
              ))}

              {/* 移动方向 */}
              <path d="M 350 300 L 200 300" stroke="var(--text-secondary)" strokeWidth="2" markerEnd="url(#arrowGray)" />
              <text x="250" y="320" fill="var(--text-secondary)" fontSize="11">移动方向</text>

              {/* 降水区 */}
              <text x="150" y="130" fontSize="20">🌧️</text>
              <text x="100" y="150" fontSize="18">🌧️</text>
              <text x="80" y="100" fill="var(--text-secondary)" fontSize="10">锋前降水</text>
            </g>
          )}

          {/* 箭头定义 */}
          <defs>
            <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
            </marker>
            <marker id="arrowOrange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
            </marker>
            <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
            </marker>
            <marker id="arrowRed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
            </marker>
            <marker id="arrowGray" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* 天气系统选择 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {(Object.keys(systems) as Array<keyof typeof systems>).map(key => (
          <button
            key={key}
            onClick={() => setSelectedSystem(key)}
            className={`p-3 rounded-lg text-center transition-colors ${
              selectedSystem === key
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            {systems[key].name}
          </button>
        ))}
      </div>

      {/* 当前系统信息 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="info-card">
          <div className="info-card-title">气压特征</div>
          <div className="text-sm text-[var(--text-primary)]">{current.pressure}</div>
        </div>
        <div className="info-card">
          <div className="info-card-title">气流运动</div>
          <div className="text-sm text-[var(--text-primary)]">{current.airflow}</div>
        </div>
        <div className="info-card">
          <div className="info-card-title">天气特征</div>
          <div className="text-sm text-[var(--text-primary)]">{current.weather}</div>
        </div>
        <div className="info-card">
          <div className="info-card-title">其他特点</div>
          <div className="text-sm text-[var(--text-primary)]">{current.rotation}</div>
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>气旋（低压）：气流辐合上升，多阴雨天气；反气旋（高压）：气流下沉辐散，晴朗天气</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>冷锋：冷气团主动，锋后降水，过境后气温下降、气压升高</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>暖锋：暖气团主动，锋前降水，过境后气温上升、气压下降</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>我国天气：夏季受副热带高压影响，冬季受冷锋影响较多</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
