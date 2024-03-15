import { lazy } from "react";

const QuizMakerPage = lazy(() => import("./pages/QuizMaker"));
const QuizResultPage = lazy(() => import("./pages/QuizResult"));

const routes = [
  {
    path: "/",
    element: <QuizMakerPage />,
  },
  {
    path: "/results",
    element: <QuizResultPage />,
  },
];

export default routes;