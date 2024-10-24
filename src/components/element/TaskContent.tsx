import { memo } from "react";
import type { FC, ReactNode } from "react";

interface ITaskContentProps {
  children?: ReactNode;
  content: string;
}

const TaskContent: FC<ITaskContentProps> = ({content}) => {
  return (
    <div>
      {content}
    </div>
  );
};

export default memo(TaskContent);