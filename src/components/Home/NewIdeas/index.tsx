import React from 'react'
import Button from '@/components/ui/Button'
import Text from '@/components/ui/Text'

import bg from "@/public/images/hero/ideabg.png"
import Image from 'next/image'

const NewIdeas = () => {
    return (
        <div className='bg-[#040D18C7] min-h-[555px] mob:h-full flex items-center justify-center relative mob:px-5'>
           <Image className='absolute w-full h-full top-0 right-0 object-cover z-0' src={bg} alt="bg" />
            <div className="w-full max-w-[894px] py-10 relative z-10 mob:px-5">
                <Text as='h1' className="text-[50px] text-center">Get Updated Or Support New Ideas!!</Text>
                <Text className="text-center max-w-[892px] mx-auto mt-[21px]">Stay in the loop with everything you want to know ! Sign up with your email below for exclusive updates and early access.</Text>

                <div className="flex mob:flex-wrap gap-[25px] justify-center mt-[60px]">
                    <input type="text" placeholder='Enter your email address' className='w-full px-4 max-w-[552px] h-[61px]  border rounded-[42px] blur-background text-[#FFFFFFB8] placeholder:[#FFFFFFB8] outline-none' />
                    <Button className='max-w-[168px] h-[62px] rounded-[75px] text-[23px] font-medium'>Sign Up </Button>
                </div>
            </div>
        </div>
    )
}

export default NewIdeas
