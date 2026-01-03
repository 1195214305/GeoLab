import { useState } from 'react'

export default function AtmosphereStructureSimulation() {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null)

  const layers = [
    {
      id: 'troposphere',
      name: '对流层',
      height: '0-12km',
      temp: '随高度递减',
      features: ['天气现象发生层', '对流运动显著', '水汽和尘埃集中'],
      color: '#60a5fa',
      yStart: 280,
      yEnd: 220,
    },
    {
      id: 'stratosphere',
      name: '平流层',
      height: '12-50km',
      temp: '随高度递增',
      features: ['臭氧层所在', '大气平稳', '适合飞机飞行'],
      color: '#34d399',
      yStart: 220,
      yEnd: 140,
    },
    {
      id: 'mesosphere',
      name: '中间层',
      height: '50-85km',
      temp: '随高度递减',
      features: ['流星燃烧层', '温度最低可达-90°C'],
      color: '#a78bfa',
      yStart: 140,
      yEnd: 80,
    },
    {
      id: 'thermosphere',
      name: '热层',
      height: '85-500km',
      temp: '随高度递增',
      features: ['电离层所在', '极光发生层', '温度可达1000°C以上'],
      color: '#f472b6',
      yStart: 80,
      yEnd: 30,
    },
  ]

  const selectedLayerData = layers.find(l => l.id === selectedLayer)

  return (
    <div className="space-y-6">
      {/* 演示区域 */}
      <div className="relative bg-[var(--bg-primary)] rounded-xl p-6 min-h-[400px]">
        <svg className="w-full h-full" viewBox="0 0 600 350" preserveAspectRatio="xMidYMid meet">
          {/* 地球表面 */}
          <rect x="50" y="280" width="500" height="50" fill="#22c55e" rx="5" />
          <text x="300" y="310" textAnchor="middle" fill="white" fontSize="14">地球表面</text>

          {/* 大气层 */}
          {layers.map((layer, index) => (
            <g key={layer.id}>
              {/* 层背景 */}
              <rect
                x="50"
                y={layer.yEnd}
                width="500"
                height={layer.yStart - layer.yEnd}
                fill={layer.color}
                opacity={selectedLayer === layer.id ? 0.6 : 0.3}
                className="cursor-pointer transition-opacity"
                onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
              />

              {/* 层名称 */}
              <text
                x="70"
                y={(layer.yStart + layer.yEnd) / 2 + 5}
                fill="var(--text-primary)"
                fontSize="14"
                fontWeight="bold"
              >
                {layer.name}
              </text>

              {/* 高度标注 */}
              <text
                x="530"
                y={(layer.yStart + layer.yEnd) / 2 + 5}
                fill="var(--text-secondary)"
                fontSize="12"
                textAnchor="end"
              >
                {layer.height}
              </text>

              {/* 分界线 */}
              {index < layers.length - 1 && (
                <line
                  x1="50"
                  y1={layer.yEnd}
                  x2="550"
                  y2={layer.yEnd}
                  stroke="var(--border-color)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              )}
            </g>
          ))}

          {/* 温度曲线 */}
          <g>
            <text x="300" y="20" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
              温度变化曲线
            </text>
            <path
              d="M 300 280
                 L 250 250
                 L 200 220
                 L 280 180
                 L 350 140
                 L 250 110
                 L 200 80
                 L 400 50
                 L 450 30"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 温度标记点 */}
            <circle cx="300" cy="280" r="4" fill="#ef4444" />
            <circle cx="200" cy="220" r="4" fill="#ef4444" />
            <circle cx="350" cy="140" r="4" fill="#ef4444" />
            <circle cx="200" cy="80" r="4" fill="#ef4444" />
            <circle cx="450" cy="30" r="4" fill="#ef4444" />
          </g>

          {/* 特殊标注 */}
          {/* 臭氧层 */}
          <g>
            <rect x="150" y="170" width="100" height="30" fill="#fbbf24" opacity="0.5" rx="5" />
            <text x="200" y="190" textAnchor="middle" fill="var(--text-primary)" fontSize="11">臭氧层</text>
          </g>

          {/* 飞机 */}
          <g transform="translate(400, 200)">
            <text fontSize="20">✈️</text>
            <text x="25" y="5" fill="var(--text-tertiary)" fontSize="10">飞机飞行高度</text>
          </g>

          {/* 云 */}
          <g transform="translate(120, 250)">
            <text fontSize="24">☁️</text>
          </g>
          <g transform="translate(380, 260)">
            <text fontSize="20">🌧️</text>
          </g>

          {/* 极光 */}
          <g transform="translate(450, 55)">
            <text fontSize="16">🌌</text>
            <text x="20" y="5" fill="var(--text-tertiary)" fontSize="10">极光</text>
          </g>
        </svg>
      </div>

      {/* 层选择按钮 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {layers.map(layer => (
          <button
            key={layer.id}
            onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
            className={`p-3 rounded-lg text-center transition-all ${
              selectedLayer === layer.id
                ? 'ring-2 ring-[var(--accent)]'
                : ''
            }`}
            style={{ backgroundColor: layer.color + '40' }}
          >
            <div className="font-medium text-[var(--text-primary)]">{layer.name}</div>
            <div className="text-xs text-[var(--text-secondary)]">{layer.height}</div>
          </button>
        ))}
      </div>

      {/* 选中层详情 */}
      {selectedLayerData && (
        <div className="bg-[var(--bg-secondary)] rounded-xl p-4 border-l-4" style={{ borderColor: selectedLayerData.color }}>
          <h4 className="font-bold text-[var(--text-primary)] mb-2">{selectedLayerData.name}</h4>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <span className="text-[var(--text-tertiary)] text-sm">高度范围：</span>
              <span className="text-[var(--text-primary)]">{selectedLayerData.height}</span>
            </div>
            <div>
              <span className="text-[var(--text-tertiary)] text-sm">温度变化：</span>
              <span className="text-[var(--text-primary)]">{selectedLayerData.temp}</span>
            </div>
          </div>
          <div>
            <span className="text-[var(--text-tertiary)] text-sm">主要特征：</span>
            <ul className="mt-1 space-y-1">
              {selectedLayerData.features.map((f, i) => (
                <li key={i} className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedLayerData.color }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 图例 */}
      <div className="geo-legend">
        {layers.map(layer => (
          <div key={layer.id} className="geo-legend-item">
            <div className="geo-legend-color" style={{ backgroundColor: layer.color }} />
            <span>{layer.name}</span>
          </div>
        ))}
        <div className="geo-legend-item">
          <div className="geo-legend-color bg-red-500" />
          <span>温度曲线</span>
        </div>
      </div>

      {/* 知识要点 */}
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>对流层：与人类关系最密切，天气现象都发生在这一层</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>平流层：含有臭氧层，吸收紫外线，大气稳定适合飞机飞行</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>对流层气温递减率约为6°C/km（每升高1000米降低6°C）</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>对流层厚度因纬度而异：低纬17-18km，中纬10-12km，高纬8-9km</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
