import { Outlet } from "react-router-dom";
import NavigationHeader from "@components/layout/NavigationHeader";
import NavigationBar from "@components/layout/NavigationBar";

export default function Layout() {
  return (
    <div className="l_container max-w-[393px] h-screen mx-auto flex flex-col">
      <NavigationHeader />
      <Outlet />
      {/* <NavigationBar /> */}
    </div>
  );
}
