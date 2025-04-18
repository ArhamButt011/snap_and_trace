import React from "react";
import Image from "next/image";
import bgleft from "@/public/icons/fb.svg";
import bgright from "@/public/icons/fb.svg";
import arrowback from "@/public/icons/fb.svg";
import Questions from "./Questions";
import Link from "next/link";
const Faqs = () => {
  return (
    <>
    
    <div className="flex justify-center px-5 mob:px-3">
      <div className="w-full max-w-[815px] relative mb-20 min-h-[500px]">
       
        <div className="w-full  mob:p-3 relative z-10">
          
        

          <div className="gradient-line mb-12 mob:my-10"></div>

          <Questions />
        </div>
      </div>
    </div>
    </>
  );
};

export default Faqs;