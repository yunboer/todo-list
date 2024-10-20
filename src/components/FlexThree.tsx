import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import "./FlexThree.scss";

interface IFlexThreeProps {
  children?: ReactNode;
  aCompent: ReactNode;
  bCompent: ReactNode;
  cCompent: ReactNode;
}

const FlexThree: FC<IFlexThreeProps> = ({aCompent, bCompent, cCompent}) => {
  // 1 初始化
  const [aWidth, setAWidth] = useState(100);
  const [bWidth, setBWidth] = useState(150);
  const [cWidth, setCWidth] = useState(150);
  // const [containerWidth, setContainerWidth] = useState(400); // 容器的初始宽度
  const vpWidth = useRef(0); // 容器的初始宽度
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.getBoundingClientRect().width;
      vpWidth.current = window.innerWidth;
      setAWidth(100);
      setBWidth((width - 100) / 2);
      setCWidth((width - 100) / 2);
    }
  }, []);

  const isDragging = useRef(false);
  const target = useRef<"a" | "b">("a");
  const startX = useRef(0);
  // 禁止选择文本
  const disableTextSelection = () => {
    document.body.style.userSelect = "none";
  };

  // 恢复选择文本
  const enableTextSelection = () => {
    document.body.style.userSelect = "auto";
  };
  // 1 鼠标按下时初始化状态
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, t: "a" | "b") => {
      isDragging.current = true;
      target.current = t;
      startX.current = e.clientX;
      disableTextSelection();
    },
    []
  );
  // 2 鼠标抬起
  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
      enableTextSelection();
    };
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // 4 鼠标移动
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const diff = e.clientX - startX.current;
      if (target.current === "a"){
        if (aWidth + diff < 100 || aWidth + diff > 150 || bWidth - diff < 150) return;
        setAWidth((aWidth) => aWidth + diff);
        setBWidth((bWidth) => bWidth - diff);
      }
      else {
        if (bWidth + diff < 150 || cWidth - diff < 150) return;
        setBWidth((bWidth) => bWidth + diff);
        setCWidth((cWidth) => cWidth - diff);
      }
      startX.current = e.clientX;
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [aWidth, bWidth, cWidth]);

  // 5 监听页面尺寸变化，并按比例调整宽度
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const newVpWidth = window.innerWidth;
        const diff = newVpWidth - vpWidth.current;
        // console.log(containerRef.current.getBoundingClientRect().width)
        setBWidth((bWidth) => bWidth + diff / 2);
        setCWidth((cWidth) => cWidth + diff / 2);
        vpWidth.current = newVpWidth;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="test-area" ref={containerRef}>
      <div className="a" style={{ width: aWidth + "px" }}>
        {aCompent}
      </div>
      <div className="border" onMouseDown={(e) => handleMouseDown(e, "a")}>
        <div className="line"></div>
      </div>
      <div className="b" style={{ width: bWidth + "px" }}>
        {bCompent}
        
      </div>
      <div className="border" onMouseDown={(e) => handleMouseDown(e, "b")}>
        <div className="line"></div>
      </div>
      <div className="c" style={{ width: cWidth + "px" }}>
        {cCompent}
      </div>
    </div>
  );
};

export default memo(FlexThree);
