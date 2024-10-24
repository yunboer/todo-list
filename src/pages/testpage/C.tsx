import { memo } from "react";
import type { FC, ReactNode } from "react";

interface ICProps {
  children?: ReactNode;
}

const C: FC<ICProps> = () => {
  return (
    <div>
      C
    </div>
  );
};

export default memo(C);