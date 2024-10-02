import React from 'react';
import './Knob.css';

interface KnobProps {
  value: number;
  onChange: (value: number) => void;
}

const Knob: React.FC<KnobProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="knob-container">
      <input type="range" min="0" max="100" value={value} onChange={handleChange} />
      <span>{value}</span>
    </div>
  );
};

export default Knob;
