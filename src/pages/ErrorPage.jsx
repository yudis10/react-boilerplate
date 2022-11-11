import { useRouteError } from "react-router-dom";
import MainNavigation from "./MainNavigation";

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <MainNavigation />
      <main id="error-content">
        <h1>An error occurred! (layout Router)</h1>
        <p>{error.statusText}</p>
      </main>
    </>
  );
}

export default ErrorPage;
