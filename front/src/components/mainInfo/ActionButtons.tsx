export interface ActionProps {
  text: string;
  icon: string;
}

const ActionButtons = ({ text, icon }: ActionProps) => {
  return (
    <button>
      <img src={icon} alt="" />
      <span>{text}</span>
    </button>
  );
};

export default ActionButtons;
