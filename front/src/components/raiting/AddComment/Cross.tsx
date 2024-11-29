const Cross = ({ toggleComment }: { toggleComment: () => void }) => {
  return (
    <span onClick={toggleComment} className="commonCross">
      <img src="./cross.svg" alt="" />
    </span>
  );
};

export default Cross;
