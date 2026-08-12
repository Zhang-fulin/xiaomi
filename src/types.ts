export interface QuarterNode {
  year: number;
  month: number;
}

export interface SolveResult {
  targetPrice: number;
  totalShares: number;
  totalCostHkd: number;
  profitHkd: number;
  avgCostPrice: number;
  profitRate: number;
}

export interface MarketData {
  prevClose: number | null;
  changePercent: number | null;
}

export interface CalcResults {
  costHkd: number;
  costRmb: number;
  valHkd: number;
  valRmb: number;
  profitHkd: number;
  profitRmb: number;
  profitRate: number;
  progress: number;
  tableRows: Array<{
    node: QuarterNode;
    months: number;
    result: SolveResult;
    totalCostRmb: number;
    profitRmb: number;
  }>;
}
