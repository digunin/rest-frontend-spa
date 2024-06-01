import React from "react";
import { useAppSelector } from "../store";

const AppOverlay = () => {
  const isShow = useAppSelector((state) => state.overlayState);
  if (!isShow) return <></>;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 999,
      }}
    ></div>
  );
};

export default AppOverlay;
