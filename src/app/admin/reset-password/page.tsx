'use client'
import React, { useEffect, useState } from 'react'
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

const resetSchema = z
    .object({
        newPassword: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

type ResetFormValues = z.infer<typeof resetSchema>

const ResetPassword = () => {
    const router = useRouter()
    const [email, setEmail] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetFormValues>({
        resolver: zodResolver(resetSchema),
    })

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('user_email')
        if (!storedEmail) {
            toast.error('Session expired. Please request OTP again.')
            router.push('/admin/forgot-password')
        }
        setEmail(storedEmail)
    }, [router])

    const onSubmit = async (data: ResetFormValues) => {
        if (!email) return
        try {
            const response = await axios.post('/api/auth/reset-password', {
                email,
                newPassword: data.newPassword,
            })
            if (response.data.success) {
                toast.success('Password reset successfully!')
                sessionStorage.removeItem('user_email')
                router.push('/admin')
            } else {
                toast.error(response.data.message || 'Something went wrong')
            }
        } catch (error) {
            toast.error('Failed to reset password')
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="mb-8">
                <Logo size="lg" />
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-lg border border-[#2C2C2C] rounded-[20px] p-5 shadow-md"
            >
                <Text as="h3" className="text-white text-left mb-2">
                    Reset Password
                </Text>
                <Text className="text-gray-400 text-left text-[16px] leading-6 mb-6">
                    Please enter your new password to continue to Snap & Trace
                </Text>

                <div className="mb-4">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                        id="newPassword"
                        type="password"
                        placeholder="Enter New Password"
                        withIcon
                        className="bg-[#FFFFFF1A] border-none text-white placeholder-gray-400 rounded-[43.81px]"
                        {...register('newPassword')}
                    />
                    {errors.newPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                    )}
                </div>

                <div className="mb-14">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm New Password"
                        withIcon
                        className="bg-[#FFFFFF1A] border-none text-white placeholder-gray-400 rounded-[43.81px]"
                        {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <div className="flex gap-4">
                    <Button variant="primary" className="bg-accent text-black w-full" type="submit">
                        Continue
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword
