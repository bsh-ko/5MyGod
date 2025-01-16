import { Outlet } from "react-router-dom";
import NavigationHeader from "@components/layout/NavigationHeader";
import NavigationBar from "@components/layout/NavigationBar";
import { NavigationProvider } from "@contexts/NavigationContext";

export default function Layout() {
  return (
    <NavigationProvider>
      <div className="l_container max-w-[393px] h-screen mx-auto flex flex-col">
        <NavigationHeader />
        <Outlet />
        <NavigationBar />
      </div>
    </NavigationProvider>
  );
}
