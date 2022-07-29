import { useState,useEffect } from "react";

export const useMobile = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 768;

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return ()=>{
      window.removeEventListener("resize",() => setWidth(window.innerWidth));
    }
  }, []);
  return width < breakpoint;
};