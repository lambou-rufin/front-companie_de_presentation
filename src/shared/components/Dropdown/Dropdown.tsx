import React from 'react';
import './Dropdown.css';

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  return (
    <select className="dropdown" onChange={(e) => onSelect(e.target.value)}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
