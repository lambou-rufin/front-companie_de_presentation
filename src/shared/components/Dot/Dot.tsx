import React from 'react';
import './Dot.css';

interface DotProps {
  color: string;
  size?: number;
}

const Dot: React.FC<DotProps> = ({ color, size = 10 }) => {
  return <span className="dot" style={{ backgroundColor: color, width: size, height: size }} />;
};

export default Dot;
