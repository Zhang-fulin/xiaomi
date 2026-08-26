<div align="center">

<img src="https://img.shields.io/badge/Xiaomi-FF6900?style=for-the-badge&logo=xiaomi&logoColor=white" alt="Xiaomi" />
<img src="https://img.shields.io/badge/01810.HK-Stock-FF6900?style=for-the-badge" alt="Stock" />
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />

# Xiaomi Portfolio Calculator

**小米集团 (01810.HK) — 持仓市值与季度目标实时测算器**

实时股价 · 汇率换算 · 目标规划

[![Deploy to GitHub Pages](https://github.com/Zhang-fulin/xiaomi/actions/workflows/deploy.yml/badge.svg)](https://github.com/Zhang-fulin/xiaomi/actions/workflows/deploy.yml)
[![Live Site](https://img.shields.io/badge/Live_Site-xiaomi.zhangfulin.com-FF6900?style=flat)](https://xiaomi.zhangfulin.com)

</div>

---

简洁、快速、面向个人投资者的工具，用于基于实时港股价格和人民币/港币汇率，计算持仓市值、盈亏和在既定定投计划下的季度达标股价与完成进度。

目录
- [亮点](#亮点)
- [功能概览](#功能概览)
- [在线演示](#在线演示)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [可配置项](#可配置项)
- [部署说明](#部署说明)
- [扩展建议](#扩展建议)
- [贡献与联系方式](#贡献与联系方式)

## 亮点

- 极简操作：只需输入成本、持股数与月定投金额，自动完成全量计算与可视化展示。
- 实时更新：支持从行情与汇率 API 拉取最新数据，结果即时刷新。
- 目标导向：按季度输出达到目标市值所需股价，并以进度条展示达成度。
- 本地化展示：以人民币计价并支持手动刷新汇率，易于国内用户使用。

## 功能概览

- 实时港股价格（通过腾讯行情 API）
- 实时 CNY/HKD 汇率
- 成本、市值、当日浮动盈亏与累计盈亏
- 基于月定投的季度达标股价与达成时间预测
- 目标进度可视化（进度条/百分比）
- 配置项集中管理，支持自定义默认值

## 在线演示

访问在线站点查看实时效果：

https://xiaomi.zhangfulin.com

（页面会显示实时价格、汇率以及根据输入自动计算的结果面板）

## 技术栈

- 框架：React 19 + TypeScript
- 构建：Vite 7
- UI：MUI (Material-UI) v9
- 部署：GitHub Actions + GitHub Pages

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/Zhang-fulin/xiaomi.git
cd xiaomi

# 安装依赖
npm install

# 本地开发
npm run dev

# 生产构建
npm run build
```

## 项目结构（概览）

```
src/
├── components/
│   ├── Header.tsx          # 标题栏 + 实时行情/汇率状态
│   ├── InputForm.tsx       # 参数输入表单（成本/持股/月定投/目标）
│   ├── ResultsPanel.tsx    # 成本/市值/盈亏/当日盈亏面板
│   └── PriceTable.tsx      # 季度达标股价与进度表
├── constants.ts            # 可配置常量（默认值、API 地址）
├── types.ts                # TypeScript 类型定义
├── utils.ts                # 计算与辅助函数
├── api.ts                  # 行情与汇率接口封装
├── App.tsx                 # 页面布局与路由（单页）
└── main.tsx                # 入口文件
```

## 可配置项

在 `src/constants.ts` 中集中管理：

```typescript
export const DEFAULT_COST_PRICE = 43.236;      // 默认买入成本 (HKD)
export const DEFAULT_SHARE_COUNT = 24200;      // 默认持股数
export const DEFAULT_MONTHLY_INVEST = 10000;   // 默认月定投 (RMB)
export const DEFAULT_TARGET_RMB = 2500000;     // 目标市值 (RMB)
export const QUARTERLY_END_YEAR = 2036;        // 测算截止年份
```

说明：默认值为示例，建议用户按自身情况修改并持久化（例如浏览器 localStorage）。

## 部署说明

通过 GitHub Actions 自动构建并发布到 GitHub Pages：

- 推送到默认分支 → CI (npm ci) → 构建 (npm run build) → 部署到 Pages

CI 配置文件：.github/workflows/deploy.yml

## 可扩展方向

- 支持多只股票与组合目标分析
- 导入/导出持仓（CSV / JSON）
- 增加历史价格图表与盈亏回溯
- 增强移动端适配与无障碍（a11y）支持
- 在本地或云端保存用户配置/场景

## 贡献与反馈

非常欢迎 Issue 与 PR：

- 报 bug：请在 Issue 中说明重现步骤与期望行为
- 提 PR：在描述中写清改动目的、实现方式与影响范围

## 联系与声明

作者：Zhang Fulin
站点：https://xiaomi.zhangfulin.com

---

<div align="center">

**永远相信美好的事情即将发生**

</div>
