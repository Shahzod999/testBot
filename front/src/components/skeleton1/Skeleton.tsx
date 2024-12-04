import React from "react";
import "./skeleton.scss";
import AppsSceleton from "./AppsSkeleton";

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
      marginBottom: "8px",
      animation: "pulse 1.5s infinite",
    }}
  />
);

const Skeleton: React.FC = () => {
  return (
    <div style={{ padding: "16px", maxWidth: "400px" }}>
      <SkeletonBox width="100%" height="250px" borderRadius="8px" />

      <div style={{ marginTop: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <SkeletonBox width="60px" height="60px" borderRadius="50%" />
          <div>
            <SkeletonBox width="200px" height="20px" />
            <SkeletonBox width="100px" height="20px" />
          </div>
        </div>

        <div style={{ margin: "10px 0" }}>
          <SkeletonBox width="80%" height="16px" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <SkeletonBox width="100%" height="100px" />
          <SkeletonBox width="100%" height="100px" />
        </div>
        <SkeletonBox width="100%" height="40px" />
        <AppsSceleton />

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "30px" }}>
          <SkeletonBox width="100%" height="40px" />
          <SkeletonBox width="100%" height="40px" />
        </div>
        <div style={{ margin: "10px 0" }}>
          <SkeletonBox width="100%" height="150px" />
        </div>
        <div style={{ marginTop: "16px" }}>
          {[...Array(5)].map((_, index) => (
            <SkeletonBox key={index} width="100%" height="20px" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
