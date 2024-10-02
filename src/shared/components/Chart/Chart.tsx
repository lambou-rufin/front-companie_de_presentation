import React from 'react';
import './Chart.css';

interface ChartProps {
  data: number[];
  labels: string[];
}

const Chart: React.FC<ChartProps> = ({ data, labels }) => {
  return (
    <div className="chart-container">
      <h3>Chart Component</h3>
      <ul>
        {labels.map((label, index) => (
          <li key={index}>
            {label}: {data[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chart;
