import { useEffect } from "react";
import { useLocation } from "react-router";
import NProgress from "nprogress";

const ScrollProgress = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    NProgress.inc(); 
    setTimeout(() => {
      NProgress.done();
    }, 500); 
  }, [location]);

  return null;
};

export default ScrollProgress;
