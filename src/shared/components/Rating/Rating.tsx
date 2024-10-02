import React from 'react';
import './Rating.css';

interface RatingProps {
  value: number;
  max: number;
  onRate: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({ value, max, onRate }) => {
  return (
    <div className="rating">
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <span
          key={star}
          className={star <= value ? 'filled' : ''}
          onClick={() => onRate(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
