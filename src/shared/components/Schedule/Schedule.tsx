import React from 'react';
import './Schedule.css';

interface ScheduleProps {
  tasks: { time: string; task: string }[];
}

const Schedule: React.FC<ScheduleProps> = ({ tasks }) => {
  return (
    <div className="schedule">
      {tasks.map((task, index) => (
        <div key={index} className="schedule-task">
          <span className="schedule-time">{task.time}</span>
          <span className="schedule-task-name">{task.task}</span>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
