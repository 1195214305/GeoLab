const fs = require('fs');
const content = `import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function SeasonsSimulation() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [dayOfYear, setDayOfYear] = useState(172)
  const [speed, setSpeed] = useState(1)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setDayOfYear(prev => (prev + speed) % 365)
    }, 50)
    return () => clearInterval(interval)
  }, [isPlaying, speed])

  const getSunDeclination = (day) => 23.5 * Math.sin(((day - 80) / 365) * 2 * Math.PI)
  const sunDeclination = getSunDeclination(dayOfYear)

  const getSeason = (day) => {
    if (day >= 79 && day < 172) return { name: '春分→夏至' }
    if (day >= 172 && day < 266) return { name: '夏至→秋分' }
    if (day >= 266 && day < 355) return { name: '秋分→冬至' }
    return { name: '冬至→春分' }
  }
  const currentSeason = getSeason(dayOfYear)

  const getExactSeason = (day) => {
    if (day >= 79 && day < 82) return '春分'
    if (day >= 172 && day < 175) return '夏至'
    if (day >= 266 && day < 269) return '秋分'
    if (day >= 355 || day < 3) return '冬至'
    return null
  }
  const exactSeason = getExactSeason(dayOfYear)

  const getDayLength = (latitude, declination) => {
    if (Math.abs(latitude) + Math.abs(declination) >= 90) {
      return (latitude > 0 && declination > 0) || (latitude < 0 && declination < 0) ? 24 : 0
    }
    const tanLat = Math.tan((latitude * Math.PI) / 180)
    const tanDec = Math.tan((declination * Math.PI) / 180)
    const cosH = -tanLat * tanDec
    if (cosH > 1) return 0
    if (cosH < -1) return 24
    return Math.round((Math.acos(cosH) * (180 / Math.PI) / 15) * 2 * 10) / 10
  }

  const getDateFromDay = (day) => {
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const names = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    let r = day
    for (let i = 0; i < 12; i++) { if (r < months[i]) return names[i] + (r + 1) + '日'; r -= months[i] }
    return '12月31日'
  }

  return (
    <div className="space-y-6">
      <div className="relative bg-[var(--bg-primary)] rounded-xl p-6 min-h-[420px]">
        <svg className="w-full h-full" viewBox="0 0 650 420" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(80, 210)">
            <motion.circle r="45" fill="#fbbf24" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            {[...Array(12)].map((_, i) => {
              const a = (i * 30 * Math.PI) / 180
              return <motion.line key={i} x1={Math.cos(a)*50} y1={Math.sin(a)*50} x2={Math.cos(a)*65} y2={Math.sin(a)*65}
                stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }} />
            })}
            <text y="75" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">太阳</text>
          </g>

          {[...Array(7)].map((_, i) => (
            <motion.line key={i} x1="140" y1={210} x2="230" y2={100 + i * 40 + (210 - sunDeclination * 3.5 - 210) * 0.3}
              stroke="#fbbf24" strokeWidth="2" opacity="0.4" strokeDasharray="8,4"
              animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }} />
          ))}

          <g transform="translate(420, 210)">
            <circle r="160" fill="#1e3a5f" stroke="var(--border-color)" strokeWidth="2" />
            <line x1="-70" y1="-106" x2="70" y2="-106" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3,3" />
            <text x="80" y="-102" fill="var(--text-tertiary)" fontSize="9">66.5°N</text>
            <line x1="-130" y1="-60" x2="130" y2="-60" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeDasharray="4,4" />
            <text x="135" y="-56" fill="var(--text-tertiary)" fontSize="9">23.5°N</text>
            <line x1="-160" y1="0" x2="160" y2="0" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
            <text x="165" y="4" fill="var(--text-tertiary)" fontSize="9">赤道</text>
            <line x1="-130" y1="60" x2="130" y2="60" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeDasharray="4,4" />
            <text x="135" y="64" fill="var(--text-tertiary)" fontSize="9">23.5°S</text>
            <line x1="-70" y1="106" x2="70" y2="106" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3,3" />
            <text x="80" y="110" fill="var(--text-tertiary)" fontSize="9">66.5°S</text>

            <motion.g animate={{ y: -sunDeclination * 2.55 }} transition={{ type: 'spring', stiffness: 100, damping: 20 }}>
              <motion.circle cx="0" r="10" fill="#ef4444" stroke="white" strokeWidth="2" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
              <text x="18" y="5" fill="#ef4444" fontSize="11" fontWeight="bold">
                直射点 {sunDeclination > 0 ? sunDeclination.toFixed(1) + '°N' : sunDeclination < 0 ? Math.abs(sunDeclination).toFixed(1) + '°S' : '赤道'}
              </text>
            </motion.g>

            <line x1="0" y1="-180" x2="0" y2="180" stroke="white" strokeWidth="2" transform="rotate(-23.5)" />
            <text x="-25" y="-165" fill="white" fontSize="11" transform="rotate(-23.5)">N</text>
            <text x="-25" y="175" fill="white" fontSize="11" transform="rotate(-23.5)">S</text>

            <ellipse cx="0" cy="0" rx="25" ry="160" fill="none" stroke="#f97316" strokeWidth="3" transform={\`rotate(\${sunDeclination * 0.8})\`} />

            {sunDeclination > 10 && <><text x="0" y="-130" textAnchor="middle" fill="#fbbf24" fontSize="10">极昼区</text><text x="0" y="140" textAnchor="middle" fill="#6366f1" fontSize="10">极夜区</text></>}
            {sunDeclination < -10 && <><text x="0" y="-130" textAnchor="middle" fill="#6366f1" fontSize="10">极夜区</text><text x="0" y="140" textAnchor="middle" fill="#fbbf24" fontSize="10">极昼区</text></>}
          </g>

          {exactSeason && <><rect x="350" y="10" width="100" height="30" rx="15" fill="#ef4444" /><text x="400" y="30" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{exactSeason}</text></>}
          <text x="420" y="395" textAnchor="middle" fill="var(--text-secondary)" fontSize="14">{getDateFromDay(dayOfYear)}</text>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="control-panel">
          <label className="control-label">日期控制</label>
          <input type="range" min="0" max="364" value={dayOfYear} onChange={(e) => setDayOfYear(parseInt(e.target.value))} className="control-slider" />
          <div className="flex justify-between text-xs text-[var(--text-tertiary)] mt-1"><span>1月1日</span><span>{getDateFromDay(dayOfYear)}</span><span>12月31日</span></div>
        </div>
        <div className="control-panel">
          <label className="control-label">播放速度</label>
          <input type="range" min="0.5" max="5" step="0.5" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="control-slider" />
          <div className="flex justify-between text-xs text-[var(--text-tertiary)] mt-1"><span>慢</span><span>{speed}x</span><span>快</span></div>
        </div>
        <div className="control-panel flex items-center justify-between">
          <div><label className="control-label mb-0">播放控制</label><p className="text-xs text-[var(--text-tertiary)]">{currentSeason.name}</p></div>
          <button onClick={() => setIsPlaying(!isPlaying)} className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium">{isPlaying ? 
