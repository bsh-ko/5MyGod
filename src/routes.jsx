import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Detail from "@pages/board/Detail";

const Layout = lazy(() => import("@components/layout"));
const MainPage = lazy(() => import("@pages/board/MainPage"));
const Detail = lazy(() => import("@pages/board/Detail"));
const Login = lazy(() => import("@pages/user/Login"));
const Signup = lazy(() => import("@pages/user/Signup"));


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        { index: true, element: <MainPage /> },
        { path: "products/:_id", element: <Detail /> },
        // { path: ":type", element: <List /> },
        // { path: ":type/new", element: <New /> },
        // { path: ":type/:_id", element: <Detail /> },
        // { path: ":type/:_id/edit", element: <Edit /> },
        { path: "users/signup", element: <Signup /> },
        { path: "users/login", element: <Login /> },
      ],
    },
  ],
  {
    future: {
      // 없으면 콘솔에 경고 표시 (예정된 업데이트 이슈)
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
