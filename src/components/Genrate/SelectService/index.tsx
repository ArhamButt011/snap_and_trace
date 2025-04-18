import React from 'react'
import Image from 'next/image'

import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'

import infoicon from '@/public/icons/Info Circle.svg'
import service1 from '@/public/images/service1.png'
import service2 from '@/public/images/service2.png'

const services = [
    {
        id: 1,
        title: 'Option 01: Digital File',
        heading: 'Trace Single Object',
        description:
            'We will trace one object digitally with precision to create a clean outline file for custom designs or cutouts.',
        image: service1,
    },
    {
        id: 2,
        title: 'Option 02: Digital File ',
        heading: 'Trace Objects For Inlay',
        description:
            'Send multiple objects to be traced and arranged into a digital inlay layout, ensuring perfect fit and alignment.',
        image: service2,
    },
    {
        id: 3,
        title: 'Option 03: Physical File ',
        heading: 'Order PE-Foam Inlay',
        description:
            'Order a custom PE-foam inlay based on your traced layout. Ideal for tool organization, protection, or packaging.',
        image: service2,
    },
]

const SelectService = () => {
    return (
        <div className='px-5 min-h-screen flex items-center justify-center'>
            <div className="w-full max-w-[1189px] mx-auto bg-[#1D1D23] p-5 rounded-[30px]">
                <div className="flex justify-between items-center">
                    <div>
                        <Text as="h2" className="text-[30.13px] mb-[7px]">
                            Select Service
                        </Text>
                        <Text className="text-[18.9px]">
                            Please Select the service from our given 03 options that you wanted to take
                        </Text>
                    </div>
                    <Image src={infoicon} alt="infoicon" width={40} height={40} />
                </div>

                {/* services */}
                <div className="flex flex-wrap gap-[27px] mt-[36px] justify-between mob:justify-center pb-4">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="w-full max-w-[355px] rounded-[24px] bg-[#FFFFFF1A] p-[22px]"
                        >
                            <Text className="text-[18px] text-center">
                                {service.title.split(':')[0]}: <span className="text-white">{service.title.split(':')[1]}</span>
                            </Text>
                            <Image
                                src={service.image}
                                alt={`service${service.id}`}
                                width={300}
                                height={300}
                                className="w-full my-[15px]"
                            />
                            <Text className="text-white text-center font-semibold">{service.heading}</Text>
                            <Text className="text-center text-[15px] mt-[7px]">{service.description}</Text>

                            <Button className="w-full mt-[15px] font-semibold">Select</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SelectService
