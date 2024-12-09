import { ReactSVG } from "react-svg";

const Cross = ({ toggleComment }: { toggleComment: () => void }) => {
  return (
    <span onClick={toggleComment} className="commonCross">
      <ReactSVG src="./cross.svg" />
    </span>
  );
};

export default Cross;
