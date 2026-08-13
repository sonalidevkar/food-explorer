import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function RouteFocus() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const main = document.querySelector("main");

    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus();
    }
  }, [pathname]);

  return null;
}

export default RouteFocus;