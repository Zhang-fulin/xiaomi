import type { MarketData } from './types';
import { STOCK_API_URL, RATE_API_URL } from './constants';

/** 通过 JSONP 获取腾讯行情数据 */
export function fetchStockPrice(): Promise<{
  price: number;
  marketData: MarketData;
}> {
  return new Promise((resolve, reject) => {
    const callbackName = `v_hk01810`;
    const script = document.createElement('script');
    script.src = `${STOCK_API_URL}?${Date.now()}`;

    script.onload = () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const raw = (window as any)[callbackName] as string;
        if (!raw) {
          reject(new Error('No data'));
          return;
        }
        const elements = raw.split('~');
        const price = parseFloat(elements[3]);
        const prevClose = parseFloat(elements[4]);
        const changePercent = parseFloat(elements[32]);

        resolve({
          price,
          marketData: {
            prevClose: isNaN(prevClose) ? null : prevClose,
            changePercent: isNaN(changePercent) ? null : changePercent,
          },
        });
      } catch {
        reject(new Error('Parse error'));
      } finally {
        document.body.removeChild(script);
      }
    };

    script.onerror = () => {
      document.body.removeChild(script);
      reject(new Error('Network error'));
    };

    document.body.appendChild(script);
  });
}

/** 获取实时汇率 (1 RMB = ? HKD) */
export async function fetchExchangeRate(): Promise<number> {
  const response = await fetch(`${RATE_API_URL}?t=${Date.now()}`);
  if (!response.ok) throw new Error('Network error');
  const data = await response.json();
  if (data?.rates?.HKD) {
    return data.rates.HKD as number;
  }
  throw new Error('Invalid data');
}
