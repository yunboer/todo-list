import type { FC, ReactNode } from "react";

interface ITest3Props {
  children?: ReactNode;
  id: string;
}

const Test3: FC<ITest3Props> = ({ id }) => {
  console.log(id);
  return (
    <div>
      {id === "first" ? (<><input type="text" /><input type="text" /></>
          
      ) : <><>{null}</><input type="text" /></>}
      
      </div>
  );
};

export default Test3;
