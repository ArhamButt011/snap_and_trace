import React from 'react'
import Image from 'next/image'

import Text from '@/components/ui/Text'

import poster from "@/public/images/hero/toolworks.png"
import grad from "@/public/images/hero/toolgrad.png"
const ToolWorks = () => {
    return (
        <div id="working-section" className='px-5 flex justify-center items-center relative'>
                <Image className='absolute right-0 z-0' src={grad} alt="poster" width={480} height={580} />
            <div className=" w-full max-w-[1131px] pt-20 pb-20 mob:pt-0 z-10">
                <Text as="h1" className='text-center'>How Foam Layout Tool Works?</Text>
                <Image className='mt-16' src={poster} alt="poster" width={1131} height={580} />

            </div>

        </div>
    )
}

export default ToolWorks
