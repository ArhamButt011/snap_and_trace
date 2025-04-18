'use client'

import { useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import Text from '@/components/ui/Text'
import eng from "@/public/images/hero/eng.png"
import german from "@/public/images/hero/germany.png"
import dutch from "@/public/images/hero/dutch.png"

const languages = [
    { code: 'EN', label: 'English', flag: eng },
    { code: 'GE', label: 'German', flag: german },
    { code: 'DU', label: 'Dutch', flag: dutch }
]

export default function DropDown() {
    const [selected, setSelected] = useState(languages[0]) // default to English

    return (
        <div className="relative z-[50] w-[198px] text-center">
            <Menu>
                <MenuButton className="flex items-center mob:justify-start gap-2 rounded-[30px] mx-auto mob:mx-0 text-[19.91px] font-raleway font-medium text-white focus:outline-none">
                    <Image src={selected.flag} alt={selected.label} width={47} height={27} />
                    {selected.code}
                    <ChevronDownIcon className="size-4 fill-white" />
                </MenuButton>

                <MenuItems
                    transition
                    className="absolute left-1/2 transform -translate-x-1/2 mt-8 z-[50] w-48 p-2 bg-[#2C2C31] text-white shadow-lg focus:outline-none"
                >
                    {languages.map((lang) => (
                        <MenuItem key={lang.code}>
                            <button
                                onClick={() => setSelected(lang)}
                                className="group flex w-full justify-start items-center gap-[5.6px] rounded-lg py-1.5 px-3 text-center data-[focus]:bg-white/10"
                            >
                                <Image src={lang.flag} alt={lang.label} width={47} height={27} />
                                <Text className='text-[17px] font-medium text-white'>{lang.label}</Text>
                            </button>
                        </MenuItem>
                    ))}
                </MenuItems>
            </Menu>
        </div>
    )
}
