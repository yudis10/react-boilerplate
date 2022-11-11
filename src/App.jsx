import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Serials from "./pages/Serials";
import BookSearch from "./components/BookSearch";
import MovieDetail from "./pages/MovieDetail";
import TvDetail from "./pages/TvDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/detail", element: <Detail /> },
      { path: "/serials", element: <Serials /> },
      { path: "/books", element: <BookSearch /> },
      { path: "/movie/:movieId", element: <MovieDetail /> },
      { path: "/tv/:tvId", element: <TvDetail /> },
    ],
  },
  { path: "/nolayout", element: <Detail /> },
]);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
