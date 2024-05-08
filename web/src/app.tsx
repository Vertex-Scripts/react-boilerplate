import { Suspense, useEffect } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { routes } from "virtual:routes";

import { fetchNui } from "./utils/fetchNui";

export const router = createHashRouter(routes);

export default function App() {
  useEffect(() => {
    fetchNui("initialized");
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
