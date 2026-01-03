import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getCategoryById } from '../data/knowledge'
import { ChevronRight, ArrowLeft, Globe, Users, Mountain, Map, Shield, LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  users: Users,
  mountain: Mountain,
  map: Map,
  shield: Shield,
}

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const category = getCategoryById(categoryId || '')

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            未找到该分类
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <ArrowLeft size={20} />
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  const Icon = iconMap[category.icon] || Globe

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-8">
          <Link to="/" className="hover:text-[var(--text-primary)]">首页</Link>
          <ChevronRight size={16} />
          <span className="text-[var(--text-primary)]">{category.name}</span>
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-[var(--accent)] flex items-center justify-center">
              <Icon size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
                {category.name}
              </h1>
              <p className="text-[var(--text-secondary)]">
                {category.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Subcategories */}
        <div className="space-y-12">
          {category.subcategories.map((subcategory, subIndex) => (
            <motion.div
              key={subcategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * subIndex }}
            >
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-color)]">
                {subcategory.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subcategory.knowledgePoints.map((point, pointIndex) => (
                  <motion.div
                    key={point.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 * pointIndex }}
                  >
                    <Link
                      to={`/knowledge/${point.id}`}
                      className="block p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-all group"
                    >
                      <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                        {point.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">
                        {point.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {point.keywords.slice(0, 3).map(keyword => (
                          <span
                            key={keyword}
                            className="px-2 py-0.5 rounded text-xs bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
