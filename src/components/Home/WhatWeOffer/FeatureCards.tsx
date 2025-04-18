import { FaMicrochip, FaRocket, FaSlidersH } from 'react-icons/fa'
import React from 'react'
import Text from '@/components/ui/Text'
import precisionIcon from '@/public/images/hero/dfxnew.png'
import fastIcon from '@/public/images/hero/dfx2new.png'
import analysisIcon from '@/public/images/hero/nestnew.png'
import Image from 'next/image'

const features = [
  {
    title: 'Generate DXF Files',
    description:
      'Our advanced AI model offers high accuracy in generating DXF Files,startup, small business professionals make informed decisions.',
    icon: precisionIcon,
    colSpan: 'row-span-2', // taller card
  },
  {
    title: 'Modify DXF Image On Foam',
    description:
      'Our advanced AI model offers high accuracy in generating DXF Files,startup, small business professionals make informed decisions.',
    icon: fastIcon,
  },
  {
    title: 'Nest Tool In Foam',
    description:
      'Our advanced AI model offers high accuracy in generating DXF Files,startup, small business professionals make informed decisions.',
    icon: analysisIcon,
  },
]

const FeatureCards = () => {
  return (
    <div className="flex tab:flex-wrap gap-5 py-12 w-full max-w-[1131px] mx-auto">
      {/* Left Tall Card */}
      <div className="bg-[#111113] relative max-w-[391px] tab:max-w-full rounded-2xl p-6 flex flex-col justify-between shadow-md row-span-2">

        <div className="rounded-full absolute top-0 left-0 border border-[#A8E54305] inline-block mb-4">
          <div className="p-[12px] rounded-full border border-[#A8E5430F]">
            <div className="p-[8px] rounded-full border border-[#A8E54321]">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1a1a1a]">
                <Image
                  src={features[0].icon}
                  alt={features[0].title}
                  width={50}
                  height={50}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="tab:h-[120px]"></div>

        <div>
          <Text as="h2">{features[0].title}</Text>
          <Text className="mt-3">{features[0].description}</Text>
        </div>
      </div>

      <div className="space-y-5">
        {/* Right Two Smaller Cards */}
        {features.slice(1).map((feature, index) => (
          <div key={index} className="bg-[#111113] w-full rounded-2xl shadow-md ">
            <div className="rounded-full border border-[#A8E54305] inline-block mb-4">
              <div className="p-[12px] rounded-full border border-[#A8E5430F]">
                <div className="p-[8px] rounded-full border border-[#A8E54321]">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1a1a1a]">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-2">
              <Text as="h2" className="mt-5">
                {feature.title}
              </Text>
              <Text className="mt-3">{feature.description}</Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureCards
