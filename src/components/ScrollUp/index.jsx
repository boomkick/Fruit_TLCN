import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollUp({children}) {
  const { pathname } = useLocation();
  // Lăn màn hình lên đầu trang
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return children;
}