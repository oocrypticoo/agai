import React from "react";

const ButtonSecondary = ({
  text,
  Icon,
  width,
  onClick,
}: {
  text: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  width: number;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      style={{ width: `${width}px` }}
      className="group px-[15px] py-[3px] flex items-center justify-center gap-1 border-2 border-black dark:border-white !rounded-full text-[#1C1C1C] dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-[14px] font-degular-medium cursor-pointer transition-all duration-500 !outline-none"
    >
      {text}
    </button>
  );
};

export default ButtonSecondary;
