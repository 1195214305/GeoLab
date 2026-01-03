import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function DayNightSimulation() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [rotationAngle, setRotationAngle] = useState(0)
  const [latitude, setLatitude] = useState(40)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [isPlaying])

  // 计算当前时区的时间
  const getLocalTime = (angle: number) => {
    const hour = Math.floor(((angle + 180) % 360) / 15)
    return `${hour.toString().padStart(2, '0')}:00`
  }

  // 判断是否是白天
  const isDaytime = (angle: number) => {
    const normalizedAngle = (angle + 180) % 360
    return normalizedAngle >= 90 && normalizedAngle <= 270
  }

  return (
    <div className="space-y-6">
      {/* 演示区域 */}
      <div className="relative bg-[var(--bg-primary)] rounded-xl p-6 min-h-[400px] overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
          {/* 背景 - 昼夜分界 */}
          <defs>
            <linearGradient id="dayNightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="25%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#fef3c7" />
              <stop offset="75%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          {/* 太阳光线区域 */}
          <rect x="0" y="0" width="600" height="400" fill="url(#dayNightGrad)" opacity="0.3" />

          {/* 太阳 */}
          <g transform="translate(300, 50)">
            <circle r="30" fill="#fbbf24">
              <animate attributeName="r" values="30;32;30" dur="2s" repeatCount="indefinite" />
            </circle>
            <text y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">太阳光线</text>
            {/* 光线 */}
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1="0"
                y1="35"
                x2="0"
                y2="100"
                stroke="#fbbf24"
                strokeWidth="2"
                opacity="0.5"
                transform={`rotate(${i * 45})`}
              />
            ))}
          </g>

          {/* 地球横截面 */}
          <g transform="translate(300, 250)">
            {/* 地球圆 */}
            <circle r="120" fill="#1e3a5f" stroke="var(--border-color)" strokeWidth="2" />

            {/* 昼半球（右侧） */}
            <path
              d="M 0 -120 A 120 120 0 0 1 0 120"
              fill="#60a5fa"
              opacity="0.5"
            />

            {/* 夜半球（左侧） */}
            <path
              d="M 0 -120 A 120 120 0 0 0 0 120"
              fill="#0f172a"
              opacity="0.5"
            />

            {/* 晨昏线 */}
            <line x1="0" y1="-120" x2="0" y2="120" stroke="#f97316" strokeWidth="3" />
            <text x="10" y="-100" fill="#f97316" fontSize="10">晨昏线</text>

            {/* 纬线 */}
            {[-60, -30, 0, 30, 60].map(lat => {
              const y = -lat * 2
              const width = Math.cos((lat * Math.PI) / 180) * 120
              return (
                <g key={lat}>
                  <line
                    x1={-width}
                    y1={y}
                    x2={width}
                    y2={y}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                    strokeDasharray={lat === 0 ? "none" : "3,3"}
                  />
                  <text x={width + 10} y={y + 4} fill="var(--text-tertiary)" fontSize="9">
                    {lat === 0 ? '赤道' : `${Math.abs(lat)}°${lat > 0 ? 'N' : 'S'}`}
                  </text>
                </g>
              )
            })}

            {/* 观测点 */}
            <motion.g
              animate={{ rotate: rotationAngle }}
              transition={{ duration: 0, ease: "linear" }}
            >
              <circle
                cx={Math.cos((latitude * Math.PI) / 180) * 120}
                cy={-Math.sin((latitude * Math.PI) / 180) * 120 * 0}
                r="8"
                fill="#ef4444"
                stroke="white"
                strokeWidth="2"
              />
            </motion.g>

            {/* 地轴 */}
            <line x1="0" y1="-140" x2="0" y2="140" stroke="white" strokeWidth="2" opacity="0.5" />
            <text x="10" y="-130" fill="var(--text-tertiary)" fontSize="10">N</text>
            <text x="10" y="140" fill="var(--text-tertiary)" fontSize="10">S</text>

            {/* 自转方向 */}
            <path
              d="M -80 -100 Q -100 -80 -80 -60"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
            <text x="-110" y="-80" fill="var(--accent)" fontSize="10">自转</text>
          </g>

          {/* 时区标记 */}
          <g transform="translate(300, 250)">
            {[0, 6, 12, 18].map((hour, i) => {
              const angle = (hour * 15 - 90) * (Math.PI / 180)
              const x = Math.cos(angle) * 140
              const y = Math.sin(angle) * 140
              return (
                <text
                  key={hour}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  fill="var(--text-secondary)"
                  fontSize="11"
                >
                  {hour}:00
                </text>
              )
            })}
          </g>

          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* 控制面板 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="control-panel">
          <label className="control-label">观测纬度</label>
          <input
            type="range"
            min="-90"
            max="90"
            value={latitude}
            onChange={(e) => setLatitude(parseInt(e.target.value))}
            className="control-slider"
          />
          <div className="flex justify-between text-xs text-[var(--text-tertiary)] mt-1">
            <span>90°S</span>
            <span>{latitude > 0 ? `${latitude}°N` : latitude < 0 ? `${Math.abs(latitude)}°S` : '赤道'}</span>
            <span>90°N</span>
          </div>
        </div>

        <div className="control-panel flex items-center justify-between">
          <div>
            <label className="control-label mb-0">当前状态</label>
            <p className="text-sm text-[var(--accent)] font-medium">
              {isDaytime(rotationAngle) ? '☀️ 白天' : '🌙 夜晚'}
            </p>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium"
          >
            {isPlaying ? '暂停' : '播放'}
          </button>
        </div>
      </div>

      {/* 时区信息 */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { name: '北京', offset: 8 },
          { name: '伦敦', offset: 0 },
          { name: '纽约', offset: -5 },
          { name: '东京', offset: 9 },
        ].map(city => {
          const baseHour = Math.floor(rotationAngle / 15)
          const localHour = (baseHour + city.offset + 24) % 24
          return (
            <div key={city.name} className="info-card text-center">
              <div className="info-card-title">{city.name}</div>
              <div className="info-card-value text-lg">
                {localHour.toString().padStart(2, '0')}:00
              </div>
              <div className="text-xs text-[var(--text-tertiary)]">
                UTC{city.offset >= 0 ? '+' : ''}{city.offset}
              </div>
            </div>
          )
        })}
      </div>

      {/* 图例 */}
      <div className="geo-legend">
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-blue-400" />
          <span>昼半球</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-slate-900" />
          <span>夜半球</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-orange-500" />
          <span>晨昏线</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-red-500" />
          <span>观测点</span>
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>晨昏线：昼夜半球的分界线，晨线上日出，昏线上日落</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>时区：全球分为24个时区，每个时区跨经度15°</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>地方时：同一经线上地方时相同，经度每差15°，地方时差1小时</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>日界线：大致沿180°经线，向东过日界线日期减一天</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
