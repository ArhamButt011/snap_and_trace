'use client'
import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import Logo from '@/components/user/Header/Logo'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

const loginSchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email({
        message: 'Must be a valid email',
    }),
    password: z.string().refine((value) => value.trim().length > 0, {
        message: 'Password is required',
    }),
})

type LoginFormValues = z.infer<typeof loginSchema>

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (data: LoginFormValues) => {
        setIsSubmitting(true)
        try {
            const response = await axios.post('/api/auth/login', data)
            const result = response.data
            toast.success('Login successful')
            localStorage.setItem('token', result.token)
            localStorage.setItem('user', JSON.stringify(result.user))
            window.location.href = '/admin/dashboard'
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.message || 'Login failed')
            } else {
                toast.error('Something went wrong. Please try again.')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="mb-8">
                <Logo size="lg" redirect={false} />
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-lg border border-[#2C2C2C] rounded-[20px] p-5 shadow-md"
            >
                <Text as="h3" className="text-white text-left mb-2">
                    Login To Snap & Trace
                </Text>
                <Text className="text-gray-400 text-left text-[16px] leading-6 mb-6">
                    Sign in with your email and password and continue to Snap & Trace
                </Text>

                <div className="mb-4">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter Email Address"
                        className="bg-[#FFFFFF1A] border-none text-white placeholder-[#FFFFFF80] rounded-[43.81px]"
                        {...register('email')}
                        readOnly={true}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div className="mb-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter Password"
                        withIcon
                        readOnly={true}
                        className="bg-[#FFFFFF1A] border-none text-white placeholder-[#FFFFFF80] rounded-[43.81px]"
                        {...register('password')}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                <div className="text-left mb-12">
                    <Link href="/admin/forgot-password">
                        <span className="text-accent text-sm hover:underline font-medium cursor-pointer">
                            Forgot Password?
                        </span>
                    </Link>
                </div>

                <div className="flex gap-4">
                    <Button
                        variant="primary"
                        className="bg-accent text-black w-full"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Login
