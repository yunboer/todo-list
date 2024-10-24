import { memo } from "react";
import type { FC, ReactNode } from "react";
import "./SignUp.scss";

interface ISignUpProps {
  children?: ReactNode;
  cancelMask: () => void;
}

const SignUp: FC<ISignUpProps> = ({ cancelMask }) => {
  return (
    <div className="signup-container">
      <form action="">
        <div className="signup-title">Signup</div>
        <div className="signup-input">
          <label htmlFor="usrname">username:</label>
          <input type="text" name="usrname" id="usrname" />
        </div>
        <div className="signup-input">
          <label htmlFor="passwd">password:</label>
          <input type="password" name="passwd" id="passwd" />
        </div>
        <div className="signup-button">
          <button onClick={cancelMask}>signup</button>
        </div>
      </form>
    </div>
  );
};

export default memo(SignUp);
