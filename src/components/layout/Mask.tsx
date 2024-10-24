import { memo } from "react";
import type { FC, ReactNode } from "react";
import "./Mask.scss";
interface IMaskProps {
  children?: ReactNode;
}

const Mask: FC<IMaskProps> = ({ children }) => {
  return (
    <div className="mask">
      <div className="mask-content">{children}</div>
    </div>
  );
};

export default memo(Mask);
