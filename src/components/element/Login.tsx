import { memo } from "react";
import type { FC, ReactNode } from "react";
import type UserInfo from "../../types/UserInfo";
import "./Login.scss";
import useTokenStore from "../../store/tokenStore";
import { testAuth } from "../../utils/request";

interface ILoginProps {
  children?: ReactNode;
  cancelMask: () => void;
}

const Login: FC<ILoginProps> = ({ cancelMask }) => {
  const fetchLogin = useTokenStore(state=>state.fetchLogin);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usrname = (e.target as HTMLFormElement).usrname.value;
    const passwd = (e.target as HTMLFormElement).passwd.value;
    const userInfo: UserInfo = { usrname, passwd };
    console.log(userInfo);
    fetchLogin(userInfo);
    testAuth().then((res) => {
      console.log(res);
    })
    cancelMask();
  }
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="login-title">Login</div>
        <div className="login-input">
          <label htmlFor="usrname">username:</label>
          <input type="text" name="usrname" id="usrname" />
        </div>
        <div className="login-input">
          <label htmlFor="passwd">password:</label>
          <input type="password" name="passwd" id="passwd" />
        </div>
        <div className="login-button">
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );
};

export default memo(Login);
