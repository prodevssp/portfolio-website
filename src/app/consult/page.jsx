"use client";
import { InlineWidget } from "react-calendly";

const Consult = () => {
  return (
    <div className="min-h-screen">
      <InlineWidget url={process.env.NEXT_PUBLIC_CALENDLY_URL} />
    </div>
  );
};

export default Consult;
