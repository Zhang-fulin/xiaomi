import { Box, LinearProgress } from '@mui/material';
import type { CalcResults } from '../types';

interface ResultsPanelProps {
  results: CalcResults;
}

function fmt(n: number): string {
  return n.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function ResultsPanel({ results }: ResultsPanelProps) {
  const { costHkd, costRmb, valHkd, valRmb, profitHkd, profitRmb, profitRate, progress } = results;
  const sign = profitHkd >= 0 ? '+' : '';
  const profitColor = profitHkd >= 0 ? '#ff5252' : '#4caf50';

  const items = [
    {
      label: '成本',
      values: [
        { text: `${fmt(costHkd)} HKD`, color: '#4fc3f7' },
        { text: `¥ ${fmt(costRmb)}`, color: '#4fc3f7', sub: true },
      ],
    },
    {
      label: '市值',
      values: [
        { text: `${fmt(valHkd)} HKD`, color: '#ff6700' },
        { text: `¥ ${fmt(valRmb)}`, color: '#ff6700', sub: true },
      ],
    },
    {
      label: '盈亏',
      values: [
        { text: `${sign}${fmt(profitHkd)} HKD`, color: profitColor },
        { text: `¥ ${sign}${fmt(profitRmb)}`, color: profitColor, sub: true },
        { text: `${profitRate >= 0 ? '+' : ''}${profitRate.toFixed(2)}%`, color: profitColor, sub: true },
      ],
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: '#242424',
        borderRadius: 1.75,
        p: 2.5,
        border: '1px solid #333',
      }}
    >
      {items.map((item) => (
        <Box
          key={item.label}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1.5,
            borderBottom: '1px dashed #333',
          }}
        >
          <Box
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: '#9e9e9e',
              letterSpacing: 2,
              pl: 1.5,
              position: 'relative',
            }}
          >
            <Box
              component="span"
              sx={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 3,
                height: 16,
                bgcolor: '#ff6700',
                borderRadius: 0.5,
              }}
            />
            {item.label}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
            {item.values.map((v, i) => (
              <Box
                key={i}
                sx={{
                  fontWeight: v.sub ? 400 : 700,
                  fontSize: v.sub ? 13 : 17,
                  color: v.color,
                }}
              >
                {v.text}
              </Box>
            ))}
          </Box>
        </Box>
      ))}

      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ fontSize: 13 }}>目标完成度</Box>
          <Box sx={{ fontSize: 13, fontWeight: 700, color: '#ff6700' }}>
            {progress.toFixed(2)}%
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={Math.min(progress, 100)}
          sx={{
            height: 10,
            borderRadius: 5,
            bgcolor: '#333',
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #ff9f43, #ff6700)',
              borderRadius: 5,
            },
          }}
        />
      </Box>
    </Box>
  );
}
