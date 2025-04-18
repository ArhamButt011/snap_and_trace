'use client'
import React, { useRef, useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import Logo from '@/components/user/Header/Logo'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const emailSchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email({
        message: 'Must be a valid email',
    }),
})

const OTP_LENGTH = 5

type EmailFormValues = z.infer<typeof emailSchema>

const Login = () => {
    const [showOtp, setShowOtp] = useState(false)
    const [otpLoading, setOtpLoading] = useState(false)
    const [verifyLoading, setVerifyLoading] = useState(false)
    const [timer, setTimer] = useState(0)
    const router = useRouter()
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
    })

    const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(''))

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const val = e.target.value
        if (!/^\d?$/.test(val)) return
        const newOtp = [...otpDigits]
        newOtp[index] = val
        setOtpDigits(newOtp)
        if (val && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [timer])

    const sendOTP = async (data: EmailFormValues) => {
        const { email } = data
        try {
            setOtpLoading(true)
            const res = await axios.post('/api/auth/send-otp', { email })
            toast.success('OTP sent successfully!')
            setShowOtp(true)
            setTimer(60)
        } catch (err: any) {
            console.error('Failed to send OTP', err)
            toast.error(err.response?.data?.message || 'Failed to send OTP')
        } finally {
            setOtpLoading(false)
        }
    }

    const verifyOTP = async () => {
        const email = getValues('email')
        const otp = otpDigits.join('')
        if (otp.length !== OTP_LENGTH) {
            toast.error('Enter complete OTP')
            return
        }

        try {
            setVerifyLoading(true)
            const response = await axios.post('/api/auth/verify-otp', { email, otp })
            console.log(response)
    
            if (response.data.success) {
                toast.success('OTP verified successfully.')
                sessionStorage.setItem('user_email', email)
                router.push('/admin/reset-password')
            } else {
                toast.error(response.data.message || 'Invalid OTP. Please try again.')
            }
        } catch (err: any) {
            const message = err?.response?.data?.message || 'Failed to verify OTP'
            toast.error(message)
        } finally {
            setVerifyLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="mb-8">
                <Logo size="lg" />
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    showOtp ? verifyOTP() : handleSubmit(sendOTP)()
                }}
                className="w-full max-w-lg border border-[#2C2C2C] rounded-[20px] p-5 shadow-md"
            >
                <Text as="h3" className="text-white text-left mb-2">Forgot Password?</Text>
                <Text className="text-gray-400 text-left text-[16px] leading-6 mb-6">
                    Enter your email address to reset your password
                </Text>

                <div className="mb-4">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter Email Address"
                        className="bg-[#FFFFFF1A] border-none text-white placeholder-[#FFFFFF80] rounded-[43.81px]"
                        {...register('email')}
                        readOnly={showOtp}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div className="text-left mb-12">
                    {timer > 0 ? (
                        <span className="text-gray-400 text-sm">Resend in {timer}s</span>
                    ) : (
                        <span
                            className={`text-accent text-sm hover:underline font-medium cursor-pointer ${otpLoading ? 'pointer-events-none opacity-60' : ''}`}
                            onClick={handleSubmit(sendOTP)}
                        >
                            {otpLoading ? 'Sending OTP...' : 'Send OTP'}
                        </span>
                    )}
                </div>

                <div className="flex justify-between gap-2 mb-12 max-w-xs mx-auto">
                    {otpDigits.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => {
                                inputRefs.current[index] = el
                            }}
                            className="w-12 h-12 focus:text-[#A8E543] text-center text-[#FFFFFF80] text-xl bg-[#FFFFFF1A] border-none rounded-full focus:outline-none focus:ring-1 focus:ring-[#A8E54338]"
                        />
                    ))}
                </div>

                <div className="flex gap-4">
                    <Button
                        variant="primary"
                        className="bg-accent text-black w-full"
                        type="submit"
                        disabled={!showOtp || verifyLoading}
                    >
                        {verifyLoading
                            ? 'Verifying...'
                            : 'Verify'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Login
