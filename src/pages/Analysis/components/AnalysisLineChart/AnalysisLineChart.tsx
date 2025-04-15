import React, { FC } from 'react';

import { AnalysisResponse } from '@app/store/apis/expense/types';
import ReactECharts from 'echarts-for-react';

export interface AnalysisLineChartProps {
  data: AnalysisResponse[];
}

const AnalysisLineChart: FC<AnalysisLineChartProps> = ({ data }) => {
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Item 1'],
      right: 10,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data?.map(d => d.month),
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#CCD6EB', // X-axis line color
        },
      },
      axisLabel: {
        color: '#666666', // X-axis label font color
      },
    },
    yAxis: {
      type: 'value',
      name: 'Value', // 👈 Y-axis title text
      nameLocation: 'middle', // Can be 'start', 'middle', or 'end'
      nameGap: 40, // Distance between title and axis
      nameTextStyle: {
        color: '#666666',
        fontSize: 12,
        fontFamily: 'Poppins, sans-serif',
      },
      axisLabel: {
        color: '#666666', // Y-axis label font color
      },
    },
    series: [
      {
        name: 'Item 1',
        type: 'line',
        smooth: true,
        data: data?.map(d => d.total),
        symbolSize: 8,
        lineStyle: {
          color: '#7539FF',
          width: 2,
        },
        itemStyle: {
          color: '#7539FF',
        },
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: 450 }}>
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default AnalysisLineChart;
