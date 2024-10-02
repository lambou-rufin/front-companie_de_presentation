import React from 'react';
import './CodePreview.css';

interface CodePreviewProps {
  code: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({ code }) => {
  return (
    <pre className="code-preview">
      <code>{code}</code>
    </pre>
  );
};

export default CodePreview;
