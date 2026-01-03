import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function PopulationGrowthSimulation() {
  const [selectedModel, setSelectedModel] = useState<'primitive' | 'traditional' | 'modern'>('traditional')

  const models = {
    primitive: { name: '原始型', birth: 40, death: 38, growth: 2, features: '高出生率、高死亡率、低自然增长率' },
    traditional: { name: '传统型', birth: 35, death: 15, growth: 20, features: '高出生率、低死亡率、高自然增长率' },
    modern: { name: '现代型', birth: 12, death: 10, growth: 2, features: '低出生率、低死亡率、低自然增长率' },
  }

  const current = models[selectedModel]

  const chartData = [
    { year: '1800', primitive: 10, traditional: 5, modern: 2 },
    { year: '1850', primitive: 12, traditional: 8, modern: 3 },
    { year: '1900', primitive: 15, traditional: 15, modern: 5 },
    { year: '1950', primitive: 18, traditional: 25, modern: 8 },
    { year: '2000', primitive: 20, traditional: 35, modern: 12 },
    { year: '2050', primitive: 22, traditional: 40, modern: 15 },
  ]

  return (
    <div className="space-y-6">
      {/* 人口金字塔示意 */}
      <div className="relative bg-[var(--bg-primary)] rounded-xl p-6 min-h-[300px]">
        <svg className="w-full h-full" viewBox="0 0 600 280" preserveAspectRatio="xMidYMid meet">
          <text x="300" y="25" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="bold">
            {current.name}人口增长模式
          </text>

          {/* 出生率柱 */}
          <g transform="translate(150, 60)">
            <rect x="0" y={180 - current.birth * 4} width="60" height={current.birth * 4} fill="#22c55e" rx="5" />
            <text x="30" y="200" textAnchor="middle" fill="var(--text-primary)" fontSize="12">出生率</text>
            <text x="30" y={175 - current.birth * 4} textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">{current.birth}‰</text>
          </g>

          {/* 死亡率柱 */}
          <g transform="translate(270, 60)">
            <rect x="0" y={180 - current.death * 4} width="60" height={current.death * 4} fill="#ef4444" rx="5" />
            <text x="30" y="200" textAnchor="middle" fill="var(--text-primary)" fontSize="12">死亡率</text>
            <text x="30" y={175 - current.death * 4} textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">{current.death}‰</text>
          </g>

          {/* 自然增长率柱 */}
          <g transform="translate(390, 60)">
            <rect x="0" y={180 - current.growth * 4} width="60" height={current.growth * 4} fill="#3b82f6" rx="5" />
            <text x="30" y="200" textAnchor="middle" fill="var(--text-primary)" fontSize="12">自然增长率</text>
            <text x="30" y={175 - current.growth * 4} textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">{current.growth}‰</text>
          </g>

          {/* 特征说明 */}
          <text x="300" y="260" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">{current.features}</text>
        </svg>
      </div>

      {/* 模式选择 */}
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(models) as Array<keyof typeof models>).map(key => (
          <button
            key={key}
            onClick={() => setSelectedModel(key)}
            className={`p-3 rounded-lg text-center transition-colors ${
              selectedModel === key
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <div className="font-medium">{models[key].name}</div>
          </button>
        ))}
      </div>

      {/* 人口增长曲线 */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-4">世界人口增长趋势</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="year" stroke="var(--text-secondary)" fontSize={12} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="traditional" name="发展中国家" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="modern" name="发达国家" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>自然增长率 = 出生率 - 死亡率</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>发达国家多为现代型，发展中国家多为传统型向现代型过渡</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>人口问题：发达国家老龄化、劳动力不足；发展中国家人口增长过快</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
