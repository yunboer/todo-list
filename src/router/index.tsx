import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../pages/App";
import TodoListPage from "../pages/TodoListPage";
import Test from "../pages/testpage/Test";
import A from "../pages/testpage/A";
import B from "../pages/testpage/B";
import C from "../pages/testpage/C";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path: "",
                element: <Navigate to={"/todolist"} />,
            },
            {
                path: "todolist",
                element: <TodoListPage/>,
            },
            {
                path: "test",
                element: <Test />,
            },
            {
                path: "a",
                element: <A />,
            },
            {
                path: "b",
                element: <B />,
            },
            {
                path: "c",
                element: <C />,
            },
        ]
    }
])

export default router;