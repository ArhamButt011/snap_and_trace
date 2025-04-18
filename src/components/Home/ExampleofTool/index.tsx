import React from 'react'
import Image from 'next/image'

import Text from '@/components/ui/Text'

import grad from "@/public/images/hero/toolgrad.png"
import tool1 from "@/public/images/hero/tool1.png"
import tool2 from "@/public/images/hero/tool2.png"
import tool3 from "@/public/images/hero/tool3.png"
const ExampleofTool = () => {
    return (
        <div>
            <div id="sample-section" className='px-5 relative'>
                <Text as="h1" className='text-center'>Check Examples Of Our Tool</Text>
                <Image className='absolute top-28 left-0 z-0 rotate-[180deg]' src={grad} alt="poster" width={520} height={480} />
              
                <div className="relative  mx-auto w-full max-w-[1131px] pt-2 pb-20 z-10">
                    <Image className='mt-16' src={tool1} alt="poster" width={1130} height={566} />
                    <div className="flex mob:flex-wrap mob:justify-center mt-8 gap-8">
                        <Image className='w-[49%] tab:w-[48%] mob:w-full' src={tool2} alt="poster" width={549} height={549} />
                        <Image className='w-[49%] tab:w-[48%] mob:w-full' src={tool3} alt="poster" width={549} height={549} />

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ExampleofTool
