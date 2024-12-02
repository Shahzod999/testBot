import { ReactSVG } from "react-svg";

const Cross = ({ toggleComment }: { toggleComment: () => void }) => {
  return (
    <span onClick={toggleComment} className="commonCross">
      <ReactSVG src="./cross.svg" />
      {/* <img src="./cross.svg" alt="" /> */}
    </span>
  );
};

export default Cross;
