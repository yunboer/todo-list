import { NavLink, Outlet } from "react-router-dom"
import "./App.scss"

function App() {

  return (
    <>
      <div className="app">
        <div className="app-bar">
          <NavLink to={"/todolist"}>A</NavLink>
          <NavLink to={"/todolist"}>B</NavLink>
          <NavLink to={"/todolist"}>C</NavLink>
          <NavLink to={"/todolist"}>D</NavLink>
          <NavLink to={"/test"}><strong style={{color: "green"}}>T</strong></NavLink>
        </div>
        <div className="app-main">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
