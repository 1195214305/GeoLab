export interface KnowledgePoint {
  id: string
  title: string
  description: string
  category: string
  subcategory: string
  hasSimulation: boolean
  keywords: string[]
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  subcategories: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
  knowledgePoints: KnowledgePoint[]
}

// 必修一：自然地理
const required1: Category = {
  id: 'required1',
  name: '自然地理基础',
  description: '必修一：宇宙中的地球、地球上的大气、地球上的水、地表形态的塑造',
  icon: 'globe',
  subcategories: [
    {
      id: 'earth-universe',
      name: '宇宙中的地球',
      knowledgePoints: [
        { id: 'earth-rotation', title: '地球的自转', description: '地球绕地轴自西向东旋转，产生昼夜交替、地方时差异等现象', category: 'required1', subcategory: 'earth-universe', hasSimulation: true, keywords: ['自转', '昼夜交替', '地方时', '角速度', '线速度'] },
        { id: 'earth-revolution', title: '地球的公转', description: '地球绕太阳公转，产生四季变化、昼夜长短变化等现象', category: 'required1', subcategory: 'earth-universe', hasSimulation: true, keywords: ['公转', '四季', '黄赤交角', '太阳直射点'] },
        { id: 'day-night', title: '昼夜交替与时差', description: '地球自转导致昼夜交替，不同经度产生时差', category: 'required1', subcategory: 'earth-universe', hasSimulation: true, keywords: ['昼夜', '晨昏线', '时区', '区时'] },
        { id: 'seasons', title: '四季变化', description: '地球公转和黄赤交角导致四季更替和昼夜长短变化', category: 'required1', subcategory: 'earth-universe', hasSimulation: true, keywords: ['四季', '节气', '昼夜长短', '正午太阳高度'] }
      ]
    },
    {
      id: 'atmosphere',
      name: '地球上的大气',
      knowledgePoints: [
        { id: 'atmosphere-structure', title: '大气的垂直分层', description: '大气层按温度变化分为对流层、平流层、高层大气', category: 'required1', subcategory: 'atmosphere', hasSimulation: true, keywords: ['对流层', '平流层', '大气分层', '气温垂直变化'] },
        { id: 'heat-balance', title: '大气的受热过程', description: '太阳辐射、地面辐射、大气逆辐射之间的能量传递', category: 'required1', subcategory: 'atmosphere', hasSimulation: true, keywords: ['太阳辐射', '地面辐射', '大气逆辐射', '温室效应'] },
        { id: 'atmospheric-circulation', title: '大气环流', description: '三圈环流、季风环流等全球性大气运动', category: 'required1', subcategory: 'atmosphere', hasSimulation: true, keywords: ['三圈环流', '信风', '西风', '季风'] },
        { id: 'weather-systems', title: '常见天气系统', description: '气旋、反气旋、锋面等天气系统的形成与影响', category: 'required1', subcategory: 'atmosphere', hasSimulation: true, keywords: ['气旋', '反气旋', '冷锋', '暖锋', '准静止锋'] },
        { id: 'climate-types', title: '世界气候类型', description: '全球主要气候类型的分布、特征和成因', category: 'required1', subcategory: 'atmosphere', hasSimulation: true, keywords: ['热带', '温带', '寒带', '气候分布'] }
      ]
    },
    {
      id: 'hydrosphere',
      name: '地球上的水',
      knowledgePoints: [
        { id: 'water-cycle', title: '水循环', description: '海陆间循环、陆地内循环、海上内循环的过程', category: 'required1', subcategory: 'hydrosphere', hasSimulation: true, keywords: ['蒸发', '降水', '径流', '水循环'] },
        { id: 'ocean-currents', title: '洋流', description: '世界洋流的分布规律及其对地理环境的影响', category: 'required1', subcategory: 'hydrosphere', hasSimulation: true, keywords: ['暖流', '寒流', '洋流分布', '渔场'] },
        { id: 'river-features', title: '河流特征', description: '河流的水文特征及其影响因素', category: 'required1', subcategory: 'hydrosphere', hasSimulation: true, keywords: ['流量', '水位', '含沙量', '结冰期'] }
      ]
    },
    {
      id: 'lithosphere',
      name: '地表形态的塑造',
      knowledgePoints: [
        { id: 'internal-forces', title: '内力作用', description: '地壳运动、岩浆活动、变质作用等内力作用', category: 'required1', subcategory: 'lithosphere', hasSimulation: true, keywords: ['地壳运动', '褶皱', '断层', '火山', '地震'] },
        { id: 'plate-tectonics', title: '板块构造', description: '六大板块的分布及板块运动', category: 'required1', subcategory: 'lithosphere', hasSimulation: true, keywords: ['板块', '张裂', '碰撞', '消亡边界', '生长边界'] },
        { id: 'external-forces', title: '外力作用', description: '风化、侵蚀、搬运、沉积等外力作用', category: 'required1', subcategory: 'lithosphere', hasSimulation: true, keywords: ['风化', '侵蚀', '搬运', '沉积'] },
        { id: 'river-landforms', title: '河流地貌', description: '河流侵蚀地貌和堆积地貌的形成', category: 'required1', subcategory: 'lithosphere', hasSimulation: true, keywords: ['V形谷', '冲积扇', '三角洲', '河漫滩'] },
        { id: 'wind-landforms', title: '风成地貌', description: '风力侵蚀和堆积形成的地貌', category: 'required1', subcategory: 'lithosphere', hasSimulation: true, keywords: ['风蚀蘑菇', '雅丹', '沙丘', '黄土高原'] },
        { id: 'karst-landforms', title: '喀斯特地貌', description: '石灰�ite溶蚀形成的特殊地貌', category: 'required1', subcategory: 'lithosphere', hasSimulation: true, keywords: ['溶洞', '石林', '峰林', '地下河'] }
      ]
    }
  ]
}

// 必修二：人文地理
const required2: Category = {
  id: 'required2',
  name: '人文地理基础',
  description: '必修二：人口、城市、农业、工业、交通',
  icon: 'users',
  subcategories: [
    {
      id: 'population',
      name: '人口',
      knowledgePoints: [
        { id: 'population-growth', title: '人口增长模式', description: '原始型、传统型、现代型人口增长模式的特点', category: 'required2', subcategory: 'population', hasSimulation: true, keywords: ['出生率', '死亡率', '自然增长率', '人口转型'] },
        { id: 'population-migration', title: '人口迁移', description: '人口迁移的类型、原因和影响', category: 'required2', subcategory: 'population', hasSimulation: true, keywords: ['迁移', '推拉理论', '城市化', '人口流动'] },
        { id: 'population-distribution', title: '人口分布', description: '世界人口分布规律及影响因素', category: 'required2', subcategory: 'population', hasSimulation: true, keywords: ['人口密度', '人口分布', '稀疏区', '稠密区'] }
      ]
    },
    {
      id: 'urbanization',
      name: '城市与城市化',
      knowledgePoints: [
        { id: 'urban-structure', title: '城市内部空间结构', description: '城市功能分区及其形成原因', category: 'required2', subcategory: 'urbanization', hasSimulation: true, keywords: ['CBD', '住宅区', '工业区', '功能分区'] },
        { id: 'urbanization-process', title: '城市化进程', description: '城市化的标志、阶段和问题', category: 'required2', subcategory: 'urbanization', hasSimulation: true, keywords: ['城市化率', '郊区化', '逆城市化', '再城市化'] },
        { id: 'urban-planning', title: '城市规划', description: '城市规划的原则和方法', category: 'required2', subcategory: 'urbanization', hasSimulation: true, keywords: ['规划', '布局', '交通', '环境'] }
      ]
    },
    {
      id: 'agriculture',
      name: '农业',
      knowledgePoints: [
        { id: 'agriculture-location', title: '农业区位因素', description: '影响农业生产的自然和社会经济因素', category: 'required2', subcategory: 'agriculture', hasSimulation: true, keywords: ['气候', '地形', '土壤', '市场', '交通'] },
        { id: 'agriculture-types', title: '农业地域类型', description: '世界主要农业地域类型的分布和特点', category: 'required2', subcategory: 'agriculture', hasSimulation: true, keywords: ['水稻种植', '商品谷物', '混合农业', '乳畜业'] }
      ]
    },
    {
      id: 'industry',
      name: '工业',
      knowledgePoints: [
        { id: 'industry-location', title: '工业区位因素', description: '影响工业布局的主要因素', category: 'required2', subcategory: 'industry', hasSimulation: true, keywords: ['原料', '市场', '劳动力', '技术', '交通'] },
        { id: 'industry-transfer', title: '产业转移', description: '产业转移的原因、方向和影响', category: 'required2', subcategory: 'industry', hasSimulation: true, keywords: ['转移', '承接', '产业升级', '区域发展'] }
      ]
    },
    {
      id: 'transportation',
      name: '交通运输',
      knowledgePoints: [
        { id: 'transport-modes', title: '交通运输方式', description: '五种主要交通运输方式的特点和选择', category: 'required2', subcategory: 'transportation', hasSimulation: true, keywords: ['铁路', '公路', '水运', '航空', '管道'] },
        { id: 'transport-layout', title: '交通运输布局', description: '交通运输网络的形成和影响因素', category: 'required2', subcategory: 'transportation', hasSimulation: true, keywords: ['枢纽', '网络', '布局', '区位'] }
      ]
    }
  ]
}

// 选择性必修一：自然地理基础
const elective1: Category = {
  id: 'elective1',
  name: '自然地理深化',
  description: '选择性必修一：地球运动深化、大气深化、水文深化、地貌深化',
  icon: 'mountain',
  subcategories: [
    {
      id: 'earth-motion-advanced',
      name: '地球运动深化',
      knowledgePoints: [
        { id: 'solar-altitude', title: '太阳高度角', description: '正午太阳高度角的计算和应用', category: 'elective1', subcategory: 'earth-motion-advanced', hasSimulation: true, keywords: ['太阳高度', '正午', '计算', '影子'] },
        { id: 'day-length', title: '昼夜长短计算', description: '不同纬度、不同日期的昼夜长短变化', category: 'elective1', subcategory: 'earth-motion-advanced', hasSimulation: true, keywords: ['昼长', '夜长', '极昼', '极夜'] }
      ]
    },
    {
      id: 'atmosphere-advanced',
      name: '大气深化',
      knowledgePoints: [
        { id: 'pressure-systems', title: '气压系统', description: '高压、低压系统的形成和天气特征', category: 'elective1', subcategory: 'atmosphere-advanced', hasSimulation: true, keywords: ['高压', '低压', '气压带', '风带'] },
        { id: 'monsoon', title: '季风气候', description: '东亚季风和南亚季风的成因和特点', category: 'elective1', subcategory: 'atmosphere-advanced', hasSimulation: true, keywords: ['夏季风', '冬季风', '雨季', '旱季'] }
      ]
    },
    {
      id: 'hydrology-advanced',
      name: '水文深化',
      knowledgePoints: [
        { id: 'groundwater', title: '地下水', description: '地下水的类型、分布和利用', category: 'elective1', subcategory: 'hydrology-advanced', hasSimulation: true, keywords: ['潜水', '承压水', '含水层', '泉'] },
        { id: 'lake-wetland', title: '湖泊与湿地', description: '湖泊和湿地的形成、功能和保护', category: 'elective1', subcategory: 'hydrology-advanced', hasSimulation: true, keywords: ['湖泊', '湿地', '生态', '调节'] }
      ]
    }
  ]
}

// 选择性必修二：区域发展
const elective2: Category = {
  id: 'elective2',
  name: '区域发展',
  description: '选择性必修二：区域与区域发展、资源与环境、区域联系',
  icon: 'map',
  subcategories: [
    {
      id: 'regional-development',
      name: '区域与区域发展',
      knowledgePoints: [
        { id: 'regional-characteristics', title: '区域特征分析', description: '区域的概念、特征和划分', category: 'elective2', subcategory: 'regional-development', hasSimulation: true, keywords: ['区域', '特征', '差异', '联系'] },
        { id: 'regional-strategy', title: '区域发展战略', description: '不同区域的发展战略和模式', category: 'elective2', subcategory: 'regional-development', hasSimulation: true, keywords: ['战略', '发展', '协调', '可持续'] }
      ]
    },
    {
      id: 'resources-environment',
      name: '资源与环境',
      knowledgePoints: [
        { id: 'resource-distribution', title: '资源分布', description: '自然资源的分布规律和开发利用', category: 'elective2', subcategory: 'resources-environment', hasSimulation: true, keywords: ['矿产', '能源', '水资源', '土地资源'] },
        { id: 'environmental-issues', title: '环境问题', description: '主要环境问题的成因和治理', category: 'elective2', subcategory: 'resources-environment', hasSimulation: true, keywords: ['污染', '生态破坏', '治理', '保护'] }
      ]
    }
  ]
}

// 选择性必修三：资源、环境与国家安全
const elective3: Category = {
  id: 'elective3',
  name: '资源环境与安全',
  description: '选择性必修三：资源安全、环境安全、生态安全',
  icon: 'shield',
  subcategories: [
    {
      id: 'resource-security',
      name: '资源安全',
      knowledgePoints: [
        { id: 'energy-security', title: '能源安全', description: '能源资源的战略意义和安全保障', category: 'elective3', subcategory: 'resource-security', hasSimulation: true, keywords: ['石油', '天然气', '新能源', '能源战略'] },
        { id: 'food-security', title: '粮食安全', description: '粮食生产和供应的安全保障', category: 'elective3', subcategory: 'resource-security', hasSimulation: true, keywords: ['粮食', '耕地', '农业', '安全'] }
      ]
    },
    {
      id: 'ecological-security',
      name: '生态安全',
      knowledgePoints: [
        { id: 'biodiversity', title: '生物多样性', description: '生物多样性的价值和保护', category: 'elective3', subcategory: 'ecological-security', hasSimulation: true, keywords: ['物种', '生态系统', '保护区', '濒危'] },
        { id: 'climate-change', title: '全球气候变化', description: '全球变暖的原因、影响和应对', category: 'elective3', subcategory: 'ecological-security', hasSimulation: true, keywords: ['温室效应', '海平面', '碳排放', '低碳'] }
      ]
    }
  ]
}

export const categories: Category[] = [required1, required2, elective1, elective2, elective3]

export const getAllKnowledgePoints = (): KnowledgePoint[] => {
  const points: KnowledgePoint[] = []
  categories.forEach(cat => {
    cat.subcategories.forEach(sub => {
      points.push(...sub.knowledgePoints)
    })
  })
  return points
}

export const getKnowledgePointById = (id: string): KnowledgePoint | undefined => {
  return getAllKnowledgePoints().find(p => p.id === id)
}

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(c => c.id === id)
}

export const searchKnowledgePoints = (query: string): KnowledgePoint[] => {
  const lowerQuery = query.toLowerCase()
  return getAllKnowledgePoints().filter(p =>
    p.title.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.keywords.some(k => k.toLowerCase().includes(lowerQuery))
  )
}
