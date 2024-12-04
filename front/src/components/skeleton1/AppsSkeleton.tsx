import React from "react";
import "./skeleton.scss";

interface SkeletonBoxProps {
  width: string;
  height: string;
  borderRadius?: string;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({ width, height, borderRadius = "4px" }) => (
  <div
    style={{
      width,
      height,
      backgroundColor: "#e0e0e0",
      borderRadius,
      animation: "pulse 1.5s infinite",
    }}
    className="box"
  />
);

const AppsSceleton = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around", gap: "5px" }}>
      {[...Array(4)].map((_, index) => (
        <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SkeletonBox width="60px" height="60px" borderRadius="12px" />
          <SkeletonBox width="40px" height="12px" borderRadius="4px" />
        </div>
      ))}
    </div>
  );
};

export default AppsSceleton;
