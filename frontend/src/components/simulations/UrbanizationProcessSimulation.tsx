import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function UrbanizationProcessSimulation() {
  const [selectedStage, setSelectedStage] = useState<'initial' | 'acceleration' | 'late'>('acceleration')

  const stages = {
    initial: { name: '初期阶段', rate: '<30%', speed: '缓慢', features: '农业为主，城市化刚起步' },
    acceleration: { name: '中期阶段', rate: '30%-70%', speed: '快速', features: '工业化推动，人口大量涌入城市' },
    late: { name: '后期阶段', rate: '>70%', speed: '缓慢', features: '出现郊区化、逆城市化' },
  }

  const chartData = [
    { year: '1800', developed: 10, developing: 5 },
    { year: '1850', developed: 20, developing: 8 },
    { year: '1900', developed: 40, developing: 12 },
    { year: '1950', developed: 55, developing: 18 },
    { year: '1980', developed: 72, developing: 30 },
    { year: '2000', developed: 78, developing: 42 },
    { year: '2020', developed: 82, developing: 55 },
  ]

  const current = stages[selectedStage]

  return (
    <div className="space-y-6">
      {/* 城市化进程曲线 */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-4">城市化进程曲线</h4>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="year" stroke="var(--text-secondary)" fontSize={12} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} unit="%" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value}%`, '']}
              />
              <Line type="monotone" dataKey="developed" name="发达国家" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6' }} />
              <Line type="monotone" dataKey="developing" name="发展中国家" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-[var(--text-secondary)]">发达国家</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-[var(--text-secondary)]">发展中国家</span>
          </div>
        </div>
      </div>

      {/* 阶段选择 */}
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(stages) as Array<keyof typeof stages>).map(key => (
          <button
            key={key}
            onClick={() => setSelectedStage(key)}
            className={`p-3 rounded-lg text-center transition-colors ${
              selectedStage === key
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <div className="font-medium">{stages[key].name}</div>
            <div className="text-xs opacity-80">{stages[key].rate}</div>
          </button>
        ))}
      </div>

      {/* 当前阶段详情 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="info-card">
          <div className="info-card-title">城市化水平</div>
          <div className="text-lg font-bold text-[var(--accent)]">{current.rate}</div>
        </div>
        <div className="info-card">
          <div className="info-card-title">发展速度</div>
          <div className="text-lg font-bold text-[var(--text-primary)]">{current.speed}</div>
        </div>
        <div className="info-card">
          <div className="info-card-title">主要特征</div>
          <div className="text-sm text-[var(--text-secondary)]">{current.features}</div>
        </div>
      </div>

      {/* 城市化问题 */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">城市化问题</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: '🏠', name: '住房紧张' },
            { icon: '🚗', name: '交通拥堵' },
            { icon: '🏭', name: '环境污染' },
            { icon: '👥', name: '就业困难' },
          ].map(item => (
            <div key={item.name} className="p-3 bg-[var(--bg-tertiary)] rounded-lg text-center">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-sm text-[var(--text-primary)]">{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>城市化标志：城市人口增加、城市人口比重上升、城市用地规模扩大</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>郊区化：人口和产业向郊区迁移；逆城市化：向农村和小城镇迁移</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>发达国家城市化起步早、水平高；发展中国家起步晚、速度快</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
