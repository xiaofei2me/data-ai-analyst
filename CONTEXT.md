# AI Data Analyst

AI Data Analyst 是一个 AI 驱动的数据分析平台，支持自然语言查询、数据可视化、报告生成和多租户管理。

## Language

**Page（页面）**：
应用中的一个独立视图，对应一个路由路径。
_Avoid_: view, screen, component

**Sidebar（侧边栏）**：
左侧固定导航区域，包含 logo、工作区切换、导航菜单和用户信息。
_Avoid_: nav, menu, sidebar-nav

**Workspace（工作区）**：
Business 或 Technical 模式，切换后显示不同的导航菜单。
_Avoid_: mode, tab, context

**Drawer（抽屉面板）**：
右侧滑出的详情面板，用于展示详细信息或表单。
_Aavoid_: modal, popup, side-panel

**Toast（通知）**：
底部居中的临时消息提示，自动消失。
_Avoid_: notification, alert, snackbar

**Search Modal（搜索弹窗）**：
全局搜索界面，通过 Cmd+K 触发，支持模糊搜索。
_Avoid_: search-overlay, search-dialog

**Insight Card（洞察卡片）**：
首页展示的 AI 分析洞察，包含图标、标题和描述。
_Avoid_: analysis-card, result-card

**KPI Card（KPI 卡片）**：
关键绩效指标展示卡片，包含数值和趋势变化。
_Aavoid_: metric-card, stat-card

**Chart Block（图表块）**：
ECharts 图表容器，支持折线图、柱状图、饼图等。
_Avoid_: echarts-wrapper, chart-container

**Step（分析步骤）**：
数据分析流程中的一个阶段，如 Schema Detection、SQL Generation 等。
_Avoid_: phase, stage, process

**Semantic Layer（语义层）**：
定义指标、维度和实体的元数据层。
_Avoid_: metadata, schema, data-model

**Data Catalog（数据目录）**：
数据源和表的注册中心，支持搜索和浏览。
_Aavoid_: data-registry, source-list

**Knowledge Base（知识库）**：
存储分析文档和规则的知识管理系统。
_Avoid_: docs, wiki, articles

**AI Agent（AI 代理）**：
具有特定能力的 AI 助手，如 Data Analyst、Report Generator 等。
_Avoid_: bot, assistant, model

**Skill（技能）**：
AI 代理可执行的具体功能，如 Data Query、Chart Generation 等。
_Previously_: Capability
_Avoid_: feature, function, capability

**Evaluation（评估）**：
模型性能评估指标，包括 Accuracy、Precision、Recall、F1 Score 等。
_Aavoid_: metrics, assessment, scoring

**Operations（运维）**：
系统健康和性能监控，包括 Uptime、Latency、Error Rate 等。
_Previously_: Monitoring
_Avoid_: observability, tracking, logging, monitoring

**Governance（治理）**：
用户角色和访问控制，包括 Admin、Data Analyst、Viewer 等角色。
_Previously_: Permission
_Avoid_: role, access, auth, permission

**Settings（设置）**：
用户配置面板，包括外观、数据源、AI 模型、通知等设置。
_Avoid_: preferences, config, options
