import { Outlet } from "react-router-dom";
import NavBarDesktop from "../Navbar/Desktop";

const Layout = () => {
  return (
    <>
      <div className="max-lg:hidden">
        <NavBarDesktop />
      </div>
      <main className="">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;