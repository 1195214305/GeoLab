# GeoLab - 高中地理知识系统

<p align="center">
  <img src="frontend/public/favicon.svg" alt="GeoLab Logo" width="120" height="120">
</p>

<p align="center">
  <strong>交互式高中地理知识学习平台</strong>
</p>

<p align="center">
  <a href="#功能特性">功能特性</a> •
  <a href="#技术栈">技术栈</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#项目结构">项目结构</a> •
  <a href="#边缘计算">边缘计算</a>
</p>

---

## 项目简介

GeoLab 是一个基于阿里云 ESA Pages 边缘计算平台构建的高中地理知识学习系统。通过交互式动态演示，让地理学习更加直观、有趣。系统覆盖人教版高中地理必修一、必修二及选择性必修的全部核心知识点。

### 声明

本项目由[阿里云ESA](https://www.aliyun.com/product/esa)提供加速、计算和保护

![阿里云ESA](https://img.alicdn.com/imgextra/i3/O1CN01H1UU3i1Cti9lYtFrs_!!6000000000139-2-tps-7534-844.png)

## 功能特性

### 🌍 完整知识体系
- **必修一（自然地理）**：地球运动、大气环流、水循环、地表形态
- **必修二（人文地理）**：人口、城市、农业、工业、交通
- **选择性必修**：自然地理深化、区域发展、资源环境与安全

### 🎮 交互式演示
每个知识点都配有可操作的动态演示：
- 地球自转公转动画
- 三圈环流可视化
- 水循环过程演示
- 板块运动模拟
- 城市功能分区交互
- 人口增长模式对比
- 更多...

### 🤖 AI 智能辅导
- 集成通义千问大模型
- 右下角悬浮 AI 助手
- 针对当前知识点的智能问答
- 用户自行配置 API Key

### 🎨 现代化设计
- 深色/浅色主题切换
- 地理蓝绿色调设计
- 响应式布局，完美适配移动端
- 流畅的动画效果

## 技术栈

### 前端
- **React 18** - 用户界面框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **TailwindCSS** - 样式框架
- **Framer Motion** - 动画库
- **Recharts** - 图表库
- **Zustand** - 状态管理
- **React Router** - 路由管理

### 边缘计算
- **阿里云 ESA Pages** - 边缘部署平台
- **Edge Functions** - 边缘函数
- **通义千问 API** - AI 能力

## 快速开始

### 环境要求
- Node.js >= 18
- npm >= 9

### 安装依赖
```bash
cd frontend
npm install
```

### 本地开发
```bash
npm run dev
```

### 构建部署
```bash
npm run build
```

## 项目结构

```
16_GeoLab_高中地理知识系统/
├── frontend/                    # 前端代码
│   ├── src/
│   │   ├── components/         # 组件
│   │   │   ├── Layout.tsx      # 布局组件
│   │   │   └── simulations/    # 交互式演示组件
│   │   ├── pages/              # 页面
│   │   │   ├── HomePage.tsx    # 首页
│   │   │   ├── CategoryPage.tsx # 分类页
│   │   │   ├── KnowledgePage.tsx # 知识点页
│   │   │   └── SettingsPage.tsx # 设置页
│   │   ├── data/               # 数据
│   │   │   └── knowledge.ts    # 知识点数据
│   │   ├── store/              # 状态管理
│   │   │   ├── theme.tsx       # 主题状态
│   │   │   └── settings.ts     # 设置状态
│   │   ├── App.tsx             # 应用入口
│   │   ├── main.tsx            # 主入口
│   │   └── index.css           # 全局样式
│   ├── public/                 # 静态资源
│   ├── index.html              # HTML 模板
│   ├── package.json            # 依赖配置
│   ├── vite.config.ts          # Vite 配置
│   ├── tailwind.config.js      # Tailwind 配置
│   └── tsconfig.json           # TypeScript 配置
├── functions/                   # 边缘函数
│   └── ai/
│       └── tutor.ts            # AI 辅导函数
└── README.md                    # 项目说明
```

## How We Use Edge

### 边缘计算的不可替代性

GeoLab 充分利用阿里云 ESA Pages 的边缘计算能力：

1. **全球加速部署**
   - 静态资源通过 ESA CDN 全球分发
   - 用户就近访问，延迟极低
   - 支持全球用户流畅使用交互式演示

2. **边缘 AI 处理**
   - AI 辅导请求在边缘节点处理
   - 减少到源站的请求延迟
   - 提供更快的 AI 响应体验

3. **智能缓存策略**
   - 知识点数据边缘缓存
   - 减少重复请求
   - 提升页面加载速度

4. **安全防护**
   - ESA 提供 DDoS 防护
   - WAF 安全防护
   - 保护 API Key 等敏感信息

### 边缘函数功能

```typescript
// AI 辅导接口
POST /api/ai/tutor
- 接收用户问题
- 调用通义千问 API
- 返回智能回答

// 知识点提示
GET /api/hints?knowledgeId=xxx
- 返回知识点学习提示
- 边缘缓存优化

// 健康检查
GET /api/health
- 服务状态监控
```

## 创意性

1. **沉浸式学习体验**：每个地理概念都有对应的可视化演示，让抽象知识变得直观
2. **AI 辅导助手**：随时解答学习疑问，提供个性化学习支持
3. **完整知识图谱**：覆盖高中地理全部核心内容，系统化学习

## 应用价值

1. **教育辅助**：帮助高中生更好地理解地理知识
2. **教师工具**：可用于课堂演示和教学辅助
3. **自主学习**：支持学生课后自主复习和探索

## 技术深度

1. **复杂动画系统**：使用 SVG + Framer Motion 实现流畅的地理演示动画
2. **响应式设计**：完美适配各种设备尺寸
3. **边缘计算架构**：充分利用 ESA Pages 的边缘能力
4. **AI 集成**：无缝集成通义千问大模型

## 许可证

MIT License

## 作者

GeoLab Team

---

<p align="center">
  Made with ❤️ for Geography Education
</p>
