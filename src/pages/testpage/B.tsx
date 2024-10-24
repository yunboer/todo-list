import { memo } from "react";
import type { FC, ReactNode } from "react";

interface IBProps {
  children?: ReactNode;
}

const B: FC<IBProps> = () => {
  return (
    <div>
      B
    </div>
  );
};

export default memo(B);