export interface ActionProps {
  text: string;
  icon: string;
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
