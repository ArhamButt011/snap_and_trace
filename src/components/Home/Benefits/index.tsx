import Button from '@/components/ui/Button'
import Text from '@/components/ui/Text'
import React from 'react'
import FeatureCards from './FeatureCards'

const Benefits = () => {
  return (
    <section className="relative overflow-hidden" id="benefits">
      {/* Removed previous background glow here */}

      <div className="z-10 mx-auto w-full max-w-[1131px] pt-20 pb-20 px-4">
        <div className="flex justify-between md:flex-row flex-col">
          <div className="max-w-3xl">
            <Text as="h1">Why Choose Foam Layout Tool?</Text>
            <Text className="mt-5">
              Designed for both hobbyists and professionals, our software
              eliminates tedious manual design work, delivers accurate files
              ready for manufacturing custom tool drawer inserts, and saves you
              time and effort.
            </Text>
          </div>

          {/* Button with glow effect */}
          <div className="relative flex justify-center items-center mt-10">
            {/* Glowing background */}
            {/* <div className="absolute z-20 w-[600px] h-[600px] rounded-full 
              bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
              from-[#A8E543]/30 via-[#AAFFAA]/15 to-transparent blur-2xl pointer-events-none">
            </div> */}
            <div className="absolute z-20 w-[600px] h-[600px] rounded-full 
  bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
  from-[#CCF6A3]/25 via-[#DFFFCC]/10 to-transparent blur-2xl pointer-events-none">
</div>


            {/* Button on top of glow */}
            <div className="relative z-30 p-[10px] rounded-full border border-[#A8E54305] inline-block w-[190px] mx-auto">
              <div className="p-[10px] rounded-full border border-[#A8E5430F]">
                <div className="p-[10px] rounded-full border border-[#A8E54321]">
                  <Button className="w-full">Try Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature cards below */}
        <div>
          <FeatureCards />
        </div>
      </div>
    </section>
  )
}

export default Benefits
