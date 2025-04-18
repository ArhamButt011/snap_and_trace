import React from 'react';
import Image from 'next/image';

import step1 from "@/public/images/hero/step1.png";
import step2 from "@/public/images/hero/step2.png";
import step3 from "@/public/images/hero/step3.png";
import step4 from "@/public/images/hero/step4.png";
import step5 from "@/public/images/hero/step5.png";
import step6 from "@/public/images/hero/step6.png";
import step7 from "@/public/images/hero/step7.png";
import step8 from "@/public/images/hero/step8.png";

import Text from '@/components/ui/Text';

const steps = [
  {
    img: step1,
    title: "Import DXF files from the tracing software"
  },
  {
    img: step2,
    title: "Choose Foam dimensions according to your Preference",
    note: "(max. 900x600mm)"
  },
  {
    img: step3,
    title: "Choose type of foam",
    note: "(Shadow foam or PE-Foam)"
  },
  {
    img: step4,
    title: "Choose Foam layers",
    note: "(Standard 1 bottom layer and 1 top layer with the cut-outs)"
  },
  {
    img: step5,
    title: "Choose thickness foam layers",
    note: "(5 mm/ 10 mm/ 15mm/ 20mm)"
  },
  {
    img: step6,
    title: "Choose fillet for corners of the foam",
    note: "(no/ yes, choose dimensions: …mm)"
  },
  {
    img: step7,
    title: "Trace your tools -> Link to software contour trace tool"
  },
  {
    img: step8,
    title: "Nest your tools in foam"
  }
];

const Steps = () => {
  return (
    <div className='px-5 mb-[120px]'>
      <div className="w-full max-w-[1131px] mx-auto">
        {steps.map((step, index) => (
          <div key={index}>
            <div className="flex gap-[30px] mob:gap-[15px] items-center">
              <Image className='mob:w-[70px]' src={step.img} alt={`step${index + 1}`} width={127} height={127} />
              <div className="bg-[#FFFFFF]/10 rounded-[13px] w-full px-5 py-4">
                <Text>Step {String(index + 1).padStart(2, '0')}</Text>
                <Text className='text-[26px] text-white font-medium'>
                  {step.title}
                  {step.note && (
                    <span className='text-[#FFFFFF80] text-[24px] ml-2 mob:text-[16px] mob:leading-[22.2px] mob:mt-2'>{step.note}</span>
                  )}
                </Text>
              </div>
            </div>
            {index !== steps.length - 1 && (
              <div className="w-[2.6px] bg-accent h-[64px] ml-[54px] mob:ml-[30px]"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
