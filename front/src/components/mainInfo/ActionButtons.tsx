export interface ActionProps {
  text: string | string[];
  icon?: string;
}

const ActionButtons = ({ text, icon }: ActionProps) => {
  return (
    <>
      <img src={icon} alt="icons" />
      <span>{text}</span>
    </>
  );
};

export default ActionButtons;
