'use client'
import { ApexOptions } from 'apexcharts'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})

const ChartOne: React.FC = () => {
    const [paymentSubscriptions, setPaymentSubscriptions] = useState<number[]>([])
    const [months, setMonths] = useState<string[]>([])
    const [totalPayment, setTotalPayment] = useState<number>(0)
    const [currMonthAvg, setCurrMonthAvg] = useState<number>(0)
    const [prevMonthAvg, setPrevMonthAvg] = useState<number>(0)

    useEffect(() => {
        const dummyPayments = [100, 200, 300, 250, 280, 400, 450]
        const dummyMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
        const currentAvg = 420
        const previousAvg = 300
        const total = dummyPayments.reduce((a, b) => a + b, 0)

        setPaymentSubscriptions(dummyPayments)
        setMonths(dummyMonths)
        setTotalPayment(total)
        setCurrMonthAvg(currentAvg)
        setPrevMonthAvg(previousAvg)
    }, [])

    const isGrowth = currMonthAvg >= prevMonthAvg

    const series = [
        {
            name: 'Subscription Payment',
            data: paymentSubscriptions,
        },
    ]

    const options: ApexOptions = {
        legend: {
            show: true,
            position: 'bottom',
            labels: {
                colors: '#d1d5db',
            },
        },
        colors: [isGrowth ? '#A8E543' : '#A8E543'],
        chart: {
            fontFamily: 'Satoshi, sans-serif',
            height: 335,
            type: 'area',
            dropShadow: {
                enabled: true,
                color: '#A8E543',
                top: 10,
                blur: 4,
                left: 0,
                opacity: 0.1,
            },
            toolbar: {
                show: false,
            },
        },
        responsive: [
            {
                breakpoint: 1024,
                options: {
                    chart: {
                        height: 300,
                    },
                },
            },
            {
                breakpoint: 1366,
                options: {
                    chart: {
                        height: 350,
                    },
                },
            },
        ],
        stroke: {
            width: [2, 2],
            curve: 'smooth',
        },
        grid: {
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            type: 'category',
            labels: {
                style: {
                    colors: '#FFFFFF80',
                },
            },
            categories: months,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            title: {
                style: {
                    fontSize: '0px',
                },
            },
            min: 0,
            tickAmount: 5,
            labels: {
                style: {
                    colors: '#FFFFFF80',
                },
                formatter: function (value) {
                    if (value < 1000) {
                        return '$' + value.toFixed(0)
                    } else {
                        return '$' + (value / 1000).toFixed(0) + 'K'
                    }
                },
            },
        },
        tooltip: {
            theme: 'dark',
            style: {
                fontSize: '14px',
            },
        },
    }

    const formatNumber = (num?: number) => {
        if (!num) return '0'
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K'
        }
        return num.toString()
    }

    return (
        <div className="col-span-12 rounded-xl bg-body dark pt-7.5">
            <div>
                <div id="chartOne" className="-ml-5">
                    <ReactApexChart
                        options={options}
                        series={series}
                        type="area"
                        height={300}
                        width={'100%'}
                    />
                </div>
            </div>
        </div>
    )
}

export default ChartOne
