import { Outlet } from "react-router-dom";
import NavBarDesktop from "../Navbar/desktop";
import NavbarMobile from "../Navbar/mobile";
import useScrollDirection from "../../hooks/useScrollDirection";

const Layout = () => {
  const scrollDirection = useScrollDirection();
  return (
    <>
      <div className="max-lg:hidden">
        <NavBarDesktop scrollDirection={scrollDirection} />
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
