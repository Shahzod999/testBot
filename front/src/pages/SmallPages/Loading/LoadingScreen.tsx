import { selectedLoadingState } from "../../../app/features/bottomSheetSlice";
import { useAppSelector } from "../../../hooks/reduxHooks";
import "./loading.scss";

const LoadingScreen = () => {
  const state = useAppSelector(selectedLoadingState);

  if (!state) return;

  return (
    <div id="loading-container">
      <svg
        className="loading-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 160 160">
        <circle
          cx="80"
          cy="80"
          r="55"
          fill="none"
          stroke="black"
          strokeWidth="40"
        />
        <g transform="translate(80, 80)">
          <circle
            cx="0"
            cy="0"
            r="55"
            fill="none"
            stroke="white"
            strokeWidth="35"
            strokeDasharray="0, 345"
            strokeLinecap="round">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              begin="0s"
              dur="0.75s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dasharray"
              values="0, 345; 172.5, 172.5; 0, 345"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default LoadingScreen;
