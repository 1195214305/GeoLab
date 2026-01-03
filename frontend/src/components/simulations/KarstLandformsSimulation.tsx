import { useState } from 'react'

export default function KarstLandformsSimulation() {
  const [selectedFeature, setSelectedFeature] = useState<'surface' | 'underground'>('surface')

  return (
    <div className="space-y-6">
      <div className="relative bg-gradient-to-b from-sky-200 to-green-200 rounded-xl p-6 min-h-[320px]">
        <svg className="w-full h-full" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
          {selectedFeature === 'surface' && (
            <g>
              <text x="300" y="25" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="bold">地表喀斯特地貌</text>

              {/* 峰林 */}
              <g transform="translate(50, 50)">
                <path d="M 0 180 L 30 80 L 60 180" fill="#6b7280" />
                <path d="M 50 180 L 90 60 L 130 180" fill="#9ca3af" />
                <path d="M 110 180 L 150 90 L 190 180" fill="#6b7280" />
                <text x="95" y="200" textAnchor="middle" fill="var(--text-primary)" fontSize="11">峰林</text>
              </g>

              {/* 石林 */}
              <g transform="translate(280, 80)">
                <rect x="0" y="50" width="15" height="100" fill="#6b7280" />
                <rect x="25" y="30" width="12" height="120" fill="#9ca3af" />
                <rect x="47" y="60" width="18" height="90" fill="#6b7280" />
                <rect x="75" y="40" width="14" height="110" fill="#9ca3af" />
                <text x="45" y="170" textAnchor="middle" fill="var(--text-primary)" fontSize="11">石林</text>
              </g>

              {/* 溶蚀洼地 */}
              <g transform="translate(420, 100)">
                <path d="M 0 80 Q 60 130 120 80" fill="#22c55e" />
                <ellipse cx="60" cy="100" rx="50" ry="20" fill="#0ea5e9" opacity="0.5" />
                <text x="60" y="140" textAnchor="middle" fill="var(--text-primary)" fontSize="11">溶蚀洼地</text>
              </g>

              {/* 落水洞 */}
              <g transform="translate(200, 180)">
                <ellipse cx="30" cy="20" rx="25" ry="15" fill="#1e3a5f" />
                <text x="30" y="50" textAnchor="middle" fill="var(--text-primary)" fontSize="10">落水洞</text>
              </g>
            </g>
          )}

          {selectedFeature === 'underground' && (
            <g>
              <text x="300" y="25" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="bold">地下喀斯特地貌</text>

              {/* 地表 */}
              <rect x="50" y="60" width="500" height="20" fill="#22c55e" />

              {/* 溶洞 */}
              <ellipse cx="300" cy="160" rx="180" ry="80" fill="#1e3a5f" />

              {/* 钟乳石 */}
              <g>
                <path d="M 180 80 L 185 130 L 175 130 Z" fill="#d4a574" />
                <path d="M 250 80 L 258 150 L 242 150 Z" fill="#d4a574" />
                <path d="M 320 80 L 330 140 L 310 140 Z" fill="#d4a574" />
                <path d="M 400 80 L 408 120 L 392 120 Z" fill="#d4a574" />
                <text x="290" y="100" fill="var(--text-primary)" fontSize="10">钟乳石</text>
              </g>

              {/* 石笋 */}
              <g>
                <path d="M 200 240 L 210 180 L 190 180 Z" fill="#d4a574" />
                <path d="M 280 240 L 295 160 L 265 160 Z" fill="#d4a574" />
                <path d="M 370 240 L 385 190 L 355 190 Z" fill="#d4a574" />
                <text x="280" y="220" fill="var(--text-primary)" fontSize="10">石笋</text>
              </g>

              {/* 石柱 */}
              <rect x="430" y="80" width="20" height="160" fill="#d4a574" rx="5" />
              <text x="440" y="270" textAnchor="middle" fill="var(--text-primary)" fontSize="10">石柱</text>

              {/* 地下河 */}
              <path d="M 100 200 Q 200 220 300 200 Q 400 180 500 200" fill="none" stroke="#0ea5e9" strokeWidth="8" opacity="0.7" />
              <text x="300" y="250" textAnchor="middle" fill="#0ea5e9" fontSize="10">地下河</text>
            </g>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setSelectedFeature('surface')}
          className={`p-4 rounded-lg text-center transition-colors ${
            selectedFeature === 'surface' ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
          }`}
        >
          <div className="font-medium">地表喀斯特</div>
          <div className="text-sm opacity-80">峰林、石林、溶蚀洼地</div>
        </button>
        <button
          onClick={() => setSelectedFeature('underground')}
          className={`p-4 rounded-lg text-center transition-colors ${
            selectedFeature === 'underground' ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
          }`}
        >
          <div className="font-medium">地下喀斯特</div>
          <div className="text-sm opacity-80">溶洞、钟乳石、石笋、地下河</div>
        </button>
      </div>

      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>喀斯特地貌形成条件：可溶性岩石（石灰�ite）+ 水的溶蚀作用</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>我国喀斯特地貌主要分布在云贵高原、广西等地</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>钟乳石从上往下生长，石笋从下往上生长，相连形成石柱</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
