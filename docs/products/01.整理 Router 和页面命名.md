你现在负责 data-ai-analyst 项目的第 1 个小任务。

目标：
整理当前 Vue 3 项目的 Router 和页面命名，为后续产品主流程做准备。

项目目标：
这是一个 Enterprise AI Data Analyst 产品。
当前阶段不要重构业务页面，不要增加复杂功能，只整理路由结构。

请先阅读：
- AGENTS.md
- CONTEXT.md
- frontend/src/router
- frontend/src/views

目标信息架构：

Business Workspace:
- /                       工作台
- /analysis               新建分析入口
- /analysis/:id            Analysis Workspace
- /my-analyses             我的分析
- /reports                 我的报告
- /reports/:id             Report Detail
- /templates               分析模板
- /favorites               收藏
- /discover                AI 发现（如果当前项目已有对应页面）

AI Data Platform:
- /platform                Platform Overview
- /semantic                业务语义
- /semantic/:id            Semantic Detail
- /catalog                 数据目录
- /catalog/:assetId        Data Asset Detail
- /knowledge               知识库
- /agents                  Agent 中心
- /agents/:id              Agent Detail
- /skills                  Skills
- /tools                   Tool Registry
- /models                  Models
- /evaluation              Evaluation
- /operations              Operations
- /governance              Governance
- /settings                Settings

要求：

1. 优先保持当前已有页面和组件，不要删除现有页面。
2. 将现有路由调整为上述信息架构。
3. 可以增加必要的 detail route，但不要实现 detail 页面业务逻辑。
4. 将：
   - Capabilities → Skills
   - Data Tools → Tools
   - AI Models → Models
   - Monitoring → Operations
   - Permissions → Governance
   - Overview → Platform Overview
5. /analysis/:id 和 /reports/:id 必须建立。
6. 不实现 Analysis 业务逻辑。
7. 不修改 HomeView.vue。
8. 不修改 AnalysisView.vue。
9. 不修改 Mock Data。
10. 不新增 Service、Store 或 API。
11. 不进行与本任务无关的 UI 重构。

允许修改：
- frontend/src/router/**
- 如果项目存在独立 navigation/menu 配置，只允许修改对应配置文件。

完成后：

1. 检查所有现有 route 是否仍然可访问。
2. 检查没有重复 route。
3. 执行 npm run build。
4. 如果项目有 lint，则执行 lint。
5. 修复本任务引入的问题。
6. 最后总结：
   - 修改了哪些文件
   - 新增哪些 route
   - 修改哪些 route
   - build 是否成功

不要修改无关文件。
不要进行额外重构。