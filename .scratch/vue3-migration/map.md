# Vue 3 Migration

## Notes

- 将 index.html (367行) 迁移到 Vue 3 + Vite 项目
- 保持所有功能和视觉效果完全一致
- 使用组件化架构，便于维护和扩展

## Decisions-so-far

- 项目位置: `frontend/` 目录
- 构建工具: Vite + Vue 3
- 路由: Vue Router
- 状态管理: Pinia
- 样式: Less + CSS 变量
- 数据: 提取到 `src/data/`
- i18n: 自定义 composable
- 图表: ECharts 直接使用

## Fog

- 无
