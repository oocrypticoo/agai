import React from "react";

const Headline = ({ text }: { text: string }) => {
  return (
    <div className="w-fit px-[10px] py-[3px] flex items-center justify-center bg-black dark:bg-white text-white dark:text-[#060606] text-[13px] font-degular-medium tracking-widest rounded-full">
      {text}
    </div>
  );
};

export default Headline;
