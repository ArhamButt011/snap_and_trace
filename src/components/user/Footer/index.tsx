import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Text from '@/components/ui/Text'
import linkdin from "@/public/icons/linkdin.svg"
import insta from "@/public/icons/insta.svg"
import fb from "@/public/icons/fb.svg"
import youtube from "@/public/icons/youtube.svg"

const Footer = () => {
    return (
        <div className='py-8'>
            <h1 className="text-accent text-center font-normal text-[42.29px] font-prociono">
                Snap&Trace
            </h1>
            <hr className='bg-[#FFFFFF1A] h-[1px] w-full my-[30px]' />

            <Text className='text-center mx-auto max-w-[839px] font-medium mob:px-5'>
                Effortlessly create precise DXF files for manufacturing custom tool drawer inserts with AI-powered automation. Ability to modify DXF files
            </Text>

            <div className="flex flex-wrap justify-center gap-[46px] mt-[38px] mob:px-5">
                <Link href="/"><Text className='underline'>Home</Text></Link>
                <Link href="/"><Text className='underline'>Benefits</Text></Link>
                <Link href="/"><Text className='underline'>Working</Text></Link>
                <Link href="/"><Text className='underline'>Sample</Text></Link>
                <Link href="/"><Text className='underline'>FAQ’s</Text></Link>
            </div>

            <div className="flex flex-wrap mob:px-5 items-center gap-8 mt-[80px] justify-between max-w-[1240px] mx-auto">
                <div className="flex gap-[9px]">
                    <Image src={linkdin} alt="linkdin" width={40} height={40} />
                    <Image src={insta} alt="linkdin" width={40} height={40} />
                    <Image src={fb} alt="linkdin" width={40} height={40} />
                    <Image src={youtube} alt="linkdin" width={40} height={40} />
                </div>
                <Text className='text-[18px] font-medium'>Foam Layout Tool | © 2025 | All Rights Reserved</Text>
            </div>
        </div>
    )
}

export default Footer
