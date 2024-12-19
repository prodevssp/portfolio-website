"use client";
import { useEffect, useRef } from "react";

const Consult = () => {
  const calendlyRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    calendlyRef.current.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen dark:bg-[#2C2D33] w-full flex items-center justify-center">
      <div
        ref={calendlyRef}
        className="calendly-inline-widget flex items-center justify-center"
        data-url={process.env.NEXT_PUBLIC_CALENDLY_URL}
        style={{ minWidth: "80%", height: "80vh" }}
      ></div>
    </div>
  );
};

export default Consult;
