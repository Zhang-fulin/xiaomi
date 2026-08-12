import { useState, useMemo, useCallback, useEffect } from 'react';
import { Box, CssBaseline, IconButton, ThemeProvider, Tooltip, createTheme } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import type { MarketData } from './types';
import {
  DEFAULT_COST_PRICE,
  DEFAULT_SHARE_COUNT,
  DEFAULT_MONTHLY_INVEST,
  DEFAULT_TARGET_RMB,
} from './constants';
import { calculate } from './utils';
import { fetchStockPrice, fetchExchangeRate } from './api';
import { Header } from './components/Header';
import { ResultsPanel } from './components/ResultsPanel';
import { InputForm } from './components/InputForm';
import { PriceTable } from './components/PriceTable';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ff6700' },
    background: { default: '#121212', paper: '#1e1e1e' },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
});

export default function App() {
  const [currentPrice, setCurrentPrice] = useState(DEFAULT_COST_PRICE);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [shareCount, setShareCount] = useState(DEFAULT_SHARE_COUNT);
  const [costPrice, setCostPrice] = useState(DEFAULT_COST_PRICE);
  const [monthlyInvest, setMonthlyInvest] = useState(DEFAULT_MONTHLY_INVEST);
  const [targetRmb, setTargetRmb] = useState(DEFAULT_TARGET_RMB);
  const [marketData, setMarketData] = useState<MarketData>({ prevClose: null, changePercent: null });
  const [priceStatus, setPriceStatus] = useState('获取中...');
  const [rateStatus, setRateStatus] = useState('获取中...');

  const results = useMemo(
    () => calculate(currentPrice, shareCount, costPrice, monthlyInvest, exchangeRate, targetRmb),
    [currentPrice, shareCount, costPrice, monthlyInvest, exchangeRate, targetRmb],
  );

  const doRefreshPrice = useCallback(async () => {
    setPriceStatus('获取中...');
    try {
      const data = await fetchStockPrice();
      setCurrentPrice(data.price);
      setMarketData(data.marketData);
      setPriceStatus('● 已更新');
    } catch {
      setPriceStatus('● 获取失败');
    }
  }, []);

  const doRefreshRate = useCallback(async () => {
    setRateStatus('获取中...');
    try {
      const rate = await fetchExchangeRate();
      setExchangeRate(rate);
      setRateStatus('● 已更新');
    } catch {
      setRateStatus('● 获取失败');
    }
  }, []);

  useEffect(() => {
    doRefreshPrice();
    doRefreshRate();
  }, [doRefreshPrice, doRefreshRate]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          p: 3,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 1400,
            bgcolor: '#1e1e1e',
            borderRadius: 2.5,
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            p: 4,
          }}
        >
          <Tooltip title="刷新页面">
            <IconButton
              onClick={() => location.reload()}
              sx={{
                position: 'absolute',
                top: 24,
                right: 24,
                bgcolor: '#2a2a2a',
                border: '1px solid #333',
                borderRadius: 2.5,
                color: '#9e9e9e',
                zIndex: 10,
                '&:hover': { color: '#e0e0e0', borderColor: '#ff6700', bgcolor: '#333' },
              }}
              size="small"
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Header marketData={marketData} currentPrice={currentPrice} shareCount={shareCount} exchangeRate={exchangeRate} />

          <Box sx={{ display: 'flex', gap: 4, alignItems: 'stretch' }}>
            {/* 左侧面板 */}
            <Box sx={{ width: 420, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <ResultsPanel results={results} />
              <InputForm
                currentPrice={currentPrice}
                exchangeRate={exchangeRate}
                shareCount={shareCount}
                costPrice={costPrice}
                monthlyInvest={monthlyInvest}
                targetRmb={targetRmb}
                priceStatus={priceStatus}
                rateStatus={rateStatus}
                onPriceChange={setCurrentPrice}
                onRateChange={setExchangeRate}
                onShareCountChange={setShareCount}
                onCostPriceChange={setCostPrice}
                onMonthlyInvestChange={setMonthlyInvest}
                onTargetRmbChange={setTargetRmb}
                onRefreshPrice={doRefreshPrice}
                onRefreshRate={doRefreshRate}
              />
            </Box>

            {/* 右侧面板 */}
            <Box sx={{ flex: 1, minWidth: 0, position: 'relative' }}>
              <PriceTable results={results} />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
