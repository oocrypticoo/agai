import React from "react";

const ButtonPrimary = ({
  text,
  Icon,
  invert,
  width,
  onClick,
}: {
  text: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  invert?: boolean;
  width: number;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      style={{ width: `${width}px` }}
      className={`group px-[15px] py-[5px] flex items-center justify-center gap-1 text-[15px] font-degular-medium !rounded-full cursor-pointer transition-all duration-500 !outline-none ${
        invert
          ? "bg-heading-invert text-heading"
          : "bg-heading text-heading-invert"
      }`}
    >
      {text}
    </button>
  );
};

export default ButtonPrimary;
