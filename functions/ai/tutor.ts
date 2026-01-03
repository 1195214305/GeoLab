/**
 * GeoLab Edge Function - AI 地理辅导
 * 基于阿里云 ESA Pages 边缘计算
 */

export default async function handler(request: Request): Promise<Response> {
  // CORS 头
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  }

  // 处理 OPTIONS 请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const url = new URL(request.url)
  const path = url.pathname

  try {
    // AI 地理辅导接口
    if (path === '/api/ai/tutor' && request.method === 'POST') {
      const body = await request.json()
      const { question, knowledgeId, context, apiKey } = body

      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: 'API Key is required' }),
          { status: 400, headers: corsHeaders }
        )
      }

      // 调用通义千问 API
      const response = await callQwenAPI(question, knowledgeId, context, apiKey)

      return new Response(JSON.stringify(response), { headers: corsHeaders })
    }

    // 获取知识点提示
    if (path === '/api/hints' && request.method === 'GET') {
      const knowledgeId = url.searchParams.get('knowledgeId')

      if (!knowledgeId) {
        return new Response(
          JSON.stringify({ error: 'knowledgeId is required' }),
          { status: 400, headers: corsHeaders }
        )
      }

      const hints = getKnowledgeHints(knowledgeId)

      return new Response(JSON.stringify(hints), { headers: corsHeaders })
    }

    // 健康检查
    if (path === '/api/health') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          service: 'GeoLab Edge Function',
          timestamp: new Date().toISOString(),
          region: 'edge'
        }),
        { headers: corsHeaders }
      )
    }

    // 404
    return new Response(
      JSON.stringify({ error: 'Not Found' }),
      { status: 404, headers: corsHeaders }
    )

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: corsHeaders }
    )
  }
}

// 调用通义千问 API
async function callQwenAPI(question: string, knowledgeId: string, context: any, apiKey: string) {
  const systemPrompt = `你是一位专业的高中地理老师，正在辅导学生学习地理知识。
当前知识点：${getKnowledgeName(knowledgeId)}

请根据学生的问题，提供清晰、准确的地理知识解答。
- 使用简洁易懂的语言
- 结合具体例子和地理原理解释
- 适当使用专业术语，但要解释其含义
- 鼓励学生思考和探索
- 如果涉及地图或图表，用文字描述清楚
- 如果涉及计算（如时区、太阳高度角），给出详细的解题步骤

上下文信息：${JSON.stringify(context)}`

  try {
    const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        max_tokens: 800,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error('API request failed')
    }

    const data = await response.json()
    return {
      success: true,
      answer: data.choices[0]?.message?.content || '抱歉，我暂时无法回答这个问题。',
      knowledgeId
    }
  } catch (error) {
    // 返回预设回答
    return {
      success: true,
      answer: getPresetAnswer(knowledgeId, question),
      knowledgeId,
      isPreset: true
    }
  }
}

// 获取知识点名称
function getKnowledgeName(knowledgeId: string): string {
  const names: Record<string, string> = {
    'earth-rotation': '地球的自转',
    'earth-revolution': '地球的公转',
    'day-night': '昼夜交替与时差',
    'seasons': '四季变化',
    'atmosphere-structure': '大气的垂直分层',
    'heat-balance': '大气的受热过程',
    'atmospheric-circulation': '大气环流',
    'weather-systems': '常见天气系统',
    'climate-types': '世界气候类型',
    'water-cycle': '水循环',
    'ocean-currents': '洋流',
    'river-features': '河流特征',
    'internal-forces': '内力作用',
    'plate-tectonics': '板块构造',
    'external-forces': '外力作用',
    'river-landforms': '河流地貌',
    'wind-landforms': '风成地貌',
    'karst-landforms': '喀斯特地貌',
    'population-growth': '人口增长模式',
    'population-migration': '人口迁移',
    'population-distribution': '人口分布',
    'urban-structure': '城市内部空间结构',
    'urbanization-process': '城市化进程',
    'agriculture-location': '农业区位因素',
    'industry-location': '工业区位因素',
    'transport-modes': '交通运输方式'
  }
  return names[knowledgeId] || '地理知识'
}

// 预设回答
function getPresetAnswer(knowledgeId: string, question: string): string {
  const answers: Record<string, Record<string, string>> = {
    'earth-rotation': {
      default: '地球自转是地球绕地轴自西向东旋转的运动。自转周期约为23时56分4秒（恒星日），产生昼夜交替、地方时差异、地转偏向力等地理现象。',
      '速度': '地球自转角速度除两极外各地相同，约15°/小时；线速度从赤道向两极递减，赤道最大约1670km/h。',
      '方向': '地球自转方向是自西向东。从北极上空看为逆时针，从南极上空看为顺时针。'
    },
    'atmospheric-circulation': {
      default: '大气环流是全球性有规律的大气运动，包括三圈环流和季风环流。三圈环流形成了七个气压带和六个风带。',
      '三圈': '三圈环流包括低纬环流（哈德莱环流）、中纬环流（费雷尔环流）和高纬环流（极地环流）。',
      '季风': '季风是由于海陆热力性质差异和气压带风带季节移动形成的大范围风向随季节变化的现象。'
    },
    'water-cycle': {
      default: '水循环是地球上各种水体通过蒸发、水汽输送、降水、径流等环节不断循环的过程。主要包括海陆间循环、陆地内循环和海上内循环。',
      '意义': '水循环的意义：维持全球水量平衡、更新陆地淡水资源、调节气候、塑造地表形态、联系各圈层。'
    },
    'plate-tectonics': {
      default: '板块构造学说认为岩石圈分为六大板块，漂浮在软流层上运动。板块边界是地震、火山活动集中的地带。',
      '边界': '板块边界分为生长边界（张裂）和消亡边界（碰撞）。生长边界形成海岭、裂谷；消亡边界形成山脉、海沟。'
    }
  }

  const knowledgeAnswers = answers[knowledgeId] || {}

  // 简单关键词匹配
  for (const [keyword, answer] of Object.entries(knowledgeAnswers)) {
    if (keyword !== 'default' && question.includes(keyword)) {
      return answer
    }
  }

  return knowledgeAnswers.default || '这是一个很好的问题！建议你仔细观察演示动画，结合课本上的知识进行分析。如果还有疑问，可以尝试调整参数，观察结果的变化。'
}

// 获取知识点提示
function getKnowledgeHints(knowledgeId: string) {
  const hints: Record<string, string[]> = {
    'earth-rotation': [
      '地球自转方向：自西向东',
      '自转周期：恒星日约23时56分',
      '角速度：除两极外各地相同，约15°/小时',
      '线速度：从赤道向两极递减'
    ],
    'atmospheric-circulation': [
      '三圈环流：低纬、中纬、高纬环流',
      '七个气压带：赤道低压、副热带高压、副极地低压、极地高压',
      '六个风带：信风带、西风带、极地东风带',
      '气压带风带随太阳直射点移动'
    ],
    'water-cycle': [
      '水循环环节：蒸发、水汽输送、降水、径流',
      '海陆间循环是最重要的水循环类型',
      '水循环动力：太阳辐射和重力',
      '人类活动可以影响水循环的部分环节'
    ],
    'plate-tectonics': [
      '六大板块：亚欧、非洲、印度洋、太平洋、美洲、南极洲',
      '板块边界是地震火山集中带',
      '生长边界：张裂，形成海岭裂谷',
      '消亡边界：碰撞，形成山脉海沟'
    ]
  }

  return {
    knowledgeId,
    hints: hints[knowledgeId] || ['仔细观察演示动画', '结合课本知识理解', '尝试调整参数观察变化']
  }
}
