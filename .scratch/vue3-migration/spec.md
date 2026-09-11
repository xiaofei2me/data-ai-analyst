Status: ready-for-agent

# Vue 3 Migration Spec

## Problem Statement

当前 `index.html` 是一个 367 行的单文件应用，包含 19 个页面、CSS 样式、JavaScript 逻辑和数据。随着功能增长，这种单文件结构难以维护、测试和扩展。需要将其重构为 Vue 3 项目，保持界面完全一致。

## Solution

将 `index.html` 迁移到 Vue 3 + Vite 项目，使用组件化架构，保持所有功能和视觉效果不变。

## User Stories

1. As a developer, I want a Vue 3 project structure, so that the codebase is maintainable and testable
2. As a developer, I want each page as a separate component, so that I can work on individual features independently
3. As a user, I want the sidebar to work exactly as before, so that navigation remains familiar
4. As a user, I want the theme toggle to work, so that I can switch between light and dark modes
5. As a user, I want the language toggle to work, so that I can switch between English and Chinese
6. As a user, I want the workspace switch to work, so that I can toggle between Business and Technical views
7. As a user, I want the global search (Cmd+K) to work, so that I can quickly find metrics, tables, and reports
8. As a user, I want the drawer panel to work, so that I can view detailed information
9. As a user, I want toast notifications to work, so that I receive feedback on my actions
10. As a user, I want all charts to render correctly, so that I can visualize data
11. As a user, I want the Home page to display the AI input and suggestion cards, so that I can start analysis
12. As a user, I want the Analysis page to show the conversation and steps, so that I can track analysis progress
13. As a user, I want the Report page to show the outline and editor, so that I can create reports
14. As a user, I want the My Analyses page to list all analyses, so that I can manage my work
15. As a user, I want the Reports page to list all reports, so that I can manage reports
16. As a user, I want the Templates page to list templates, so that I can use predefined templates
17. As a user, I want the Favorites page to show saved items, so that I can quickly access important analyses
18. As a user, I want the Semantic Layer page to show metrics, dimensions, and entities, so that I can understand the data model
19. As a user, I want the Data Catalog page to show data sources and tables, so that I can explore available data
20. As a user, I want the Knowledge Base page to show articles, so that I can access documentation
21. As a user, I want the AI Agents page to show agent overview and flow, so that I can understand the AI system
22. As a user, I want the Capabilities page to show available capabilities, so that I can see what the system can do
23. As a user, I want the Data Tools page to show available tools, so that I can use data manipulation features
24. As a user, I want the AI Models page to show model information, so that I can monitor AI performance
25. As a user, I want the Evaluation page to show model metrics, so that I can assess model quality
26. As a user, I want the Monitoring page to show system health, so that I can ensure system availability
27. As a user, I want the Permissions page to show role matrix, so that I can manage access control
28. As a user, I want the Architecture page to show system diagram, so that I can understand the platform structure
29. As a user, I want the Settings page to show all configuration options, so that I can customize the platform
30. As a user, I want settings to persist in localStorage, so that my preferences are remembered
31. As a user, I want all animations and transitions to work, so that the UI feels smooth
32. As a user, I want responsive scrollbars, so that I can navigate long content
33. As a user, I want the breadcrumb to update correctly, so that I always know my location
34. As a user, I want the notification bell to be present, so that I can see alerts
35. As a user, I want the user profile section to show correct info, so that I can identify myself
36. As a developer, I want CSS variables preserved, so that theming remains consistent
37. As a developer, I want the data layer extracted, so that I can modify data independently
38. As a developer, I want i18n composable, so that translations are reusable across components
39. As a developer, I want Pinia stores, so that state management is centralized
40. As a developer, I want Vue Router, so that page navigation is handled properly

## Implementation Decisions

### Project Structure
- **Location**: `frontend/` directory
- **Build Tool**: Vite with Vue 3 template
- **Dependencies**: vue-router@4, pinia, less, echarts

### Component Architecture
- **19 page components**: Each page gets its own `.vue` file in `src/views/`
- **5 shared components**: Sidebar, Header, Toast, Drawer, SearchModal in `src/components/`
- **App.vue**: Main layout with Sidebar + Header + `<router-view>`

### Routing
- **Vue Router**: Each page maps to a route
- **Route structure**: `/` (Home), `/analysis`, `/report`, `/my-analyses`, `/reports`, `/templates`, `/favorites`, `/semantic`, `/catalog`, `/knowledge`, `/agents`, `/capabilities`, `/data-tools`, `/ai-models`, `/evaluation`, `/monitoring`, `/permissions`, `/overview`, `/settings`

### State Management (Pinia)
- **useThemeStore**: Manages theme state (light/dark), syncs with `data-theme` attribute
- **useSettingsStore**: Manages user settings, persists to localStorage
- **useNavStore**: Manages navigation state (current page, workspace, breadcrumb)

### Styling
- **Preprocessor**: Less
- **CSS Variables**: Keep original `:root` definitions unchanged
- **Component Styles**: `<style scoped>` for isolation
- **Global Styles**: Split into `variables.less`, `global.less`, `components.less`

### Data Layer
- **Location**: `src/data/index.js`
- **Structure**: Export all hardcoded data (D object) as named exports
- **Data includes**: months, revenue, cost, profit, brands, regions, channels, analyzes, reports, templates, metrics, dimensions, entities, agents, skills, models, evalData, monitorData, knowledge, dataSources, tables

### i18n
- **Approach**: Custom composable `useI18n()`
- **State**: Pinia store for language management
- **Function**: `m(key)` function returns translated string
- **Languages**: EN and ZH

### Chart Integration
- **Library**: ECharts 5.4.3 (npm installed)
- **Lifecycle**: Initialize in `onMounted`, destroy in `onUnmounted`
- **Charts**: Brand chart (bar), Region chart (pie), Trend chart (line), Channel chart (stacked bar)

### External Dependencies
- **Font Awesome 6.5.1**: CDN link in `index.html`
- **ECharts 5.4.3**: npm package

## Testing Decisions

### 测试边界（Seams）

| 边界 | 位置 | 测试方式 |
|------|------|----------|
| **页面路由** | Vue Router | 每个路由加载对应页面组件 |
| **主题切换** | Pinia store → `data-theme` | 切换后 CSS 变量生效 |
| **语言切换** | i18n composable → DOM 文本 | `m(key)` 返回正确翻译 |
| **工作区切换** | nav store → sidebar 导航 | Business/Technical 菜单切换 |
| **图表渲染** | ECharts → canvas | 页面挂载后图表正确显示 |
| **抽屉面板** | Drawer 组件 → CSS 动画 | 点击触发 → 右侧滑出 |
| **Toast 通知** | Toast 组件 → 定时消失 | 触发后 2.5s 自动隐藏 |
| **搜索弹窗** | SearchModal → Cmd+K | 打开/关闭/搜索结果 |
| **设置持久化** | localStorage | 刷新后设置保留 |

### 测试策略

- **视觉回归**：对比渲染页面与原始 `index.html` 的视觉效果
- **功能测试**：验证主题切换、语言切换、工作区切换、导航、搜索、抽屉、Toast
- **组件测试**：单独测试每个组件
- **E2E 测试**：测试完整用户流程（分析、报告生成）

## Out of Scope

- Backend implementation (stays as empty `backend/` directory)
- New features not in original `index.html`
- Performance optimization beyond original
- Mobile responsiveness (original is desktop-only)
- Accessibility improvements (not in original)

## Further Notes

- The original `index.html` will be preserved as reference
- All CSS classes and IDs will be preserved for compatibility
- The Vue 3 project should be runnable with `npm run dev`
- The original `index.html` should be accessible at `http://localhost:5173/` after migration
