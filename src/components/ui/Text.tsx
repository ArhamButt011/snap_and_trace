import React, { forwardRef } from 'react'
import { cn } from '@/utils'

type ComponentAs = 'h1' | 'h2' | 'h3' |'p'

interface Props {
  children?: React.ReactNode
  className?: string
  as?: ComponentAs
  onclick?: React.MouseEventHandler
  Style?: React.CSSProperties
  dangerouslySetInnerHTML?: { __html: string }
}

const Text = forwardRef<HTMLHeadingElement | HTMLParagraphElement, Props>(
  (props, ref) => {
    const {
      children,
      className,
      as,
      onclick,
      Style,
      dangerouslySetInnerHTML,
    } = props

    if (dangerouslySetInnerHTML) {
      return (
        <p
          ref={ref}
          className={cn(
            'font-raleway text-primary text-[20px] font-normal leading-[33.2px] mob:text-[16px] mob:leading-[22.2px]',
            className,
          )}
          onClick={onclick}
          style={Style}
          dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        />
      )
    }

    if (as === 'h1') {
      return (
        <h1
          ref={ref}
          className={cn(
            'font-raleway text-[#FFFFFF] sm:text-[44.91px] text-[40px] font-bold sm:leading-[60px] leading-[45px] mob:text-[28px] mob:leading-[33px]',
            className,
          )}
          onClick={onclick}
          style={Style}
        >
          {children}
        </h1>
      )
    }

    if (as === 'h2') {
      return (
        <h2
          ref={ref}
          className={cn(
            'font-raleway text-[#FFFFFF] text-[27px] font-semibold leading-[28px] ',
            className,
          )}
          onClick={onclick}
        >
          {children}
        </h2>
      )
    }

    if (as === 'h3') {
      return (
        <h3
          ref={ref}
          className={cn(
            'font-raleway text-[#FFFFFF] sm:text-[32.13px] text-[27px] font-semibold',
            className,
          )}
          onClick={onclick}
          style={Style}
        >
          {children}
        </h3>
      )
    }

    return (
      <p
        ref={ref}
        className={cn(
          'font-raleway text-primary text-[20px] font-normal leading-[33.2px] mob:text-[16px] mob:leading-[22.2px]',
          className,
        )}
        onClick={onclick}
      >
        {children}
      </p>
    )
  },
)

Text.displayName = 'Text'

export default Text
