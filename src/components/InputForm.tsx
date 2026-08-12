import { useState, useCallback, useEffect, useRef } from 'react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { INPUT_MAX_LENGTH } from '../constants';

interface InputFormProps {
  currentPrice: number;
  exchangeRate: number;
  shareCount: number;
  costPrice: number;
  monthlyInvest: number;
  targetRmb: number;
  priceStatus: string;
  rateStatus: string;
  onPriceChange: (v: number) => void;
  onRateChange: (v: number) => void;
  onShareCountChange: (v: number) => void;
  onCostPriceChange: (v: number) => void;
  onMonthlyInvestChange: (v: number) => void;
  onTargetRmbChange: (v: number) => void;
  onRefreshPrice: () => Promise<void>;
  onRefreshRate: () => Promise<void>;
}

const inputSx = {
  '& .MuiInputBase-root': { bgcolor: '#2a2a2a', borderRadius: 2.5 },
  '& .MuiInputBase-input': { color: '#e0e0e0', fontSize: 13 },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ff6700' },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ff6700',
    boxShadow: '0 0 0 3px rgba(255,103,0,0.15)',
  },
  '& .MuiInputLabel-root': { color: '#9e9e9e' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#ff6700' },
};

const priceInputSx = {
  ...inputSx,
  '& .MuiInputBase-input': { color: '#ff6700', fontWeight: 700, fontSize: 15 },
};

function useNumberInput(value: number, onChange: (v: number) => void, onEmptyBlur?: () => void) {
  const [display, setDisplay] = useState(String(value));
  const isFocused = useRef(false);
  const committedRef = useRef(value);
  const defaultRef = useRef(value);

  useEffect(() => {
    if (!isFocused.current) {
      setDisplay(String(value));
    }
    committedRef.current = value;
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length > INPUT_MAX_LENGTH) return;
    setDisplay(val);
    const num = parseFloat(val);
    if (!isNaN(num) && val.trim() !== '') {
      onChange(num);
    }
  };

  const handleFocus = () => {
    isFocused.current = true;
  };

  const handleBlur = () => {
    isFocused.current = false;
    const num = parseFloat(display);
    if (isNaN(num) || display.trim() === '') {
      if (onEmptyBlur) {
        setDisplay(String(committedRef.current));
        onEmptyBlur();
      } else {
        setDisplay(String(defaultRef.current));
        onChange(defaultRef.current);
      }
    } else {
      setDisplay(String(num));
      committedRef.current = num;
      onChange(num);
    }
  };

  return { display, handleChange, handleFocus, handleBlur };
}

export function InputForm({
  currentPrice,
  exchangeRate,
  shareCount,
  costPrice,
  monthlyInvest,
  targetRmb,
  priceStatus,
  rateStatus,
  onPriceChange,
  onRateChange,
  onShareCountChange,
  onCostPriceChange,
  onMonthlyInvestChange,
  onTargetRmbChange,
  onRefreshPrice,
  onRefreshRate,
}: InputFormProps) {
  const [priceSpinning, setPriceSpinning] = useState(false);
  const [rateSpinning, setRateSpinning] = useState(false);

  const handleRefreshPrice = useCallback(async () => {
    setPriceSpinning(true);
    await onRefreshPrice();
    setPriceSpinning(false);
  }, [onRefreshPrice]);

  const handleRefreshRate = useCallback(async () => {
    setRateSpinning(true);
    await onRefreshRate();
    setRateSpinning(false);
  }, [onRefreshRate]);

  const price = useNumberInput(currentPrice, onPriceChange, handleRefreshPrice);
  const rate = useNumberInput(exchangeRate, onRateChange, handleRefreshRate);
  const shares = useNumberInput(shareCount, onShareCountChange);
  const cost = useNumberInput(costPrice, onCostPriceChange);
  const monthly = useNumberInput(monthlyInvest, onMonthlyInvestChange);
  const target = useNumberInput(targetRmb, onTargetRmbChange);

  const statusColor = (s: string) => (s.includes('失败') ? '#ff5252' : '#4caf50');
  const spinSx = (spinning: boolean) => ({
    animation: spinning ? 'spin 1s linear infinite' : 'none',
    '@keyframes spin': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
  });

  const RefreshBtn = ({ spinning, onClick }: { spinning: boolean; onClick: () => void }) => (
    <InputAdornment position="end">
      <IconButton size="small" onClick={onClick} sx={{ color: '#448aff' }}>
        <RefreshIcon fontSize="inherit" sx={spinSx(spinning)} />
      </IconButton>
    </InputAdornment>
  );

  const StatusTag = ({ text }: { text: string }) => (
    <Box component="span" sx={{ fontSize: 11, color: statusColor(text), ml: 0.5 }}>
      {text}
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 2,
      }}
    >
      <TextField
        label={<span>股价 <StatusTag text={priceStatus} /></span>}
        type="number"
        size="small"
        value={price.display}
        onChange={price.handleChange}
        onFocus={price.handleFocus}
        onBlur={price.handleBlur}
        slotProps={{
          htmlInput: { step: 0.01, min: 0.01, max: 500 },
          input: {
            endAdornment: (
              <>
                <Box component="span" sx={{ color: '#9e9e9e', fontWeight: 600, fontSize: 14, mr: 0.5 }}>HKD</Box>
                <RefreshBtn spinning={priceSpinning} onClick={handleRefreshPrice} />
              </>
            ),
          },
        }}
        sx={priceInputSx}
      />

      <TextField
        label={<span>汇率 (1 RMB) <StatusTag text={rateStatus} /></span>}
        type="number"
        size="small"
        value={rate.display}
        onChange={rate.handleChange}
        onFocus={rate.handleFocus}
        onBlur={rate.handleBlur}
        slotProps={{
          htmlInput: { step: 0.0001, max: 500 },
          input: { endAdornment: <RefreshBtn spinning={rateSpinning} onClick={handleRefreshRate} /> },
        }}
        sx={inputSx}
      />

      <TextField
        label="持股数 (股)"
        type="number"
        size="small"
        value={shares.display}
        onChange={shares.handleChange}
        onFocus={shares.handleFocus}
        onBlur={shares.handleBlur}
        slotProps={{ htmlInput: { step: 100, max: 100000 } }}
        sx={inputSx}
      />

      <TextField
        label="买入成本 (HKD)"
        type="number"
        size="small"
        value={cost.display}
        onChange={cost.handleChange}
        onFocus={cost.handleFocus}
        onBlur={cost.handleBlur}
        slotProps={{ htmlInput: { step: 0.001, max: 500 } }}
        sx={inputSx}
      />

      <TextField
        label="月定投 (RMB)"
        type="number"
        size="small"
        value={monthly.display}
        onChange={monthly.handleChange}
        onFocus={monthly.handleFocus}
        onBlur={monthly.handleBlur}
        slotProps={{ htmlInput: { step: 1000, max: 50000 } }}
        sx={inputSx}
      />

      <TextField
        label="目标市值 (RMB)"
        type="number"
        size="small"
        value={target.display}
        onChange={target.handleChange}
        onFocus={target.handleFocus}
        onBlur={target.handleBlur}
        slotProps={{ htmlInput: { step: 10000, max: 10000000 } }}
        sx={inputSx}
      />
    </Box>
  );
}
