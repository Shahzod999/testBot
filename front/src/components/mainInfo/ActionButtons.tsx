import { ReactNode } from "react";

export interface ActionProps {
  text: string;
  icon: ReactNode;
}

const ActionButtons = ({ text, icon }: ActionProps) => {
  return (
    <button>
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default ActionButtons;
