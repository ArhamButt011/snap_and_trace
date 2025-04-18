import Button from '@/components/ui/Button'
import Text from '@/components/ui/Text'
import React from 'react'
import FeatureCards from './FeatureCards'

const WhatWeOffer = () => {
  return (
    <section className="relative overflow-hidden" id="benefits-section">
      <div className="absolute inset-0 z-0 flex justify-end">
        {/* <div
          className="w-[600px] h-[600px] rounded-full
                  bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
                  from-[#A8E543]/30 via-[#AAFFAA]/15 to-transparent blur-2xl"
        ></div> */}
      </div>
      <div className="z-10 mx-auto w-full max-w-[1131px] pt-20 mob:pt-0  px-4">
        <div className="flex justify-between md:flex-row flex-col">
          <div className="max-w-3xl">
            <Text as="h1">What We Offer?</Text>
            <Text className="mt-5">
            Designed for both hobbyists and professionals, our software eliminates tedious manual design work.
            </Text>
          </div>

          <div className="mt-10">
            <div className="p-[10px] rounded-full border border-[#A8E54305] inline-block w-[190px] mx-auto">
              <div className="p-[10px] rounded-full border border-[#A8E5430F]">
                <div className="p-[10px] rounded-full border border-[#A8E54321]">
                  <Button className="w-full">Try Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <FeatureCards />
        </div>
      </div>
    </section>
  )
}

export default WhatWeOffer
