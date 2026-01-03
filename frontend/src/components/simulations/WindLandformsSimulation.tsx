import { useState } from 'react'

export default function WindLandformsSimulation() {
  const [selectedType, setSelectedType] = useState<'erosion' | 'deposition'>('erosion')

  return (
    <div className="space-y-6">
      <div className="relative bg-gradient-to-b from-amber-200 to-amber-400 rounded-xl p-6 min-h-[300px]">
        <svg className="w-full h-full" viewBox="0 0 600 280" preserveAspectRatio="xMidYMid meet">
          {selectedType === 'erosion' && (
            <g>
              <text x="300" y="30" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="bold">风力侵蚀地貌</text>

              {/* 风蚀蘑菇 */}
              <g transform="translate(100, 80)">
                <ellipse cx="50" cy="20" rx="50" ry="30" fill="#9ca3af" />
                <rect x="30" y="20" width="40" height="100" fill="#6b7280" />
                <text x="50" y="140" textAnchor="middle" fill="var(--text-primary)" fontSize="11">风蚀蘑菇</text>
                <path d="M -30 70 L 20 70" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrowT)" />
                <text x="-10" y="60" fill="var(--accent)" fontSize="9">风</text>
              </g>

              {/* 雅丹地貌 */}
              <g transform="translate(280, 80)">
                <rect x="0" y="60" width="20" height="60" fill="#9ca3af" />
                <rect x="30" y="40" width="25" height="80" fill="#6b7280" />
                <rect x="65" y="50" width="18" height="70" fill="#9ca3af" />
                <rect x="93" y="35" width="22" height="85" fill="#6b7280" />
                <text x="60" y="140" textAnchor="middle" fill="var(--text-primary)" fontSize="11">雅丹地貌</text>
              </g>

              {/* 风蚀洼地 */}
              <g transform="translate(450, 100)">
                <path d="M 0 60 Q 50 100 100 60" fill="#d4a574" />
                <ellipse cx="50" cy="75" rx="40" ry="15" fill="#0ea5e9" opacity="0.5" />
                <text x="50" y="120" textAnchor="middle" fill="var(--text-primary)" fontSize="11">风蚀洼地</text>
              </g>
            </g>
          )}

          {selectedType === 'deposition' && (
            <g>
              <text x="300" y="30" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="bold">风力沉积地貌</text>

              {/* 沙丘 */}
              <g transform="translate(80, 100)">
                <path d="M 0 100 Q 40 40 80 100 Q 120 40 160 100" fill="#eab308" />
                <text x="80" y="120" textAnchor="middle" fill="var(--text-primary)" fontSize="11">新月形沙丘</text>
                <path d="M -20 70 L 30 70" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrowT)" />
                <text x="0" y="60" fill="var(--accent)" fontSize="9">风向</text>
              </g>

              {/* 黄土高原 */}
              <g transform="translate(300, 60)">
                <rect x="0" y="80" width="200" height="60" fill="#d4a574" />
                <path d="M 0 80 Q 30 60 60 80 Q 90 60 120 80 Q 150 60 180 80 L 200 80" fill="#d4a574" />
                {/* 沟壑 */}
                <path d="M 40 80 L 50 140" stroke="#92400e" strokeWidth="2" />
                <path d="M 100 80 L 110 140" stroke="#92400e" strokeWidth="2" />
                <path d="M 150 80 L 160 140" stroke="#92400e" strokeWidth="2" />
                <text x="100" y="160" textAnchor="middle" fill="var(--text-primary)" fontSize="11">黄土高原</text>
                <text x="100" y="175" textAnchor="middle" fill="var(--text-secondary)" fontSize="9">风力沉积+流水侵蚀</text>
              </g>
            </g>
          )}

          <defs>
            <marker id="arrowT" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setSelectedType('erosion')}
          className={`p-4 rounded-lg text-center transition-colors ${
            selectedType === 'erosion' ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
          }`}
        >
          <div className="font-medium">风蚀地貌</div>
          <div className="text-sm opacity-80">风蚀蘑菇、雅丹、风蚀洼地</div>
        </button>
        <button
          onClick={() => setSelectedType('deposition')}
          className={`p-4 rounded-lg text-center transition-colors ${
            selectedType === 'deposition' ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
          }`}
        >
          <div className="font-medium">风积地貌</div>
          <div className="text-sm opacity-80">沙丘、黄土高原</div>
        </button>
      </div>

      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
        <h4 className="font-medium text-[var(--text-primary)] mb-3">知识要点</h4>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>风蚀地貌主要分布在干旱半干旱地区</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>沙丘迎风坡缓、背风坡陡，可判断风向</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">•</span>
            <span>黄土高原是风力沉积形成，后经流水侵蚀形成千沟万壑</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
