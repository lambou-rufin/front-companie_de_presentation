import React from 'react';
import './Kanban.css';

interface KanbanProps {
  title: string;
  tasks: string[];
}

const Kanban: React.FC<KanbanProps> = ({ title, tasks }) => {
  return (
    <div className="kanban-column">
      <h3>{title}</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default Kanban;
