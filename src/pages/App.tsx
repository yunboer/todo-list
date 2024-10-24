import { NavLink, Outlet } from "react-router-dom"
import "./App.scss"
import { useState } from "react"
import Login from "../components/element/Login"
import SignUp from "../components/element/SignUp"
import Mask from "../components/layout/Mask"

function App() {
  const [maskMode, setMaskMode] = useState<"none" | "login" | "signup">("none")
  const cancelMask = () => {
    setMaskMode("none");
  }
  return (
    <>
      <div className="app">
        <div className="app-bar">
          <NavLink to={"/todolist"}>todo</NavLink>
          <a onClick={()=>setMaskMode("login")}>Log</a>
          <a onClick={()=>setMaskMode("signup")}>Sig</a>
          <NavLink to={"/test"}><strong style={{color: "green"}}>T</strong></NavLink>
          <NavLink to={"/a"}><strong style={{color: "green"}}>A</strong></NavLink>
          <NavLink to={"/b"}><strong style={{color: "green"}}>B</strong></NavLink>
          <NavLink to={"/c"}><strong style={{color: "green"}}>C</strong></NavLink>
        </div>
        <div className="app-main">
          <Outlet />
        </div>
      </div>
      <>
          {
            maskMode === "login" && <Mask><Login cancelMask={cancelMask} /></Mask>
          }
          {
            maskMode === "signup" && <Mask><SignUp cancelMask={cancelMask} /></Mask>
          }
        </>
    </>
  )
}

export default App
