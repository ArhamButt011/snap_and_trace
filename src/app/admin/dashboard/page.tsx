'use client'
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import Text from '@/components/ui/Text';
import React from 'react';
import downloads from '/public/images/admin/dashboard/Download.svg'
import users from '/public/images/admin/dashboard/users.svg'

import Image from 'next/image';

const DashboardPage = () => {
  return (
    <DefaultLayout>
      <div className="bg-[#1D1D23] text-white space-y-8">
        <div className='px-4'>
          <Text as="h2">Dashboard</Text>
        </div>

        <div className="flex flex-wrap gap-6 px-4">
          <div className="flex flex-col space-y-7 w-full md:w-[425px]">
            <div className="bg-[#FFFFFF12] p-5 rounded-xl h-40 flex flex-col justify-between">
              <div className='flex flex-row justify-between items-center'>
                <div>
                  <Text as='p' className="text-[#FFFFFF80] font-medium">Total Document Downloads</Text>
                </div>
                <div>
                  <div>
                    <Image height={45} width={45} src={downloads} alt="download" />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-row items-center gap-2">
                  <Text as='h2' className='text-[36px]'>
                    112
                  </Text>
                  <span className="text-[#F63B3B] text-[16px] mt-1">-0.18%</span>
                </div>
                <p className="text-base text-[#FFFFFF80]">Since Last Month</p>
              </div>
            </div>

            <div className="bg-[#FFFFFF12] p-5 rounded-xl h-40 flex flex-col justify-between">
              <div className='flex flex-row justify-between items-center'>
                <div>
                  <Text as='p' className="text-[#FFFFFF80] font-medium">Total Users Added</Text>
                </div>
                <div>
                  <div>
                    <Image height={45} width={45} src={users} alt="download" />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-row items-center gap-2">
                  <Text as='h2' className='text-[36px]'>
                    3473
                  </Text>
                  <span className="text-[#A8E543] text-[16px] mt-1">+0.18%</span>
                </div>
                <p className="text-base text-[#FFFFFF80]">Since Last Month</p>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-[#FFFFFF12] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-4">
            <div>
                  <Text as='p' className="text-[#FFFFFF] font-medium">Totals Payments</Text>
                </div>
              <div>
                <h3 className="text-2xl font-semibold">
                  $120k <span className="text-[#A8E543] text-sm">+10%</span>
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4">
          <div className="bg-[#FFFFFF12] p-5 rounded-xl">
            <div className='border-b border-[#FFFFFF1A]'>
              <Text as="p" className='text-white mb-2 font-medium'>Recent Added Users</Text>
            </div>
            <div className="">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="py-4 flex justify-between items-center text-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://i.pravatar.cc/40?img=${i + 1}`}
                      alt="user"
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">Alex Saprun</p>
                      <p className="text-[#FFFFFF80]">#12345</p>
                    </div>
                  </div>
                  <div className="text-[#FFFFFF80]">alexsaprun123@gmail.com</div>
                  <div className="text-[#FFFFFF80]">Apr 10, 2025</div>
                  <button className="text-[#A8E543] hover:underline">View Details</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DashboardPage;
