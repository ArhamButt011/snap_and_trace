'use client'
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import Text from '@/components/ui/Text';
import React, { useState, useEffect } from 'react';
import downloads from '/public/images/admin/dashboard/Download.svg'
import dynamic from 'next/dynamic'
import axios from 'axios';
import { format } from 'date-fns'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { ApexOptions } from 'apexcharts'
import userImage from '/public/images/admin/dashboard/users.svg'

import Image from 'next/image';
import ChartOne from '@/components/admin/Charts/ChartOne';

const DashboardPage = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [skeletonCount, setSkeletonCount] = useState(2);

  const downloadData = [10, 230, 10, 150, 19]

  const isGrowth = downloadData[downloadData.length - 1] >= downloadData[3]

  const chartData: ApexOptions = {
    series: [
      {
        name: 'Total Downloads',
        data: downloadData,
      },
    ],
    chart: {
      id: 'total-users-1',
      type: 'area',
      height: 70,
      width: 40,
      sparkline: {
        enabled: true,
      },
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
    },
    stroke: {
      curve: 'straight',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0,
        opacityTo: 0,
        stops: [20, 180],
      },
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: true,
        position: 'right',
      },
      x: {
        show: false,
      },
    },
    colors: [isGrowth ? '#A8E543' : '#F63B3B'],
  }

  const userData = [10, 230, 110, 150, 304]

  const isGrowth1 = userData[userData.length - 1] >= userData[3]

  const chartData1: ApexOptions = {
    series: [
      {
        name: 'Total Users',
        data: userData,
      },
    ],
    chart: {
      id: 'total-users-1',
      type: 'area',
      height: 70,
      width: 40,
      sparkline: {
        enabled: true,
      },
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
    },
    stroke: {
      curve: 'straight',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0,
        opacityTo: 0,
        stops: [20, 180],
      },
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: true,
        position: 'right',
      },
      x: {
        show: false,
      },
    },
    colors: [isGrowth1 ? '#A8E543' : '#F63B3B'],
  }



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

  return (
    <DefaultLayout>
      <div className="bg-[#1D1D23] text-white space-y-8">
        <div className='px-4'>
          <Text as="h2">Dashboard</Text>
        </div>

        <div className="flex flex-wrap gap-6 px-4">
          <div className="flex flex-col space-y-8 w-full md:w-[425px]">
            <div className="bg-[#FFFFFF12] p-5 rounded-xl h-44 flex flex-col justify-between">
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
              <div className='flex justify-between items-center'>
                <div>
                  <div className="flex flex-row items-center gap-2">
                    <Text as='h2' className='text-[36px]'>
                      112
                    </Text>
                    <span className="text-[#F63B3B] text-[16px] mt-1">-0.18%</span>
                  </div>
                  <p className="text-base text-[#FFFFFF80]">Since Last Month</p>
                </div>

                <div>
                  <div className="">
                    <Chart
                      options={chartData}
                      series={chartData.series}
                      type="area"
                      height={30}
                      width="25%"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFFFF12] p-5 rounded-xl h-44 flex flex-col justify-between">
              <div className='flex flex-row justify-between items-center'>
                <div>
                  <Text as='p' className="text-[#FFFFFF80] font-medium">Total Users Added</Text>
                </div>
                <div>
                  <div>
                    <Image height={45} width={45} src={userImage} alt="download" />
                  </div>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <div>
                  <div className="flex flex-row items-center gap-2">
                    <Text as='h2' className='text-[36px]'>
                      3473
                    </Text>
                    <span className="text-[#A8E543] text-[16px] mt-1">+0.18%</span>
                  </div>
                  <p className="text-base text-[#FFFFFF80]">Since Last Month</p>
                </div>
                <div>
                  <div className="">
                    <Chart
                      options={chartData1}
                      series={chartData1.series}
                      type="area"
                      height={30}
                      width="25%"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-[#FFFFFF12] p-5 pb-0 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Text as='p' className="text-[#FFFFFF] font-medium">Totals Payments</Text>
              </div>
              <div>
                <h3 className="text-2xl font-semibold flex items-center gap-1">
                  <span>
                    $120k
                  </span>
                  <span className="text-[#A8E543] text-xs bg-[#A8E5431A] p-1 px-2 rounded-xl">+10%</span>
                </h3>
              </div>
            </div>
            <div>
              <ChartOne />
            </div>
          </div>
        </div>

        <div className="px-4">
          <div className="bg-[#FFFFFF12] p-5 rounded-xl">
            <div className='border-b border-[#FFFFFF1A]'>
              <Text as="p" className='text-white mb-2 font-medium'>Recent Added Users</Text>
            </div>
            {/* <div className="">
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
            </div> */}

            {/* {loading ? */}
            <div className="">
              <div className="p-5 px-0 rounded-xl">
                {loading ? (
                  <>
                    <div className="mt-1">
                      {[...Array(skeletonCount)].map((_, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between animate-pulse items-center text-sm py-4 px-2"
                        >
                          <div className="w-1/4 flex items-center gap-4 text-start">
                            <div className="h-10 w-10 bg-[#585858] rounded-full" />
                            <div className="space-y-1">
                              <div className="h-4 w-24 bg-[#585858] rounded" />
                              <div className="h-3 w-20 bg-[#585858] rounded" />
                            </div>
                          </div>
                          {[1, 2, 3].map((_, i) => (
                            <div key={i} className="w-1/4 text-center">
                              <div className="h-4 bg-[#585858] rounded mx-auto w-20" />
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
                    <div className="">
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
            </div>
            {/* :
                    <div className="flex justify-center text-[#FFFFFF80] py-10 w-full">
                        <Image height={300} width={300} src={noUser} alt="download" />
                    </div> */}
            {/* } */}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DashboardPage;
