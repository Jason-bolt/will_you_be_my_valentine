import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import ValentineDisplay from "./pages/ValentineDisplay";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "valentine/:messageToken", element: <ValentineDisplay /> },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/valentine/:messageToken" element={<ValentineDisplay />} />
    //     <Route path="*" element={<NotFound />} />
    //   </Routes>
    // </BrowserRouter>
    <RouterProvider router={router} />
  );
}

export default App;
