'use client'

import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import Text from '@/components/ui/Text';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CiSearch } from "react-icons/ci";

const dummyUsers = [
    {
        id: '#123456',
        name: 'Sameer Saim',
        email: 'alexsaprun123@gmail.com',
        date: 'Apr 10, 2025',
        avatar: 'https://i.pravatar.cc/40?img=1'
    },
    {
        id: '#123457',
        name: 'Ester Haword',
        email: 'alexsaprun123@gmail.com',
        date: 'Apr 10, 2025',
        avatar: 'https://i.pravatar.cc/40?img=2'
    },
    {
        id: '#123458',
        name: 'Elenor Pena',
        email: 'alexsaprun123@gmail.com',
        date: 'Apr 10, 2025',
        avatar: 'https://i.pravatar.cc/40?img=3'
    },
    {
        id: '#123459',
        name: 'Sameer Saim',
        email: 'alexsaprun123@gmail.com',
        date: 'Apr 10, 2025',
        avatar: 'https://i.pravatar.cc/40?img=4'
    },
    {
        id: '#123460',
        name: 'Elenor Pena',
        email: 'alexsaprun123@gmail.com',
        date: 'Apr 10, 2025',
        avatar: 'https://i.pravatar.cc/40?img=5'
    },
    {
        id: '#123460',
        name: 'Elenor Pena',
        email: 'alexsaprun123@gmail.com',
        date: 'Apr 10, 2025',
        avatar: 'https://i.pravatar.cc/40?img=6'
    },
    {
        id: '#123460',
        name: 'Elenor Pena',
        email: 'alexsaprun123@gmail.com',
        date: 'Apr 10, 2025',
        avatar: 'https://i.pravatar.cc/40?img=7'
    }
];

const DashboardPage = () => {
    const [search, setSearch] = useState('');
    const filteredUsers = dummyUsers.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DefaultLayout>
            <div className="bg-[#1D1D23] text-white space-y-8 min-h-screen">
                <div className='px-4 flex flex-row justify-between items-center'>
                    <div>
                        <Text as="h2" className='mb-1'>All Documents</Text>
                        <Text as='p'>Total Documents: {filteredUsers.length}</Text>
                    </div>
                    <div className="relative w-full max-w-64">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <CiSearch size={23} fill='#A8E543' />
                        </span>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent border border-[#FFFFFF1A] text-white pl-10 pr-4 py-2 rounded-full focus:outline-none w-full"
                        />
                    </div>
                </div>

                <div className="bg-[#1D1D23]">
                    <div className="bg-[#1D1D23] p-5 rounded-xl">
                        {filteredUsers.length === 0 ? (
                            <div className="text-center text-[#FFFFFF80] py-10">No users found.</div>
                        ) : (
                            <div>
                                {/* Header Row */}
                                <div className="py-3 px-2 flex justify-between items-center text-sm text-[#FFFFFF80] border-b border-gray-600 pb-7">
                                    <div className="w-1/4 text-start text-base text-[#FFFFFF] font-medium">User Name</div>
                                    <div className="w-1/4 text-center text-base text-[#FFFFFF] font-medium">Email Address</div>
                                    <div className="w-1/4 text-center text-base text-[#FFFFFF] font-medium">Added on</div>
                                    <div className="w-1/4 text-center text-base text-[#FFFFFF] font-medium">Action</div>
                                </div>

                                {/* User List */}
                                <div className="divide-y divide-gray-600">
                                    {filteredUsers.map((user, i) => (
                                        <div
                                            key={i}
                                            className="py-4 px-2 flex justify-between items-center text-sm"
                                        >
                                            {/* Name & Avatar */}
                                            <div className="w-1/4 flex items-center gap-4 text-start">
                                                <img
                                                    src={user.avatar}
                                                    alt="user"
                                                    className="h-10 w-10 rounded-full"
                                                />
                                                <div>
                                                    <p className="font-medium">{user.name}</p>
                                                    <p className="text-[#FFFFFF80] text-xs">{user.id}</p>
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className="w-1/4 text-[#FFFFFF80] text-center">{user.email}</div>

                                            {/* Date */}
                                            <div className="w-1/4 text-[#FFFFFF80] text-center">{user.date}</div>

                                            {/* Action */}
                                            <div className="w-1/4 text-center">
                                                <button className="text-[#A8E543] hover:underline">View Details</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Pagination */}
                    <div className="flex justify-end items-center gap-2 mt-6">
                        <button className="text-white p-2 hover:text-[#A8E543]">
                            <ChevronLeft size={20} />
                        </button>
                        {[1, 2, 3, 4, 5, 6].map(page => (
                            <button
                                key={page}
                                className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center ${page === 1 ? 'bg-[#A8E543] text-black' : 'text-white hover:text-[#A8E543]'}`}
                            >
                                {page}
                            </button>
                        ))}
                        <button className="text-white p-2 hover:text-[#A8E543]">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default DashboardPage;
