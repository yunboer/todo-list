import { createBrowserRouter } from "react-router-dom";
import TodoList from "../pages/TodoListPage";
import App from "../pages/App";
import TodoListPage from "../pages/TodoListPage";
import Test from "../pages/Test";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path: "todolist",
                element: <TodoList/>,
                children:[
                    {
                        path: "all",
                        element: <TodoListPage />
                    },
                    {
                        path: "today",
                        element: <TodoListPage />
                    },
                    {
                        path: "tomorrow",
                        element: <TodoListPage />
                    },
                    {
                        path: "last7day",
                        element: <TodoListPage />
                    },
                ]
            },
            {
                path: "test",
                element: <Test />,
            }
        ]
    }
])

export default router;