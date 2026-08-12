<div align="center">

<img src="https://img.shields.io/badge/Xiaomi-FF6900?style=for-the-badge&logo=xiaomi&logoColor=white" alt="Xiaomi" />
<img src="https://img.shields.io/badge/01810.HK-Stock-FF6900?style=for-the-badge" alt="Stock" />
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />

# Xiaomi Portfolio Calculator

**小米集团 (01810.HK) 持仓市值实时计算器**

实时股价 · 动态测算 · 季度目标规划

[![Deploy to GitHub Pages](https://github.com/Zhang-fulin/xiaomi/actions/workflows/deploy.yml/badge.svg)](https://github.com/Zhang-fulin/xiaomi/actions/workflows/deploy.yml)
[![Live Site](https://img.shields.io/badge/Live_Site-xiaomi.zhangfulin.com-FF6900?style=flat)](https://xiaomi.zhangfulin.com)

</div>

---

## Features

- **实时股价** — 通过腾讯行情 API 获取港股实时价格
- **实时汇率** — 自动获取 CNY/HKD 汇率，支持手动刷新
- **持仓分析** — 成本、市值、盈亏一目了然
- **目标测算** — 基于月定投金额，计算各季度达标所需股价
- **当日盈亏** — 实时显示当日持仓浮动盈亏（人民币）
- **目标进度** — 可视化进度条展示目标完成度

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| UI Library | MUI (Material-UI) v9 |
| Deployment | GitHub Pages + GitHub Actions |
| Custom Domain | `xiaomi.zhangfulin.com` |

## Getting Started

```bash
# Clone
git clone https://github.com/Zhang-fulin/xiaomi.git
cd xiaomi

# Install
npm install

# Dev
npm run dev

# Build
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # 标题栏 + 行情状态
│   ├── InputForm.tsx       # 参数输入表单
│   ├── ResultsPanel.tsx    # 成本/市值/盈亏面板
│   └── PriceTable.tsx      # 季度达标股价测算表
├── constants.ts            # 可配置常量（默认值、API 地址）
├── types.ts                # TypeScript 类型定义
├── utils.ts                # 计算逻辑
├── api.ts                  # 数据接口（股价、汇率）
├── App.tsx                 # 主布局组件
└── main.tsx                # 入口文件
```

## Configuration

所有可配置项集中在 `src/constants.ts`，按需修改：

```typescript
export const DEFAULT_COST_PRICE = 43.236;      // 默认买入成本 (HKD)
export const DEFAULT_SHARE_COUNT = 24200;       // 默认持股数
export const DEFAULT_MONTHLY_INVEST = 10000;    // 默认月定投 (RMB)
export const DEFAULT_TARGET_RMB = 2500000;      // 目标市值 (RMB)
export const QUARTERLY_END_YEAR = 2036;         // 测算截止年份
```

## Deployment

项目通过 GitHub Actions 自动部署：

```
Push to main → npm ci → npm run build → Deploy to GitHub Pages
```

每次推送到 `main` 分支会自动触发构建和部署，站点地址：[xiaomi.zhangfulin.com](https://xiaomi.zhangfulin.com)

---

<div align="center">

**永远相信美好的事情即将发生**

</div>
