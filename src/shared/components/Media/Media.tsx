import React from 'react';
import './Media.css';

interface MediaProps {
  src: string;
  alt: string;
}

const Media: React.FC<MediaProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="media" />;
};

export default Media;
