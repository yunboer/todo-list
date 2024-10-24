import { memo } from "react";
import type { FC, ReactNode } from "react";

interface ITestProps {
  children?: ReactNode;
}

const Test: FC<ITestProps> = () => {
  return (
    <div>
        Test
    </div>
  );
};

export default memo(Test);