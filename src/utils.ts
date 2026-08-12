import type { QuarterNode, SolveResult, CalcResults } from './types';
import { QUARTERLY_END_YEAR } from './constants';

export function generateQuarterlyNodes(): QuarterNode[] {
  const nodes: QuarterNode[] = [];
  for (let y = new Date().getFullYear(); y <= QUARTERLY_END_YEAR; y++) {
    for (let m = 3; m <= 12; m += 3) {
      nodes.push({ year: y, month: m });
    }
  }
  return nodes;
}

export function getRemainingMonths(targetYear: number, targetMonth: number): number {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  return (targetYear - currentYear) * 12 + (targetMonth - currentMonth);
}

export function solveLinearTarget(
  startPrice: number,
  initShares: number,
  initCostHkd: number,
  monthlyInvestHkd: number,
  months: number,
  targetHkd: number,
): SolveResult {
  let lowPrice = 0.01;
  let highPrice = 500.0;
  let midPrice = startPrice;
  let finalShares = initShares;

  for (let iter = 0; iter < 30; iter++) {
    midPrice = (lowPrice + highPrice) / 2;
    let accumShares = initShares;
    for (let m = 1; m <= months; m++) {
      let priceAtMonth = startPrice + (m / months) * (midPrice - startPrice);
      if (priceAtMonth <= 0) priceAtMonth = 0.01;
      accumShares += monthlyInvestHkd / priceAtMonth;
    }

    const endVal = accumShares * midPrice;
    if (endVal < targetHkd) {
      lowPrice = midPrice;
    } else {
      highPrice = midPrice;
    }
    finalShares = accumShares;
  }

  const totalCostHkd = initShares * initCostHkd + monthlyInvestHkd * months;
  const avgCostPrice = totalCostHkd / finalShares;
  const profitHkd = targetHkd - totalCostHkd;
  const profitRate = avgCostPrice > 0 ? ((midPrice - avgCostPrice) / avgCostPrice) * 100 : 0;

  return {
    targetPrice: midPrice,
    totalShares: finalShares,
    totalCostHkd,
    profitHkd,
    avgCostPrice,
    profitRate,
  };
}

export function calculate(
  price: number,
  shareCount: number,
  costPrice: number,
  monthlyInvestRmb: number,
  exchangeRate: number,
  targetRmb: number,
): CalcResults {
  const valHkd = price * shareCount;
  const valRmb = valHkd / exchangeRate;

  const totalCostHkd = costPrice * shareCount;
  const totalCostRmb = totalCostHkd / exchangeRate;

  const profitHkd = valHkd - totalCostHkd;
  const profitRmb = profitHkd / exchangeRate;
  const profitRate = totalCostHkd > 0 ? (profitHkd / totalCostHkd) * 100 : 0;

  const progress = Math.min((valRmb / targetRmb) * 100, 100);

  const targetHkd = targetRmb * exchangeRate;
  const monthlyInvestHkd = monthlyInvestRmb * exchangeRate;
  const quarterNodes = generateQuarterlyNodes();

  const tableRows = quarterNodes
    .map((node) => {
      const months = getRemainingMonths(node.year, node.month);
      if (months <= 0) return null;
      const result = solveLinearTarget(price, shareCount, costPrice, monthlyInvestHkd, months, targetHkd);
      return {
        node,
        months,
        result,
        totalCostRmb: result.totalCostHkd / exchangeRate,
        profitRmb: result.profitHkd / exchangeRate,
      };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);

  return {
    costHkd: totalCostHkd,
    costRmb: totalCostRmb,
    valHkd,
    valRmb,
    profitHkd,
    profitRmb,
    profitRate,
    progress,
    tableRows,
  };
}
