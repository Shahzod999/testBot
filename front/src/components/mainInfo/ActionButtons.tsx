export interface ActionProps {
  text: string;
  icon: string;
}

const ActionButtons = ({ text, icon }: ActionProps) => {
  return (
    <button>
      <object type="image/svg+xml" data={icon}>
        Your browser does not support SVG
      </object>
      <span>{text}</span>
    </button>
  );
};

export default ActionButtons;
