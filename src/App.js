import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

const App = () => {
  const content = useRoutes(routes);
  return <Suspense fallback={<div>Loading...</div>}>{content}</Suspense>;
};

export default App;
