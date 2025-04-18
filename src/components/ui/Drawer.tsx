"use client";
import { useCallback, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { IoClose } from "react-icons/io5";


type DrawerProps = {
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
  children: React.ReactNode;
};

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  className,
  children,
}) => {
  const handleEscapeKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      // onClose();
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      document.addEventListener("keydown", handleEscapeKeyPress);
    } else {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleEscapeKeyPress);
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [isOpen, handleEscapeKeyPress]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      //   onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed  right-0 top-0 z-[100] h-full w-full  "
          onClick={handleOverlayClick}
        >
          {/* open */}
        </div>
      )}
      <div
        className={twMerge(
          `fixed right-0 top-0 z-[999] h-full   w-[705px] ] mob:w-full transform overflow-x-hidden text-white  drawerbg transition-transform duration-300 bg-accent/85 ease-in-out ${
            isOpen
              ? "transition-transform duration-700 ease-in-out translate-x-0"
              : "transition-transform duration-700 ease-in-out  translate-x-full"
            // isOpen ? "h-[100%] w-full translate-y-[10%]" : "translate-y-full"
          }`,
          className
        )}
        style={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Add desired box shadow
        }}
      >
        {/* Drawer Close Button */}
        <div className="mt-[20px]  px-[60px] mob:px-[25px] flex justify-between items-center">
         
                  logo
          <button className="text-black" onClick={onClose}>
            <IoClose  />
          </button>
        </div>

        {/* Drawer content */}
        {/* Conditionally render the children based on 'isOpen' */}
        {isOpen && (
          <div className="flex flex-col justify-center items-center w-full mt-14">
            {children}
          </div>
        )}
      </div>
    </>
  );
};

export default Drawer;
