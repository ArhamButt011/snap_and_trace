import Button from '@/components/ui/Button'
import Text from '@/components/ui/Text'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden px-5" id="home-section">
      <div className="absolute inset-0 z-0 flex justify-center">
        <div
          className="w-[700px] h-[700px] rounded-full mt-10
  bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
  from-[#A8E543]/30 via-[#AAFFAA]/15 to-transparent blur-3xl"
        ></div>
      </div>

      <div className="relative z-10 pb-20 mx-auto w-full max-w-[1110px] pt-48  text-center ">
        <Text
          as="h1"
          className="bg-gradient-to-r from-[#ffffff] to-[#999999] text-transparent bg-clip-text mob:text-[28px] mob:leading-[41px]"
        >
          DXF Files Modifications Using AI
        </Text>
        <div className="mt-10">
          <div className="p-[10px] rounded-full border border-[#A8E54305] inline-block w-[300px] mx-auto">
            <div className="p-[10px] rounded-full border border-[#A8E5430F]">
              <div className="p-[10px] rounded-full border border-[#A8E54321]">
                <Button className="w-full">Try Modification Now</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 ">
          <Text>
            Effortlessly create precise DXF files for manufacturing custom tool
            drawer inserts with AI-powered automation. Ability to modify DXF
            files (add space next to tool-cutout for fingers). Simplify your
            workflow and take tool organization to the next level. Start your
            free trial today!
          </Text>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-12 justify-center flex-row tab:flex-col z-10 md:px-0 ">
        <Image
          src="/images/hero/dxf1.svg"
          height={300}
          width={200}
          alt="img1"
          className="rounded-xl shadow-md w-full max-w-[462.48px] h-auto"
        />
        <Image
          src="/images/hero/dxf2.svg"
          height={300}
          width={200}
          alt="img2"
          className="rounded-xl shadow-md w-full max-w-[527.7px] tab:max-w-[462.48px] h-auto"
        />
        <Image
          src="/images/hero/dxf3.svg"
          height={300}
          width={200}
          alt="img3"
          className="rounded-xl shadow-md w-full max-w-[462.48px] h-auto"
        />
      </div>
    </section>
  )
}

export default Hero
