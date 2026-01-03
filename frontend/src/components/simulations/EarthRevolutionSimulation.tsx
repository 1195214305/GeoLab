import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function EarthRevolutionSimulation() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [orbitAngle, setOrbitAngle] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [showOrbitalPath, setShowOrbitalPath] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setOrbitAngle(prev => (prev + speed * 0.5) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [isPlaying, speed])

  // 根据公转角度确定季节
  const getSeason = (angle: number) => {
    if (angle >= 0 && angle < 90) return { name: '春分→夏至', date: '3月21日-6月22日' }
    if (angle >= 90 && angle < 180) return { name: '夏至→秋分', date: '6月22日-9月23日' }
    if (angle >= 180 && angle < 270) return { name: '秋分→冬至', date: '9月23日-12月22日' }
    return { name: '冬至→春分', date: '12月22日-3月21日' }
  }

  const season = getSeason(orbitAngle)

  // 计算地球在轨道上的位置
  const earthX = Math.cos((orbitAngle * Math.PI) / 180) * 140
  const earthY = Math.sin((orbitAngle * Math.PI) / 180) * 100

  return (
    <div className="space-y-6">
      {/* 演示区域 */}
      <div className="relative bg-[var(--bg-primary)] rounded-xl p-6 min-h-[450px] flex items-center justify-center overflow-hidden">
        {/* 星空背景 */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* 公转轨道 */}
        {showOrbitalPath && (
          <ellipse
            cx="50%"
            cy="50%"
            rx="140"
            ry="100"
            fill="none"
            stroke="var(--border-color)"
            strokeWidth="2"
            strokeDasharray="10,5"
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}

        <svg className="absolute inset-0 w-full h-full" viewBox="-200 -150 400 300">
          {/* 公转轨道 */}
          {showOrbitalPath && (
            <ellipse
              cx="0"
              cy="0"
              rx="140"
              ry="100"
              fill="none"
              stroke="var(--border-color)"
              strokeWidth="1"
              strokeDasharray="5,5"
              opacity="0.5"
            />
          )}

          {/* 太阳 */}
          <g>
            <circle cx="0" cy="0" r="30" fill="#fbbf24">
              <animate attributeName="r" values="30;32;30" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="0" r="40" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.3">
              <animate attributeName="r" values="40;50;40" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="55" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">太阳</text>
          </g>

          {/* 地球 */}
          <g transform={`translate(${earthX}, ${earthY})`}>
            {/* 地球本体 */}
            <circle cx="0" cy="0" r="15" fill="#3b82f6" />
            <ellipse cx="3" cy="-3" rx="8" ry="5" fill="#22c55e" opacity="0.8" />
            <ellipse cx="-5" cy="5" rx="4" ry="3" fill="#22c55e" opacity="0.8" />

            {/* 地轴（倾斜23.5°） */}
            <line
              x1="0"
              y1="-25"
              x2="0"
              y2="25"
              stroke="white"
              strokeWidth="1.5"
              transform="rotate(-23.5)"
            />
            <circle cx="0" cy="-25" r="2" fill="white" transform="rotate(-23.5)" />

            {/* 地球标签 */}
            <text x="0" y="35" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">地球</text>
          </g>

          {/* 四个关键位置标记 */}
          <g>
            {/* 春分 */}
            <circle cx="140" cy="0" r="4" fill="var(--accent)" opacity="0.5" />
            <text x="160" y="5" fill="var(--text-tertiary)" fontSize="10">春分</text>

            {/* 夏至 */}
            <circle cx="0" cy="-100" r="4" fill="var(--accent)" opacity="0.5" />
            <text x="0" y="-110" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">夏至</text>

            {/* 秋分 */}
            <circle cx="-140" cy="0" r="4" fill="var(--accent)" opacity="0.5" />
            <text x="-160" y="5" fill="var(--text-tertiary)" fontSize="10">秋分</text>

            {/* 冬至 */}
            <circle cx="0" cy="100" r="4" fill="var(--accent)" opacity="0.5" />
            <text x="0" y="120" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10">冬至</text>
          </g>

          {/* 公转方向箭头 */}
          <path
            d="M 100 -70 Q 120 -90 140 -70"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>

        {/* 黄赤交角示意 */}
        <div className="absolute bottom-4 right-4 bg-[var(--bg-secondary)] rounded-lg p-3 text-xs">
          <div className="text-[var(--text-tertiary)] mb-1">黄赤交角</div>
          <div className="text-[var(--text-primary)] font-bold">23°26′</div>
        </div>
      </div>

      {/* 控制面板 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="control-panel">
          <label className="control-label">公转速度</label>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="control-slider"
          />
          <div className="flex justify-between text-xs text-[var(--text-tertiary)] mt-1">
            <span>慢</span>
            <span>{speed}x</span>
            <span>快</span>
          </div>
        </div>

        <div className="control-panel flex items-center justify-between">
          <div>
            <label className="control-label mb-0">当前位置</label>
            <p className="text-sm text-[var(--accent)] font-medium">{season.name}</p>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium"
          >
            {isPlaying ? '暂停' : '播放'}
          </button>
        </div>

        <div className="control-panel flex items-center justify-between">
          <label className="control-label mb-0">显示轨道</label>
          <button
            onClick={() => setShowOrbitalPath(!showOrbitalPath)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showOrbitalPath
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
            }`}
          >
            {showOrbitalPath ? '显示' : '隐藏'}
          </button>
        </div>
      </div>

      {/* 信息卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="info-card">
          <div className="info-card-title">公转周期</div>
          <div className="info-card-value">365.25<span className="info-card-unit">天</span></div>
        </div>
        <div className="info-card">
          <div className="info-card-title">公转方向</div>
          <div className="info-card-value text-lg">自西向东</div>
        </div>
        <div className="info-card">
          <div className="info-card-title">平均速度</div>
          <div className="info-card-value">29.8<span className="info-card-unit">km/s</span></div>
        </div>
        <div className="info-card">
          <div className="info-card-title">黄赤交角</div>
          <div className="info-card-value">23.5<span className="info-card-unit">°</span></div>
        </div>
      </div>

      {/* 图例 */}
      <div className="geo-legend">
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-yellow-400" />
          <span>太阳</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-blue-500" />
          <span>地球</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-[var(--accent)]" />
          <span>节气位置</span>
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>公转轨道：椭圆形，太阳位于椭圆的一个焦点上</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>近日点（1月初）公转速度快，远日点（7月初）公转速度慢</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>黄赤交角（23°26′）是产生四季和五带的根本原因</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>地轴空间指向不变，始终指向北极星附近</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
