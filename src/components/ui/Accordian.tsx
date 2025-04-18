"use client";
import Image from "next/image";
import {  useRef } from "react";
import { cn } from "@/utils";

import minusIcon from "@/public/icons/minus.svg";
import Text from "./Text";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  isActive: boolean;
  onClick: () => void;
}

const Accordion: React.FC<AccordionProps> = (props) => {
  const { title, children, isActive: isOpen, onClick,  } = props;
  const contentRef = useRef<HTMLDivElement | null>(null);

  const toggleAccordion = () => {
    onClick();
  };

  const contentHeight =
    isOpen && contentRef.current ? contentRef.current.offsetHeight : 0;

  return (
    <div
      // className="cursor-pointer rounded-[4px] border-[1px] border-[#888888] py-4 pl-2 mob:py-5"
      className={cn(
        "cursor-pointer  border-b-[1px] border-[#FFFFFF1A] py-6 w-full mob:py-5",
        isOpen && "border-[#FFFFFF1A]",
      )}
      onClick={toggleAccordion}
    >
      <div className="flex items-center justify-between  mob:px-3">
        <Text 
        // className="text-[16px] font-normal font-sofiapro leading-[22.4px] text-[#888888] mob:max-w-[85%]"
         className={cn(
          "text-[26.36px] font-normal font-raleway leading-[43px] text-[#FFFFFF] mob:max-w-[85%]",
          isOpen && "text-[#F6F6F6]",
        )}
        >{title}</Text>

        <button  className="relative border border-[#A8E54375] rounded-full w-[40px] h-[40px] flex items-center justify-center bg-[#A8E5431A] mob:w-[30px] mob:h-[30px]">
          <Image src={minusIcon} alt="minusIcon"
            className={cn(
                "   transition-all duration-300",
                isOpen && "rotate-[0deg]",
              )}
          />
          <Image
            src={minusIcon}
            alt="minusIcon"
            className={cn(
              "absolute top-[50%] translate-y-[-50%] rotate-[90deg] transition-all duration-300",
              isOpen && "rotate-[180deg]",
            )}
          />
        </button>
      </div>
      <div 
          className={cn(
              "gradient-line my-5 transition-opacity duration-300 ease-in-out",
              isOpen ? "opacity-100 delay-0 block" : "opacity-0 delay-300 duration-300  hidden"
          )}
      ></div>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out mob:mt-4"
        style={{
          maxHeight: contentHeight + "px",
        }}
      >

        <div
          className="max-w-[100%]   font-raleway text-[#FFFFFF80] text-[19.42px] font-medium leading-[29.4px] "
          ref={contentRef}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;