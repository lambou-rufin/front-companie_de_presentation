import React from 'react';
import './Form.css';

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return <form onSubmit={onSubmit} className="form">{children}</form>;
};

export default Form;
