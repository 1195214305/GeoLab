import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSettings } from '../store/settings'
import { Key, Save, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react'

export default function SettingsPage() {
  const { apiKey, setApiKey } = useSettings()
  const [inputKey, setInputKey] = useState(apiKey)
  const [saved, setSaved] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null)

  const handleSave = () => {
    setApiKey(inputKey)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleTest = async () => {
    if (!inputKey) {
      setTestResult('error')
      return
    }

    setTesting(true)
    setTestResult(null)

    try {
      const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${inputKey}`
        },
        body: JSON.stringify({
          model: 'qwen-turbo',
          messages: [{ role: 'user', content: '你好' }],
          max_tokens: 10
        })
      })

      if (response.ok) {
        setTestResult('success')
      } else {
        setTestResult('error')
      }
    } catch {
      setTestResult('error')
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            设置
          </h1>
          <p className="text-[var(--text-secondary)] mb-8">
            配置 AI 辅导功能
          </p>

          {/* API Key Section */}
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center">
                <Key size={20} className="text-[var(--accent)]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                  通义千问 API Key
                </h2>
                <p className="text-sm text-[var(--text-tertiary)]">
                  用于 AI 辅导功能
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSave}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity"
                >
                  {saved ? <CheckCircle size={18} /> : <Save size={18} />}
                  {saved ? '已保存' : '保存'}
                </button>
                <button
                  onClick={handleTest}
                  disabled={testing || !inputKey}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border-color)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-tertiary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {testing ? '测试中...' : '测试连接'}
                </button>
              </div>

              {testResult && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 p-3 rounded-lg ${
                    testResult === 'success'
                      ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                      : 'bg-red-500/10 text-red-600 dark:text-red-400'
                  }`}
                >
                  {testResult === 'success' ? (
                    <>
                      <CheckCircle size={18} />
                      <span>连接成功！API Key 有效</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={18} />
                      <span>连接失败，请检查 API Key 是否正确</span>
                    </>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Help Section */}
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              如何获取 API Key？
            </h3>
            <ol className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-xs font-medium text-[var(--text-primary)]">1</span>
                <span>访问阿里云百炼平台</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-xs font-medium text-[var(--text-primary)]">2</span>
                <span>注册或登录阿里云账号</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-xs font-medium text-[var(--text-primary)]">3</span>
                <span>在控制台创建 API Key</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-xs font-medium text-[var(--text-primary)]">4</span>
                <span>复制 API Key 并粘贴到上方输入框</span>
              </li>
            </ol>
            <a
              href="https://bailian.console.aliyun.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-[var(--accent)] hover:underline"
            >
              <ExternalLink size={16} />
              前往阿里云百炼平台
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
