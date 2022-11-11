import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import MainNavigation from "./MainNavigation";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main className="container px-4 mx-auto my-3">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default RootLayout;
