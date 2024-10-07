// src/shared/components/Icon/Icon.tsx
import React from 'react';
import { FaHome, FaUser, FaCog, FaBook, FaCode} from 'react-icons/fa';

export type IconType = 'home' | 'user' | 'settings' | 'book' | 'code' | 'solid'| 'about' | 'plus';


interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  type: IconType;
  className?: string; // Optionals
}

const Icon: React.FC<IconProps> = ({ type, ...props }) => {
  let IconComponent;

  switch (type) {
    case 'home':
      IconComponent = FaHome;
      break;
    case 'user':
      IconComponent = FaUser;
      break;
    case 'settings':
      IconComponent = FaCog;
      break;
    case 'book':
      IconComponent = FaBook;
      break;
    case 'code':
      IconComponent = FaCode;
      // break;
      // case 'plus':
      //   IconComponent = FaPlus;
      break;
    default:
      IconComponent = FaHome;
  }

  return <IconComponent {...props} />;
};

export default Icon;
