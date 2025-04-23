'use client'

import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import Text from '@/components/ui/Text';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import { format } from 'date-fns'
import Image from 'next/image';
import noUser from '/public/images/admin/noUser.svg'

const DashboardPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [skeletonCount, setSkeletonCount] = useState(2);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const searchParam = search ? `&search=${search}` : '';
            const response = await axios.get(`/api/admin/get-users/?page=${page}${searchParam}`);
            setTotalPages(response.data.totalPages || 1);
            setSkeletonCount(response.data.users.length);
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, search]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const getVisiblePages = (page: number, totalPages: number): (number | string)[] => {
        const visiblePages = [];
        const range = 4;
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (page <= range) {
            return [1, 2, 3, 4, '...', totalPages];
        }

        if (page >= totalPages - range) {
            return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }

        return [1, '...', page - 1, page, page + 1, '...', totalPages];
    };


    return (
        <DefaultLayout>
            <div className="bg-[#1D1D23] text-white space-y-8 min-h-screen">
                <div className='px-4 flex flex-row justify-between items-center'>
                    <div>
                        <Text as="h2" className='mb-1'>All Users</Text>
                        <Text as='p'>Total Users: {users.length}</Text>
                    </div>
                    <div className="relative w-full max-w-64">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <CiSearch size={23} fill='#A8E543' />
                        </span>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={handleSearchChange}
                            className="bg-transparent border border-[#FFFFFF1A] text-white pl-10 pr-4 py-2 rounded-full focus:outline-none w-full"
                        />
                    </div>
                </div>


                {/* {loading ? */}
                    <div className="bg-[#1D1D23]">
                        <div className="bg-[#1D1D23] p-5 rounded-xl">
                            <div className="py-3 px-2 flex justify-between items-center text-sm text-[#FFFFFF80] border-b border-gray-600 pb-7">
                                <div className="w-1/4 text-start text-base text-[#FFFFFF] font-medium">User Name</div>
                                <div className="w-1/4 text-center text-base text-[#FFFFFF] font-medium">Email Address</div>
                                <div className="w-1/4 text-center text-base text-[#FFFFFF] font-medium">Added on</div>
                                <div className="w-1/4 text-center text-base text-[#FFFFFF] font-medium">Action</div>
                            </div>

                            {loading ? (
                                <>
                                    <div className="mt-1 divide-y divide-gray-600">
                                        {[...Array(skeletonCount)].map((_, idx) => (
                                            <div
                                                key={idx}
                                                className="flex justify-between animate-pulse items-center text-sm py-4 px-2"
                                            >
                                                <div className="w-1/4 flex items-center gap-4 text-start">
                                                    <div className="h-10 w-10 bg-[#2A2A33] rounded-full" />
                                                    <div className="space-y-1">
                                                        <div className="h-4 w-24 bg-[#2A2A33] rounded" />
                                                        <div className="h-3 w-20 bg-[#2A2A33] rounded" />
                                                    </div>
                                                </div>
                                                {[1, 2, 3].map((_, i) => (
                                                    <div key={i} className="w-1/4 text-center">
                                                        <div className="h-4 bg-[#2A2A33] rounded mx-auto w-20" />
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : users.length === 0 ? (
                                <div className="text-center text-[#FFFFFF80] py-10">No users found.</div>
                            ) : (
                                <>
                                    <div className="divide-y divide-gray-600">
                                        {users.map((user: any, i: number) => (
                                            <div key={i} className="py-4 px-2 flex justify-between items-center text-sm">
                                                <div className="w-1/4 flex items-center gap-4 text-start">
                                                    <img src={user.image} alt="user" className="h-10 w-10 rounded-full object-cover" />
                                                    <div>
                                                        <p className="font-medium">{user.username}</p>
                                                        <p className="text-[#FFFFFF80] text-xs">{user._id}</p>
                                                    </div>
                                                </div>
                                                <div className="w-1/4 text-[#FFFFFF80] text-center">{user.email}</div>
                                                <div className="w-1/4 text-[#FFFFFF80] text-center"> {format(new Date(user.createdAt), 'MMM dd, yyyy')}</div>
                                                <div className="w-1/4 text-center">
                                                    <button className="text-[#A8E543] hover:underline">View Details</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        {users.length !== 0 &&
                            <div className="flex justify-end items-center gap-2 mt-6">
                                <button
                                    className="text-white p-2 hover:text-[#A8E543]"
                                    disabled={page === 1}
                                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                {getVisiblePages(page, totalPages).map((p, i) => (
                                    <button
                                        key={i}
                                        className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center ${p === page ? 'bg-[#A8E543] text-black' : 'text-white hover:text-[#A8E543]'}`}
                                        onClick={() => {
                                            if (typeof p === 'number') {
                                                setPage(p);
                                            }
                                        }}
                                    >
                                        {p === '...' ? '...' : p}
                                    </button>
                                ))}


                                <button
                                    className="text-white p-2 hover:text-[#A8E543]"
                                    disabled={page === totalPages}
                                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        }
                    </div>
                    {/* :
                    <div className="flex justify-center text-[#FFFFFF80] py-10 w-full">
                        <Image height={300} width={300} src={noUser} alt="download" />
                    </div> */}
                {/* } */}
            </div>
        </DefaultLayout>
    );
};

export default DashboardPage;

