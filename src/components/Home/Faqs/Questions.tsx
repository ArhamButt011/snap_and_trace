"use client";
import React, { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import Accordion from "@/ui/Accordian";
import Text from "@/components/ui/Text";
// import useIsMounted from "@/hooks/useIsMounted";


const accordionData = [
  {
    id: 2,
    title: "What image formats are supported?",
    content:
      "We support .jpg, .png, and .tiff formats. For accurate analysis, please upload high-resolution images.",
  },
  {
    id: 5,
    title: "How long does it take to analyze an image?",
    content:
      "We support .jpg, .png, and .tiff formats. For accurate analysis, please upload high-resolution images.",
  },

  {
    id: 3,
    title: "How much does it cost to use the Crumbs platform?",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae neque provident eaque, sequi autem voluptas.",
  },

  {
    id: 6,
    title: "What image formats are supported?",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae neque provident eaque, sequi autem voluptas.",
  },

  {
    id: 1,
    title: "Is my data secure?",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae neque provident eaque, sequi autem voluptas.",
  },

  {
    id: 4,
    title: "Can I use my own AI model?",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae neque provident eaque, sequi autem voluptas.",
  },
  {
    id: 7,
    title: "What types of images can DXF Contour?",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae neque provident eaque, sequi autem voluptas.",
  },
  {
    id: 8,
    title:
      "How do I interpret the results?",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae neque provident eaque, sequi autem voluptas.",
  },
];

const Questions = () => {
//   const { isMounted } = useIsMounted();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

//   if (!isMounted) return null;

  const handleAccordionClick = (id: number) => {
    setActiveAccordion(id === activeAccordion ? null : id);
  };

  return (
    <div id="faq-section" className="overflow-hidden  text-white ">
          <Text as="h1" className="text-[46.93px] text-center font-bold font-raleway  text-white  mb-[27px]">
            Frequently Asked Questions
          </Text>
          <Text  className="text-center text-[19.78px] mb-[77px]">
          Here is everything that you want to know about the poduct and working
          </Text>

      <div
        className="mx-auto mt-[20px] max-w-[815px] mob:w-full mob:px-[0px]"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 1, 900: 1 }}>
          <Masonry gutter="20px">
            {accordionData.map((accordion) => (
              <Accordion
                key={accordion.id}
                title={accordion.title}
                isActive={accordion.id === activeAccordion}
                onClick={() => handleAccordionClick(accordion.id)}
              >
                {accordion.content}
              </Accordion>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};

export default Questions;