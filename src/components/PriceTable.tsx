import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import type { CalcResults } from '../types';

interface PriceTableProps {
  results: CalcResults;
}

export function PriceTable({ results }: PriceTableProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: '#1e1e1e',
        borderRadius: 1.5,
        border: '1px solid #333',
        overflow: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {['目标时间', '剩余月数', '预计总持股', '投入本金 (RMB)', '平均成本 (HKD)', '达标所需股价 (HKD)', '盈利 (RMB)', '持仓收益率'].map(
              (h) => (
                <TableCell
                  key={h}
                  align="center"
                  sx={{
                    bgcolor: '#282828',
                    color: '#e0e0e0',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    p: '12px 10px',
                    borderBottom: '1px solid #333',
                    borderRight: '1px solid #333',
                    '&:last-child': { borderRight: 'none' },
                  }}
                >
                  {h}
                </TableCell>
              ),
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {results.tableRows.map((row) => {
            const { node, months, result, totalCostRmb, profitRmb } = row;
            const sign = result.profitRate >= 0 ? '+' : '';
            const color = result.profitRate >= 0 ? '#ff5252' : '#4caf50';
            const m = String(node.month).padStart(2, '0');

            const cellSx = {
              color: '#e0e0e0',
              whiteSpace: 'nowrap',
              p: '12px 10px',
              borderBottom: '1px solid #333',
              borderRight: '1px solid #333',
              '&:last-child': { borderRight: 'none' },
            };

            return (
              <TableRow
                key={`${node.year}-${node.month}`}
                sx={{ '&:nth-of-type(even) td': { bgcolor: '#242424' } }}
              >
                <TableCell align="center" sx={cellSx}>
                  <b>{node.year}.{m}</b>
                </TableCell>
                <TableCell align="center" sx={cellSx}>{months}</TableCell>
                <TableCell align="center" sx={cellSx}>
                  ~{Math.round(result.totalShares).toLocaleString()} 股
                </TableCell>
                <TableCell align="center" sx={cellSx}>
                  <b>¥ {Math.round(totalCostRmb).toLocaleString()}</b>
                </TableCell>
                <TableCell align="center" sx={cellSx}>
                  {result.avgCostPrice.toFixed(2)} 港币
                </TableCell>
                <TableCell align="center" sx={{ ...cellSx, fontWeight: 700, color: '#ff6700' }}>
                  {result.targetPrice.toFixed(2)} 港币
                </TableCell>
                <TableCell align="center" sx={{ ...cellSx, color }}>
                  <b>{sign}¥ {Math.round(profitRmb).toLocaleString()}</b>
                </TableCell>
                <TableCell align="center" sx={{ ...cellSx, color, fontWeight: 700 }}>
                  {sign}{result.profitRate.toFixed(2)}%
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
