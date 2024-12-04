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
    <div className="skeleton-box" style={{ maxWidth: "400px" }}>
      <div className="box-1"></div>
      <div className="box-2">
        <div className="box-3">
          <div className="box-4"></div>
          <div className="box-5">
            <div className="box-6"></div>
            <div className="box-7"></div>
          </div>
        </div>
        <div className="box-8"></div>
        <div className="box-9">
          <div>
            <div className="box-10"></div>
            <div className="box-11"></div>
          </div>
          <div className="box-14">
            <div className="box-12"></div>
            <div className="box-13"></div>
          </div>
        </div>
        <div className="box-15"></div>
        <div className="box-16">
          <div className="box-17"></div>
          <div className="box-17"></div>
          <div className="box-17"></div>
          <div className="box-17"></div>
        </div>
      </div>
      <div className="box-18">
        <div>
          <div className="box-19"></div>
          <div className="box-20"></div>
          <div className="box-21"></div>
          <div className="box-22"></div>
        </div>
        <div className="box-23"></div>
      </div>
      <div className="box-24">
        <div className="box-25">
          <div className="box-26"></div>
          <div className="box-27"></div>
        </div>
        <div>
          <div className="box-28">
            <div className="box-29"></div>
            <div className="box-30"></div>
          </div>
          <div className="box-28">
            <div className="box-29"></div>
            <div className="box-30"></div>
          </div>
          <div className="box-28">
            <div className="box-29"></div>
            <div className="box-30"></div>
          </div>
          <div className="box-28">
            <div className="box-29"></div>
            <div className="box-30"></div>
          </div>
          <div className="box-28">
            <div className="box-29"></div>
            <div className="box-30"></div>
          </div>
          <div className="box-28">
            <div className="box-29"></div>
            <div className="box-30"></div>
          </div>
          <div className="box-28">
            <div className="box-29"></div>
            <div className="box-30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
