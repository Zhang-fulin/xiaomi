import { Box, Typography } from '@mui/material';
import type { MarketData } from '../types';

interface HeaderProps {
  marketData: MarketData;
  currentPrice: number;
  shareCount: number;
  exchangeRate: number;
}

export function Header({ marketData, currentPrice, shareCount, exchangeRate }: HeaderProps) {
  return (
    <Box sx={{ mb: 3, pb: 2.5, borderBottom: '1px solid #333' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        {/* 左侧 slogan */}
        <Box sx={{ width: 300 }}>
          <Box sx={{ fontSize: 12, color: '#ffab91', fontStyle: 'italic', lineHeight: 1.8 }}>
            "永远相信美好的事情即将发生"
          </Box>
          <Box sx={{ fontSize: 12, color: '#4fc3f7', fontStyle: 'italic', lineHeight: 1.8 }}>
            "优秀的公司赚取利润，伟大的公司赢得人心"
          </Box>
          <Box sx={{ fontSize: 12, color: '#81c784', fontStyle: 'italic', lineHeight: 1.8 }}>
            "和用户交朋友"
          </Box>
          <Box sx={{ fontSize: 12, color: '#fff176', fontStyle: 'italic', lineHeight: 1.8 }}>
            "专注 极致 口碑 快"
          </Box>
        </Box>
        {/* 中间标题 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <svg width="32" height="32" viewBox="0 0 808 808" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path fill="#ff6900" d="M723.79,84.42C647.55,8.48,537.94,0,404,0,269.89,0,160.12,8.58,83.92,84.72S0,270.43,0,404.39,7.74,648,84,724.14,269.9,808,404,808s243.85-7.71,320-83.86,84-185.78,84-319.75C808,270.25,800.16,160.54,723.79,84.42Z" />
              <path fill="#fff" d="M374.26,553.72a5,5,0,0,1-5.06,5H300.3a5.05,5.05,0,0,1-5.12-5V373.53a5.05,5.05,0,0,1,5.12-5h68.9a5,5,0,0,1,5.06,5Z" />
              <path fill="#fff" d="M509.18,553.72a5.05,5.05,0,0,1-5.09,5H438.5a5,5,0,0,1-5.1-5V398.26c-.07-27.15-1.62-55-15.64-69.06-12-12.09-34.51-14.86-57.88-15.44H241a5,5,0,0,0-5.07,5v235a5.07,5.07,0,0,1-5.12,5H165.16a5,5,0,0,1-5.06-5V254.31a5,5,0,0,1,5.06-5H354.52c49.49,0,101.22,2.26,126.74,27.81s27.92,77.3,27.92,126.85Z" />
              <path fill="#fff" d="M644.29,553.72a5.06,5.06,0,0,1-5.09,5H573.57a5,5,0,0,1-5.08-5V254.31a5,5,0,0,1,5.08-5H639.2a5.06,5.06,0,0,1,5.09,5Z" />
            </g>
          </svg>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: '#ff6900',
              letterSpacing: 1,
            }}
          >
            小米集团 (01810.HK)
          </Typography>
        </Box>
        {/* 右侧占位 */}
        <Box sx={{ width: 300 }} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3.5, flexWrap: 'wrap' }}>
        <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: 14 }}>
          <Box component="span" sx={{ color: '#9e9e9e' }}>昨收基准:</Box>
          <Box component="span" sx={{ fontWeight: 700 }}>
            {marketData.prevClose !== null ? `${marketData.prevClose.toFixed(2)} HKD` : '-- HKD'}
          </Box>
        </Box>
        <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: 14 }}>
          <Box component="span" sx={{ color: '#9e9e9e' }}>今日涨跌:</Box>
          <Box
            component="span"
            sx={{
              fontWeight: 700,
              color:
                marketData.changePercent !== null
                  ? marketData.changePercent >= 0
                    ? '#ff5252'
                    : '#4caf50'
                  : 'inherit',
            }}
          >
            {marketData.changePercent !== null
              ? `${marketData.changePercent >= 0 ? '+' : ''}${marketData.changePercent.toFixed(2)}%`
              : '--%'}
          </Box>
        </Box>
        {marketData.prevClose !== null && (
          <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: 14 }}>
            <Box component="span" sx={{ color: '#9e9e9e' }}>当日盈亏:</Box>
            <Box
              component="span"
              sx={{
                fontWeight: 700,
                color: currentPrice >= marketData.prevClose ? '#ff5252' : '#4caf50',
              }}
            >
              {(() => {
                const diffHkd = (currentPrice - marketData.prevClose) * shareCount;
                const diffRmb = diffHkd / exchangeRate;
                const sign = diffRmb >= 0 ? '+' : '';
                return `¥ ${sign}${diffRmb.toLocaleString('zh-CN', { maximumFractionDigits: 0 })}`;
              })()}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
