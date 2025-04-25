'use client'

import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import Text from '@/components/ui/Text';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import { format } from 'date-fns'
import Image from 'next/image';

const DashboardPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [charges, setTotalCharges] = useState(0);


  const [skeletonCount, setSkeletonCount] = useState(2);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const searchParam = search ? `&search=${search}` : '';
      const response = await axios.get(`/api/admin/get-payments/?page=${page}${searchParam}`);
      setTotalPages(response.data.totalPages || 1);
      setTotalCharges(response.data.totalChargesSum);
      setSkeletonCount(response.data.payments.length);
      setPayments(response.data.payments);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
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

  const [status, setStatus] = useState('pending');
  const [activeType, setActiveType] = useState('single');

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  return (
    <DefaultLayout>
      <div className="bg-[#1D1D23] text-white space-y-8 min-h-screen">
        {/* <div className='px-4 flex flex-row justify-between items-center'>
          <div>
            <Text as="h2" className='mb-1'> All Documents </Text>
            <Text as='p'>Total Documents: 200</Text>
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
        </div> */}

        <div className="px-4 py-4 flex justify-between items-center gap-4 flex-wrap">
          {/* Left: Title and Document Count */}
          <div className="min-w-40">
            <h2 className="text-2xl font-semibold text-white mb-1">All Documents</h2>
            <p className="text-gray-400">Total Documents: 200</p>
          </div>

          {/* Right: Dropdown + Buttons + Search */}
          <div className="flex flex-row items-center gap-2 flex-wrap justify-start">
            {/* Status Dropdown */}
            <div className="relative">
              <select
                className="bg-transparent border border-[#FFFFFF1A] text-[#FFFFFF80] py-2 px-4 rounded-full focus:outline-none appearance-none pr-8"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
            </div>

            {/* Object Type Buttons */}
            <div className="flex gap-2 border border-[#FFFFFF1A] rounded-full">
              <button
                className={`px-4 py-2 rounded-full ${activeType === 'single' ? 'bg-[#A8E543] text-black' : 'text-[#FFFFFF80]'}`}
                onClick={() => setActiveType('single')}
              >
                Single Object
              </button>
              <button
                className={`px-4 py-2 rounded-full ${activeType === 'inlay' ? 'bg-[#A8E543] text-black' : 'text-[#FFFFFF80]'}`}
                onClick={() => setActiveType('inlay')}
              >
                Inlay Object
              </button>
              <button
                className={`px-4 py-2 rounded-full ${activeType === 'pefoam' ? 'bg-[#A8E543] text-black' : 'text-[#FFFFFF80]'}`}
                onClick={() => setActiveType('pefoam')}
              >
                PE-Foam Inlay
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <CiSearch size={23} fill="#A8E543" />
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
        </div>




        {/* {loading ? */}
        <div className="bg-[#1D1D23]">

          <div className="bg-[#1D1D23] p-5 rounded-xl overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Header */}
              <div className="py-3 px-2 flex justify-between items-center text-sm text-[#FFFFFF80] border-b border-gray-600 pb-7">
                <div className="w-1/4 text-start text-base text-[#FFFFFF] font-medium">File Name</div>
                <div className="w-1/4 text-start text-base text-[#FFFFFF] font-medium">Requested By</div>
                <div className="w-1/6 text-center text-base text-[#FFFFFF] font-medium">Charges</div>
                <div className="w-1/4 text-center text-base text-[#FFFFFF] font-medium">Requested On</div>
                <div className="w-1/6 text-center text-base text-[#FFFFFF] font-medium">Status</div>
                <div className="w-1/6 text-center text-base text-[#FFFFFF] font-medium">Action</div>
              </div>

              {/* Loading Skeletons */}
              {loading ? (
                <div className="mt-1 divide-y divide-gray-600">
                  {[...Array(skeletonCount)].map((_, idx) => (
                    <div
                      key={idx}
                      className="py-4 px-2 flex justify-between items-center text-sm animate-pulse"
                    >

                      {/* File Name */}
                      <div className="w-1/4 flex items-center gap-4 text-center">
                        <div className="h-10 w-10 bg-[#2A2A33] rounded-full" />
                        <div className="h-4 w-24 bg-[#2A2A33] rounded" />
                      </div>

                      {/* Payment By */}
                      <div className="w-1/4 flex items-center gap-4 text-center">
                        <div className="h-10 w-10 bg-[#2A2A33] rounded-full" />
                        <div className="space-y-1 text-start">
                          <div className="h-4 w-24 bg-[#2A2A33] rounded" />
                          <div className="h-3 w-16 bg-[#2A2A33] rounded" />
                        </div>
                      </div>

                      {/* Trace Type */}
                      <div className="w-1/6 text-center">
                        <div className="h-4 w-20 mx-auto bg-[#2A2A33] rounded" />
                      </div>

                      {/* Total Charges */}
                      <div className="w-1/4 text-center">
                        <div className="h-4 w-20 mx-auto bg-[#2A2A33] rounded" />
                      </div>

                      {/* Payment On */}
                      <div className="w-1/6 text-center">
                        <div className="h-4 w-24 mx-auto bg-[#2A2A33] rounded" />
                      </div>

                      <div className="w-1/6 text-center">
                        <div className="h-4 w-24 mx-auto bg-[#2A2A33] rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : payments.length === 0 ? (
                <div className="text-center text-[#FFFFFF80] py-10">No payments found.</div>
              ) : (
                <div className="divide-y divide-gray-600">
                  {payments.map((payment: any, i: number) => (
                    <div key={i} className="py-4 px-2 flex justify-between items-center text-sm">
                      <div className="w-1/4 flex items-center gap-2 text-center">
                        <img src={payment.file_image} alt="payment" className="h-10 w-10 rounded-full object-cover" />
                        <div className="text-[#FFFF]">{payment.file_name}</div>
                      </div>

                      <div className="w-1/4 flex items-center gap-2 text-center">
                        <img src={payment.user.image} alt="payment" className="h-10 w-10 rounded-full object-cover" />
                        <div className="text-start">
                          <p className="font-medium text-[#FFFF]">{payment.user.username}</p>
                          <p className="text-[#FFFFFF80] text-xs">{payment.user.email}</p>
                        </div>
                      </div>

                      <div className="w-1/6 text-[#FFFFFF80] text-center">${payment.total_charges}</div>

                      <div className="w-1/4 text-[#FFFFFF80] text-center">
                        {format(new Date(payment.createdAt), 'MMM dd, yyyy | hh:mm a')}
                      </div>
                      <div className="w-1/6 text-[#A8E543] text-center">
                        <span className='text-[#A8E543] text-sm bg-[#A8E5431A] py-1 px-3 rounded-2xl'>
                          Pending
                        </span>
                      </div>
                      <div className="w-1/6 text-center">
                        <button className="text-[#A8E543] hover:underline">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>


          {payments.length !== 0 &&
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

