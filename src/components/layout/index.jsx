import { Outlet } from "react-router-dom";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";

export default function Layout() {
  return (
    <div className="l_container max-w-[393px] h-screen mx-auto flex flex-col">
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}
