// import { Outlet } from "react-router-dom";
// import useScrollDirection from "../../hooks/useScrollDirection";
// import NavBarDesktop from "../Navbar/desktop";
// import NavbarMobile from "../Navbar/mobile";

// const Layout = () => {
//   const scrollDirection = useScrollDirection();
//   const showNavbar = scrollDirection === "up";

//   return (
//     <>
//       <div className="max-lg:hidden">
//         <div
//           className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//             showNavbar
//               ? "opacity-100 translate-y-0"
//               : "opacity-0 -translate-y-full"
//           }`}
//         >
//           <NavBarDesktop showNavbar={showNavbar} />
//         </div>
//       </div>

//       <div className="lg:hidden">
//         <NavbarMobile />
//       </div>

//       <main className="lg:pt-[88px] min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-88px)]">
//         <Outlet />
//       </main>
//     </>
//   );
// };

// export default Layout;

import { Outlet } from "react-router-dom";
import NavBarDesktop from "../Navbar/desktop";
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
