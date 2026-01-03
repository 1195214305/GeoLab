import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function EarthRotationSimulation() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [rotationAngle, setRotationAngle] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [showLabels, setShowLabels] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + speed) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [isPlaying, speed])

  // 计算当前时间（基于旋转角度）
  const currentHour = Math.floor((rotationAngle / 360) * 24)
  const sunlitStart = 270 // 日出位置
  const sunlitEnd = 90 // 日落位置

  return (
    <div className="space-y-6">
      {/* 演示区域 */}
      <div className="relative bg-[var(--bg-primary)] rounded-xl p-6 min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* 太阳光线 */}
        <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-yellow-400/20 to-transparent" />

        {/* 太阳 */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 rounded-full bg-yellow-400 shadow-[0_0_60px_20px_rgba(250,204,21,0.4)]"
          />
          {showLabels && (
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-[var(--text-secondary)] whitespace-nowrap">
              太阳
            </span>
          )}
        </div>

        {/* 地球 */}
        <div className="relative">
          <motion.div
            animate={{ rotate: rotationAngle }}
            transition={{ duration: 0, ease: "linear" }}
            className="relative w-48 h-48"
          >
            {/* 地球本体 */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* 地球阴影面（夜晚） */}
              <defs>
                <linearGradient id="earthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e3a5f" />
                  <stop offset="50%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#1e3a5f" />
                </linearGradient>
                <clipPath id="earthClip">
                  <circle cx="100" cy="100" r="90" />
                </clipPath>
              </defs>

              {/* 地球圆形 */}
              <circle cx="100" cy="100" r="90" fill="url(#earthGradient)" />

              {/* 大陆轮廓（简化） */}
              <g clipPath="url(#earthClip)">
                {/* 亚欧大陆 */}
                <ellipse cx="130" cy="70" rx="40" ry="25" fill="#22c55e" opacity="0.8" />
                {/* 非洲 */}
                <ellipse cx="110" cy="110" rx="20" ry="30" fill="#22c55e" opacity="0.8" />
                {/* 美洲 */}
                <ellipse cx="50" cy="80" rx="15" ry="35" fill="#22c55e" opacity="0.8" />
                {/* 澳大利亚 */}
                <ellipse cx="160" cy="130" rx="15" ry="10" fill="#22c55e" opacity="0.8" />
              </g>

              {/* 经线 */}
              <ellipse cx="100" cy="100" rx="90" ry="30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <ellipse cx="100" cy="100" rx="60" ry="90" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

              {/* 赤道 */}
              <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="5,5" />

              {/* 地轴 */}
              <line x1="100" y1="0" x2="100" y2="200" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
              <circle cx="100" cy="5" r="5" fill="white" />
              <circle cx="100" cy="195" r="5" fill="white" />
            </svg>

            {/* 北极标记 */}
            {showLabels && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-[var(--text-secondary)]">
                北极
              </span>
            )}
          </motion.div>

          {/* 自转方向箭头 */}
          <div className="absolute top-1/2 -right-16 -translate-y-1/2">
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-[var(--accent)]"
            >
              <svg width="40" height="40" viewBox="0 0 40 40">
                <path d="M5 20 Q20 5 35 20" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M30 15 L35 20 L30 25" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </motion.div>
            {showLabels && (
              <span className="text-xs text-[var(--text-secondary)] whitespace-nowrap">自西向东</span>
            )}
          </div>

          {/* 晨昏线标记 */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-orange-400/50 -translate-x-1/2" />
        </div>

        {/* 昼夜标记 */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-2">
            <span className="text-2xl">🌙</span>
          </div>
          {showLabels && (
            <span className="text-sm text-[var(--text-secondary)]">夜晚</span>
          )}
        </div>
      </div>

      {/* 控制面板 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="control-panel">
          <label className="control-label">旋转速度</label>
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
            <label className="control-label mb-0">播放控制</label>
            <p className="text-xs text-[var(--text-tertiary)]">当前角度: {Math.round(rotationAngle)}°</p>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium"
          >
            {isPlaying ? '暂停' : '播放'}
          </button>
        </div>
      </div>

      {/* 信息卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="info-card">
          <div className="info-card-title">自转周期</div>
          <div className="info-card-value">23<span className="info-card-unit">时56分</span></div>
        </div>
        <div className="info-card">
          <div className="info-card-title">自转方向</div>
          <div className="info-card-value text-lg">自西向东</div>
        </div>
        <div className="info-card">
          <div className="info-card-title">角速度</div>
          <div className="info-card-value">15<span className="info-card-unit">°/h</span></div>
        </div>
        <div className="info-card">
          <div className="info-card-title">赤道线速度</div>
          <div className="info-card-value">1670<span className="info-card-unit">km/h</span></div>
        </div>
      </div>

      {/* 图例 */}
      <div className="geo-legend">
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-yellow-400" />
          <span>太阳光照</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-orange-400" />
          <span>晨昏线</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-white border border-[var(--border-color)]" />
          <span>地轴</span>
        </div>
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-green-500" />
          <span>陆地</span>
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>地球自转方向：自西向东（从北极上空看为逆时针，从南极上空看为顺时针）</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>自转周期：恒星日约23时56分4秒，太阳日为24小时</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>角速度：除两极外，各地角速度相同，约15°/小时</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>线速度：从赤道向两极递减，赤道最大约1670km/h，两极为0</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
