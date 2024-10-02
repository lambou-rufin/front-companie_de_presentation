import React from 'react';
import './Block.css'; // Assurez-vous de créer le fichier CSS correspondant

interface BlockProps {
  title?: string;
  children: React.ReactNode;
}

const Block: React.FC<BlockProps> = ({ title, children }) => {
  return (
    <div className="block-container">
      {title && <h2 className="block-title">{title}</h2>}
      <div className="block-content">{children}</div>
    </div>
  );
};

export default Block;
