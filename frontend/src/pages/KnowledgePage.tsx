import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { getKnowledgePointById, getCategoryById } from '../data/knowledge'
import { ChevronRight, ArrowLeft, MessageCircle, Send, X } from 'lucide-react'
import { useSettings } from '../store/settings'

// 导入模拟组件
import EarthRotationSimulation from '../components/simulations/EarthRotationSimulation'
import EarthRevolutionSimulation from '../components/simulations/EarthRevolutionSimulation'
import DayNightSimulation from '../components/simulations/DayNightSimulation'
import SeasonsSimulation from '../components/simulations/SeasonsSimulation'
import AtmosphereStructureSimulation from '../components/simulations/AtmosphereStructureSimulation'
import HeatBalanceSimulation from '../components/simulations/HeatBalanceSimulation'
import AtmosphericCirculationSimulation from '../components/simulations/AtmosphericCirculationSimulation'
import WeatherSystemsSimulation from '../components/simulations/WeatherSystemsSimulation'
import ClimateTypesSimulation from '../components/simulations/ClimateTypesSimulation'
import WaterCycleSimulation from '../components/simulations/WaterCycleSimulation'
import OceanCurrentsSimulation from '../components/simulations/OceanCurrentsSimulation'
import RiverFeaturesSimulation from '../components/simulations/RiverFeaturesSimulation'
import InternalForcesSimulation from '../components/simulations/InternalForcesSimulation'
import PlateTectonicsSimulation from '../components/simulations/PlateTectonicsSimulation'
import ExternalForcesSimulation from '../components/simulations/ExternalForcesSimulation'
import RiverLandformsSimulation from '../components/simulations/RiverLandformsSimulation'
import WindLandformsSimulation from '../components/simulations/WindLandformsSimulation'
import KarstLandformsSimulation from '../components/simulations/KarstLandformsSimulation'
import PopulationGrowthSimulation from '../components/simulations/PopulationGrowthSimulation'
import PopulationMigrationSimulation from '../components/simulations/PopulationMigrationSimulation'
import PopulationDistributionSimulation from '../components/simulations/PopulationDistributionSimulation'
import UrbanStructureSimulation from '../components/simulations/UrbanStructureSimulation'
import UrbanizationProcessSimulation from '../components/simulations/UrbanizationProcessSimulation'
import AgricultureLocationSimulation from '../components/simulations/AgricultureLocationSimulation'
import IndustryLocationSimulation from '../components/simulations/IndustryLocationSimulation'
import TransportModesSimulation from '../components/simulations/TransportModesSimulation'
import DefaultSimulation from '../components/simulations/DefaultSimulation'

const simulationMap: Record<string, React.ComponentType> = {
  // 宇宙中的地球
  'earth-rotation': EarthRotationSimulation,
  'earth-revolution': EarthRevolutionSimulation,
  'day-night': DayNightSimulation,
  'seasons': SeasonsSimulation,
  // 大气
  'atmosphere-structure': AtmosphereStructureSimulation,
  'heat-balance': HeatBalanceSimulation,
  'atmospheric-circulation': AtmosphericCirculationSimulation,
  'weather-systems': WeatherSystemsSimulation,
  'climate-types': ClimateTypesSimulation,
  // 水
  'water-cycle': WaterCycleSimulation,
  'ocean-currents': OceanCurrentsSimulation,
  'river-features': RiverFeaturesSimulation,
  // 地表形态
  'internal-forces': InternalForcesSimulation,
  'plate-tectonics': PlateTectonicsSimulation,
  'external-forces': ExternalForcesSimulation,
  'river-landforms': RiverLandformsSimulation,
  'wind-landforms': WindLandformsSimulation,
  'karst-landforms': KarstLandformsSimulation,
  // 人口
  'population-growth': PopulationGrowthSimulation,
  'population-migration': PopulationMigrationSimulation,
  'population-distribution': PopulationDistributionSimulation,
  // 城市
  'urban-structure': UrbanStructureSimulation,
  'urbanization-process': UrbanizationProcessSimulation,
  'urban-planning': UrbanStructureSimulation,
  // 农业
  'agriculture-location': AgricultureLocationSimulation,
  'agriculture-types': AgricultureLocationSimulation,
  // 工业
  'industry-location': IndustryLocationSimulation,
  'industry-transfer': IndustryLocationSimulation,
  // 交通
  'transport-modes': TransportModesSimulation,
  'transport-layout': TransportModesSimulation,
  // 选修内容复用
  'solar-altitude': SeasonsSimulation,
  'day-length': DayNightSimulation,
  'pressure-systems': WeatherSystemsSimulation,
  'monsoon': AtmosphericCirculationSimulation,
  'groundwater': WaterCycleSimulation,
  'lake-wetland': RiverFeaturesSimulation,
  'regional-characteristics': PopulationDistributionSimulation,
  'regional-strategy': UrbanizationProcessSimulation,
  'resource-distribution': IndustryLocationSimulation,
  'environmental-issues': ClimateTypesSimulation,
  'energy-security': IndustryLocationSimulation,
  'food-security': AgricultureLocationSimulation,
  'biodiversity': ClimateTypesSimulation,
  'climate-change': HeatBalanceSimulation,
}

export default function KnowledgePage() {
  const { knowledgeId } = useParams<{ knowledgeId: string }>()
  const point = getKnowledgePointById(knowledgeId || '')
  const category = point ? getCategoryById(point.category) : null
  const { apiKey } = useSettings()

  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  if (!point) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            未找到该知识点
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

  const SimulationComponent = simulationMap[point.id] || DefaultSimulation

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      if (!apiKey) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '请先在设置页面配置通义千问 API Key 才能使用 AI 辅导功能。'
        }])
        setLoading(false)
        return
      }

      const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'qwen-turbo',
          messages: [
            {
              role: 'system',
              content: `你是一位专业的高中地理老师，正在辅导学生学习"${point.title}"这个知识点。
知识点描述：${point.description}
关键词：${point.keywords.join('、')}

请根据学生的问题，提供清晰、准确的地理知识解答。
- 使用简洁易懂的语言
- 结合具体例子和地理原理解释
- 适当使用专业术语，但要解释其含义
- 鼓励学生思考和探索
- 如果涉及地图或图表，用文字描述清楚
- 如果涉及计算，给出详细的解题步骤`
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ],
          max_tokens: 800,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()
      const assistantMessage = data.choices[0]?.message?.content || '抱歉，我暂时无法回答这个问题。'

      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '抱歉，请求失败。请检查你的 API Key 是否正确，或稍后重试。'
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-8 flex-wrap">
          <Link to="/" className="hover:text-[var(--text-primary)]">首页</Link>
          <ChevronRight size={16} />
          {category && (
            <>
              <Link to={`/category/${category.id}`} className="hover:text-[var(--text-primary)]">
                {category.name}
              </Link>
              <ChevronRight size={16} />
            </>
          )}
          <span className="text-[var(--text-primary)]">{point.title}</span>
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
            {point.title}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] mb-4">
            {point.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {point.keywords.map(keyword => (
              <span
                key={keyword}
                className="px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)]"
              >
                {keyword}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Simulation Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden">
            <div className="p-4 border-b border-[var(--border-color)]">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                交互式演示
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              <SimulationComponent />
            </div>
          </div>
        </motion.div>

        {/* AI Chat Button */}
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--accent)] text-white shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity z-40"
        >
          <MessageCircle size={24} />
        </button>

        {/* AI Chat Panel */}
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 w-[calc(100%-3rem)] sm:w-96 h-[500px] max-h-[70vh] rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-2xl flex flex-col z-50"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">AI 辅导</h3>
                <p className="text-xs text-[var(--text-tertiary)]">通义千问</p>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-[var(--text-tertiary)] py-8">
                  <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">有问题就问我吧！</p>
                  <p className="text-xs mt-1">关于「{point.title}」的任何问题</p>
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-primary)]'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[var(--bg-secondary)] px-4 py-2 rounded-lg">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-[var(--text-tertiary)] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[var(--text-tertiary)] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[var(--text-tertiary)] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-[var(--border-color)]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="输入你的问题..."
                  className="flex-1 px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)]"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || loading}
                  className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
