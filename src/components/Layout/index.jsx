import { Outlet } from "react-router-dom";
import NavBarDesktop from "../Navbar/Desktop";
import NavbarMobile from "../Navbar/mobile";

const Layout = () => {
  return (
    <>
      <div className="max-lg:hidden">
        <NavBarDesktop />
      </div>
      <div className="lg:hidden">
        <NavbarMobile />
      </div>
      <main className="">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;